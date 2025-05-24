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
    setEnemyHP((hp) => Math.max(0, hp - danoTotal));
    if (enemyHP - danoTotal > 0) setTimeout(turnoInimigo, 1000);
  } else {
    if (enemyHP - danoTotal > 0) setTimeout(turnoInimigo, 1000);
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

function detectConditions(texto) {
  const conditionsEncontradas = [];

  for (const [key, condition] of Object.entries(conditionsData)) {
    const regex = new RegExp(`\\b${key}\\b`, "i"); // procura pela palavra exata, ignorando case
    if (regex.test(texto)) {
      conditionsEncontradas.push({
        index: key,
        ...condition,
      });
    }
  }

  return conditionsEncontradas;
}

export default detectConditions;

// Função auxiliar para parsear uma ação de monstro
export function parseAction(action) {
  if (!action) return {};

  // Caso seja Multiattack
  if (action.multiattack_type) {
    return {
      name: action.name || "Multiattack",
      multiattack_type: action.multiattack_type,
      actions: action.actions?.map((sub) => ({
        action_name: sub.action_name,
        count: Number(sub.count) || 1,
        type: sub.type || "melee",
      })) || [],
      desc: action.desc,
      damage: [], // Multiattack geralmente não possui dano direto
    };
  }

  // Caso seja uma ação normal
  return {
    name: action.name,
    desc: action.desc,
    attack_bonus: action.attack_bonus,
    dc: action.dc,
    damage: action.damage,
    conditions: action.conditions,
    type: action.type, 
    // Outros campos relevantes
  };
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

  // Atualiza buffs do player
  const buffsAtualizados = BuffUtils.AtualizarBuffs(player.buff);
  setPlayer((prev) => ({ ...prev, buff: buffsAtualizados }));

  const temBuffEmpurrar = player.buff["empurrar"]?.timeEffect > 0;
  if (temBuffEmpurrar) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "buff", texto: `${enemy.name} atordoado!` },
      { tipo: "sistema", texto: `--- Fim do ${round}° Round ---` },
    ]);
    return;
  }

  // Seleciona ação aleatória
  const atkBruto = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  const atk = parseAction(atkBruto);
  console.log("Ação selecionada:", atk);

  const mensagens = [];
  
  // ✅ Lógica para considerar Multiattack + count
  const acoesParaExecutar = atk.multiattack_type
    ? atk.actions.flatMap((sub) => {
        const acaoCompleta = enemy.actions.find((a) => a.name === sub.action_name);
        if (!acaoCompleta) return [];
        const count = Number(sub.count) || 1;
        return Array(count).fill(acaoCompleta);
      })
    : [atk];

  let totalDano = 0;

  for (const acao of acoesParaExecutar) {
    console.log("Inimigo:", enemy.name);
    console.log("Ação escolhida:", acao.name);

    const acerto = rolarDado(20);
    const crit = acerto === 20;
    const bonusAtaque = acao.attack_bonus ?? 0;
    const modificador = acerto + bonusAtaque;
    const defesa = player.cArmor;

    const esquivaAtiva = player.buff["esquiva"]?.timeEffect > 0;
    const sumirAtivo = player.buff["sumir"]?.timeEffect > 0;
    let sucesso = !(esquivaAtiva || sumirAtivo) && modificador > defesa;

    if (esquivaAtiva || sumirAtivo) {
      mensagens.push({ tipo: "buff", texto: `${player.name} intangível!` });
    }

    // Lógica de salvaguarda
    if (acao.dc) {
      const modSalvaguarda = acao.dc.dc_type.index;
      const atributoMod = player.attributes[modSalvaguarda]?.mod ?? 0;
      const resultadoSalva = rolarDado(20) + atributoMod;
      const dificuldade = acao.dc.dc_value ?? 10;
      const passou = resultadoSalva >= dificuldade;

      mensagens.push({
        tipo: "sistema",
        texto: `${player.name} rolou salvaguarda (${acao.dc.dc_type.name}): ${resultadoSalva} vs DC ${dificuldade}`,
      });

      if (!passou && acao.conditions?.length) {
        acao.conditions.forEach((cond) => {
          const dataCond = conditionsData[cond.index];
          if (!dataCond) return;

          setPlayer((prev) => ({
            ...prev,
            buff: {
              ...prev.buff,
              [cond.index]: {
                nome: dataCond.nome,
                descricao: dataCond.descricao,
                timeEffect: dataCond.duracao,
                penalidades: dataCond.penalidades,
              },
            },
          }));

          mensagens.push({
            tipo: "sistema",
            texto: `${player.name} sofreu a condição ${dataCond.nome}: ${dataCond.descricao}`,
          });
        });
      } else if (passou) {
        mensagens.push({
          tipo: "sistema",
          texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
        });
      }
    }

    // Se for ataque com bônus
    if (acao.attack_bonus != null) {
      if (sucesso) {
        let danoAcao = 0;
        for (const d of acao.damage || []) {
          let dano = rolarDanoPersonalizado(d.damage_dice);
          if (acao.dc && acao.dc.success_type === "half") {
            const modSal = player.attributes[acao.dc.dc_type.index]?.mod ?? 0;
            const resSal = rolarDado(20) + modSal;
            if (resSal >= (acao.dc.dc_value ?? 10)) dano = Math.floor(dano / 2);
          }
          danoAcao += dano;
        }
        if (crit) danoAcao *= 2;

        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} ${crit ? "CRÍTICO" : "acertou"} com ${
            acao.name
          } 🎲${acerto}+${bonusAtaque} = ${modificador}, causando ${danoAcao}💥`,
        });
        totalDano += danoAcao;
      } else {
        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} errou ${acao.name} 🎲${acerto}+${bonusAtaque} = ${modificador}🛡️`,
        });
      }
    }
  }

  if (totalDano > 0) {
    setPlayerHP((hp) => Math.max(0, hp - totalDano));
  }

  mensagens.push({ tipo: "sistema", texto: `--- Fim do ${round}° Round ---` });
  setMensagens((prev) => [...prev, ...mensagens]);
}


function rolarDanoPersonalizado(diceExpr) {
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

  console.log(
    `Rolou ${quantidade}.d${lados}.${
      modificador >= 0 ? "+" : ""
    }${modificador}:`,
    total
  );
  return total;
}
