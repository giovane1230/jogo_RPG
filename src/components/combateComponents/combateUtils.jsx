import conditionsData from "../../api/conditionsData";

// Função para rolar dado
export function rolarDado(lados) {
  return Math.floor(Math.random() * lados) + 1;
}

// Ataque principal do jogador
export function ataqueJogador({
  combateFinalizado,
  rolarDado,
  character,
  player,
  enemy,
  setMensagens,
  setEnemyHP,
  enemyHP,
  setTimeout,
  turnoInimigo,
  dano,
}) {
  if (combateFinalizado) return;

  let acerto = rolarDado(20);
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );
  const temBuffSumir = player.buff["sumir"]?.timeEffect > 0;
  const temBuffPesquisar = player.buff["pesquisar"]?.timeEffect > 0;
  let bonusTotal = modAtk + character.proficienciesBonus;

  if (temBuffPesquisar) {
    bonusTotal = modAtk + modAtk + acerto + character.proficienciesBonus;
    setMensagens((prev) => [
      ...prev,
      {
        tipo: "buff",
        texto: `${player.name} dobra o modificador de acerto! acerto: +${modAtk}`,
      },
    ]);
  }

  if (temBuffSumir) {
    acerto = 20;
    setMensagens((prev) => [
      ...prev,
      { tipo: "buff", texto: `${player.name} ataque de oportunidade!` },
    ]);
  }

  const sucesso = acerto + bonusTotal > enemy.armor_class?.[0]?.value;
  const critico = acerto === 20;
  const danoTotal = critico ? dano * 2 : dano;

  setMensagens((prev) => [
    ...prev,
    sucesso
      ? {
          tipo: "jogador",
          texto: `Você ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ${danoTotal}💥`,
        }
      : {
          tipo: "jogador",
          texto: `Você errou 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }🛡️`,
        },
  ]);

  if (sucesso) {
    const novaVida = Math.max(0, enemyHP - danoTotal);
    setEnemyHP(novaVida);
    if (novaVida > 0) {
      setTimeout(turnoInimigo, 1000);
    } else {
      // inimigo morreu → não faz nada ou chama função de vitória
    }
  } else {
    // Errou o ataque → inimigo responde
    setTimeout(turnoInimigo, 1000);
  }
}

// Ataque com arma secundária
export function ataqueJogadorOffHand({
  combateFinalizado,
  rolarDado,
  character,
  enemy,
  setMensagens,
  setEnemyHP,
  dano,
}) {
  if (combateFinalizado) return;

  const acerto = rolarDado(20);
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );
  const bonusTotal = modAtk;
  const sucesso = acerto + bonusTotal > enemy.armor_class?.[0]?.value;
  const critico = acerto === 20;
  const danoTotal = critico ? dano * 2 : dano;

  setMensagens((prev) => [
    ...prev,
    sucesso
      ? {
          tipo: "jogador",
          texto: `Você usou sua SECUNDARIA ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ${danoTotal}💥`,
        }
      : {
          tipo: "jogador",
          texto: `Você errou SECUNDARIA 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }🛡️`,
        },
  ]);

  if (sucesso) setEnemyHP((hp) => Math.max(0, hp - danoTotal));
}

// Função para ataque por botão
export function ataquePorBotao({
  equipment,
  setPrecisaRecarregar,
  ataqueJogador,
  ataqueJogadorOffHand,
  rolarDado,
}) {
  const diceExpr = equipment.weapon
    ? equipment.weapon.status
    : equipment["two-handed"]?.twoHandedDamage?.damage_dice || "1d4";

  const isAmmunition = equipment["two-handed"]?.properties?.some(
    (p) => p.index === "ammunition"
  );
  const isLoading = equipment["two-handed"]?.properties?.some(
    (p) => p.index === "loading"
  );

  const lados = parseInt(diceExpr.split("d")[1], 10) || 6;
  if (equipment.offHand) {
    const diceExprOff = equipment.offHand.status;
    const offLados = parseInt(diceExprOff.split("d")[1], 10) || 6;
    const dano = rolarDado(offLados);
    ataqueJogadorOffHand(dano);
  }
  if (isAmmunition) {
    // lógica de munição
  }
  if (isLoading) {
    setPrecisaRecarregar(false);
  }
  const dano = rolarDado(lados);
  ataqueJogador(dano);
}

function detectConditionsFromDesc(desc) {
  const conds = [];
  for (const key of Object.keys(conditionsData)) {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(desc)) conds.push({ index: key });
  }
  return conds;
}

export function parseAction(action) {
  if (!action) return {};

  const texto = action.desc || "";

  // 1) attack_bonus
  const bonusMatch = texto.match(/\+(\d+)\s+to hit/i);
  const attack_bonus = bonusMatch ? parseInt(bonusMatch[1], 10) : null;

  // 2) dc (se não vier, extrai do texto)
  const dcMatch = texto.match(
    /DC\s+(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)/i
  );
  let dc = action.dc || null;
  if (!dc && dcMatch) {
    const idx = dcMatch[2].slice(0, 3).toLowerCase();
    dc = {
      dc_type: { index: idx, name: dcMatch[2], url: "" },
      dc_value: parseInt(dcMatch[1], 10),
      success_type: /half as much damage/i.test(texto) ? "half" : "none",
    };
  }

  // 3) damage (se não vier, extrai do texto)
  const damageMatches = [
    ...texto.matchAll(
      /\((\d+d\d+(?:\s*\+\s*\d+)?)\)\s*(bludgeoning|slashing|piercing|acid|fire|cold|lightning|poison|necrotic|radiant|force|psychic|thunder)\s+damage/gi
    ),
  ];
  const damageExtracted = damageMatches.map((m) => ({
    damage_type: { index: m[2].toLowerCase(), name: m[2], url: "" },
    damage_dice: m[1].replace(/\s+/g, ""),
  }));

  // 4) condições
  const conditions =
    action.conditions?.length > 0
      ? action.conditions
      : detectConditionsFromDesc(texto);

  // 5) monta o objeto final
  const base = {
    name: action.name,
    desc: texto,
    attack_bonus,
    dc,
    damage: action.damage?.length ? action.damage : damageExtracted,
    conditions,
    usage: action.usage || null,
    multiattack_type: action.multiattack_type || null,
    actions: action.actions || [],
  };

  return base;
}


export function turnoInimigoUtil({
  enemy,
  player,
  round,
  setRound,
  setPlayer,
  setMensagens,
  setPlayerHP,
  combateFinalizado,
  BuffUtils,
}) {
  if (!enemy.actions?.length || combateFinalizado) return;

  setRound((r) => r + 1);

  // 1) Atualiza buffs do player
  const buffsAtualizados = BuffUtils.AtualizarBuffs(player.buff);
  setPlayer((prev) => ({ ...prev, buff: buffsAtualizados }));

  // 2) Se estiver sob o buff “empurrar”, pula o turno
  if (player.buff.empurrar?.timeEffect > 0) {
    setMensagens((prev) => [
      ...prev,
      { tipo: 'buff', texto: `${enemy.name} atordoado!` },
      { tipo: 'sistema', texto: `--- Fim do ${round}° Round ---` },
    ]);
    return;
  }

  // 3) Escolhe e parseia a ação
  const raw = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  let atk = parseAction(raw);

  // 4) Se não tiver dano, DC ou multiattack, usa ataque básico
  if (!atk.damage.length && !atk.dc && !atk.multiattack_type) {
    const fallback =
      enemy.actions.find((a) => /slam|bite|claw/i.test(a.name)) ||
      enemy.actions.find((a) => a.attack_bonus != null);
    atk = parseAction(fallback || raw);
  }

  const mensagens = [];
  const acoesParaExecutar = atk.multiattack_type
    ? atk.actions.flatMap((sub) => {
        const full = enemy.actions.find((a) => a.name === sub.action_name);
        return full ? Array(Number(sub.count) || 1).fill(full) : [];
      })
    : [atk];

  let totalDano = 0;

  // 5) Processa cada sub-ação
  for (const rawA of acoesParaExecutar) {
    const acao = parseAction(rawA);
    const roll = rolarDado(20);
    const crit = roll === 20;
    const bonusAtk = acao.attack_bonus ?? 0;
    const modRoll = roll + bonusAtk;
    const defesa = player.cArmor;
    const esquiva = player.buff.esquiva?.timeEffect > 0;
    const invis = player.buff.sumir?.timeEffect > 0;
    const acertou = !esquiva && !invis && modRoll > defesa;

    if (esquiva || invis) {
      mensagens.push({ tipo: 'buff', texto: `${player.name} intangível!` });
    }

    let danoAcao = 0;

    // 5.1) Ataque físico
    if (acao.attack_bonus != null) {
      if (acertou) {
        // calcula dano
        for (const d of acao.damage) {
          danoAcao += rolarDadoPersonalizado(d.damage_dice);
        }
        if (crit) danoAcao *= 2;

        mensagens.push({
          tipo: 'inimigo',
          texto: `${enemy.name} ${crit ? 'CRÍTICO' : 'acertou'} com ${
            acao.name
          } 🎲${roll}+${bonusAtk} = ${modRoll}, causando ${danoAcao}💥`,
        });

        // aplica dano imediato
        totalDano += danoAcao;

        // 5.1.1) Salvaguarda + condição (aplica apenas a primeira)
        if (acao.dc && acao.conditions.length) {
          let idx = acao.dc.dc_type?.index || 'dexterity';
          if (!player.attributes[idx]) idx = 'dexterity';
          const modSal = player.attributes[idx].mod;
          const saveRoll = rolarDado(20) + modSal;
          const DC = acao.dc.dc_value;

          mensagens.push({
            tipo: 'sistema',
            texto: `${player.name} rolou salvaguarda (${idx}): ${saveRoll} vs DC ${DC}`,
          });

          if (saveRoll < DC) {
            // aplica apenas a primeira condição
            const cond = acao.conditions[0];
            const data = conditionsData[cond.index];
            setPlayer((prev) => ({
              ...prev,
              buff: {
                ...prev.buff,
                [cond.index]: {
                  nome: data.nome,
                  descricao: data.descricao,
                  timeEffect: data.duracao,
                  penalidades: data.penalidades,
                },
              },
            }));
            mensagens.push({
              tipo: 'sistema',
              texto: `${player.name} sofreu a condição ${data.nome}: ${data.descricao}`,
            });
          } else {
            mensagens.push({
              tipo: 'sistema',
              texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
            });
          }
        }
      } else {
        mensagens.push({
          tipo: 'inimigo',
          texto: `${enemy.name} errou ${acao.name} 🎲${roll}+${bonusAtk} = ${modRoll}🛡️`,
        });
      }
    }
    // 5.2) Ação baseada só em DC (sopro, magia de status...)
    else if (acao.dc) {
      let idx = acao.dc.dc_type?.index || 'dexterity';
      if (!player.attributes[idx]) idx = 'dexterity';
      const modSal = player.attributes[idx].mod;
      const saveRoll = rolarDado(20) + modSal;
      const DC = acao.dc.dc_value;

      mensagens.push({
        tipo: 'sistema',
        texto: `${player.name} rolou salvaguarda (${idx}): ${saveRoll} vs DC ${DC}`,
      });

      if (saveRoll < DC) {
        // aplica apenas a primeira condição
        const cond = acao.conditions[0];
        const data = conditionsData[cond.index];
        setPlayer((prev) => ({
          ...prev,
          buff: {
            ...prev.buff,
            [cond.index]: {
              nome: data.nome,
              descricao: data.descricao,
              timeEffect: data.duracao,
              penalidades: data.penalidades,
            },
          },
        }));
        mensagens.push({
          tipo: 'sistema',
          texto: `${player.name} sofreu a condição ${data.nome}: ${data.descricao}`,
        });

        // aplica meio-dano se for o caso
        let halfDmg = 0;
        for (const d of acao.damage) {
          let tmp = rolarDadoPersonalizado(d.damage_dice);
          if (acao.dc.success_type === 'half') tmp = Math.floor(tmp / 2);
          halfDmg += tmp;
        }
        if (halfDmg) {
          mensagens.push({
            tipo: 'inimigo',
            texto: `${enemy.name} usou ${acao.name}, causando ${halfDmg}💥`,
          });
          totalDano += halfDmg;
        }
      } else {
        mensagens.push({
          tipo: 'sistema',
          texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
        });
      }
    }
    // 5.3) Outras ações (buffs, etc.)
    else {
      mensagens.push({
        tipo: 'inimigo',
        texto: `${enemy.name} usou ${acao.name}: ${acao.desc}`,
      });
    }
  }

  // 6) Aplica dano acumulado
  if (totalDano > 0) {
    setPlayerHP((hp) => Math.max(0, hp - totalDano));
  }

  mensagens.push({ tipo: 'sistema', texto: `--- Fim do ${round}° Round ---` });
  setMensagens((prev) => [...prev, ...mensagens]);
}


// Função auxiliar para rolar expressões de dano como "2d6+3"
function rolarDadoPersonalizado(diceExpr) {
  const match = diceExpr.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    console.error("Expressão inválida de dado:", diceExpr);
    return 0;
  }
  const quantidade = parseInt(match[1], 10);
  const lados = parseInt(match[2], 10);
  const modificador = match[3] ? parseInt(match[3], 10) : 0;

  let total = 0;
  for (let i = 0; i < quantidade; i++) {
    total += rolarDado(lados);
  }
  total += modificador;
  return total;
}
