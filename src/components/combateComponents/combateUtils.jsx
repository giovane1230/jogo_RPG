import conditionsData from "../../api/conditionsData";

// Função para rolar dado
export function rolarDado(lados) {
  return Math.floor(Math.random() * lados) + 1;
}

function aplicarCondicao(player, nomeCondicao) {
  const condicao = conditionsData[nomeCondicao];
  if (!condicao) return player;

  return {
    ...player,
    buff: {
      ...player.buff,
      [nomeCondicao]: {
        ...condicao,
        timeEffect: condicao.duracao,
      },
    },
  };
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

function parseHabilidade(texto) {
  const lines = texto
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // Objeto final que vamos montar
  const habilidade = {
    name: "",
    type: null,
    toHit: null,
    reach: null,
    range: null,
    targets: 1,
    damage: null,
    effects: [],
    description: "",
  };

  // O nome normalmente é a primeira linha
  habilidade.name = lines[0];

  // Unir todo texto para facilitar regex multiline
  const fullText = lines.join(" ");

  // --- TIPO E Atributos básicos ---
  // Detecta ataques corpo a corpo (melee) e ataques à distância (ranged)
  const attackMatch = fullText.match(
    /(Melee|Ranged) Weapon Attack: \+(\d+) to hit, (reach|range) (\d+) ft\., (one|\d+) target/
  );
  if (attackMatch) {
    habilidade.type = attackMatch[1].toLowerCase() + " attack"; // melee attack ou ranged attack
    habilidade.toHit = parseInt(attackMatch[2]);
    if (attackMatch[3] === "reach") habilidade.reach = parseInt(attackMatch[4]);
    else habilidade.range = parseInt(attackMatch[4]);
    habilidade.targets =
      attackMatch[5] === "one" ? 1 : parseInt(attackMatch[5]);
  }

  // --- DANO ---
  // Exemplo: Hit: 12 (2d6 + 5) bludgeoning damage.
  // Pode ter múltiplos tipos, por isso vamos buscar todas as ocorrências
  const damageRegex = /Hit: \d+ \(([\dd+\s]+)\) (\w+) damage/g;
  let match;
  const danos = [];
  while ((match = damageRegex.exec(fullText)) !== null) {
    danos.push({
      amount: match[1].trim(),
      type: match[2].trim(),
    });
  }
  if (danos.length === 1) habilidade.damage = danos[0];
  else if (danos.length > 1) habilidade.damage = danos; // array se múltiplos danos

  // --- EFEITOS / CONDIÇÕES ---
  // Exemplos de padrões para doenças, charmes, salvamentos
  // Você pode ir acrescentando regex para vários tipos de efeitos

  // Doença (diseased)
  const diseasedMatch = fullText.match(/diseased/gi);
  if (diseasedMatch) {
    // Tentativa de extrair DC e teste de resistência
    const dcMatch = fullText.match(/DC (\d+)/);
    const saveMatch = fullText.match(
      /(Constitution|Wisdom|Strength|Dexterity|Intelligence|Charisma) saving throw/
    );
    habilidade.effects.push({
      type: "condition",
      name: "diseased",
      dc: dcMatch ? parseInt(dcMatch[1]) : null,
      savingThrow: saveMatch ? saveMatch[1] : null,
      description: "Aplica condição diseased conforme regras descritas.",
    });
  }

  // Charm (exemplo de Enslave)
  const charmMatch = fullText.match(/charmed/gi);
  if (charmMatch) {
    const dcMatch = fullText.match(/DC (\d+)/);
    const saveMatch = fullText.match(
      /(Constitution|Wisdom|Strength|Dexterity|Intelligence|Charisma) saving throw/
    );
    habilidade.effects.push({
      type: "condition",
      name: "charmed",
      dc: dcMatch ? parseInt(dcMatch[1]) : null,
      savingThrow: saveMatch ? saveMatch[1] : null,
      description: "Aplica condição charmed conforme regras descritas.",
    });
  }

  // Exemplo para detectar se é multiattack (número de ataques)
  const multiattackMatch = fullText.match(/Multiattack/gi);
  if (multiattackMatch) {
    habilidade.type = "multiattack";
    // Pode extrair quantos ataques são feitos
    const countMatch = fullText.match(
      /makes (\w+) (?:tentacle|melee|ranged) attacks?/i
    );
    if (countMatch) {
      let countStr = countMatch[1];
      let count = isNaN(parseInt(countStr))
        ? countStr.toLowerCase() === "three"
          ? 3
          : null
        : parseInt(countStr);
      if (count) habilidade.multiattackCount = count;
    }
  }

  // --- OUTRAS INFORMAÇÕES / DESCRIÇÃO ---
  habilidade.description = fullText;

  return habilidade;
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

  const atk = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  const mensagens = [];

  const acoesParaExecutar = atk.actions?.length
    ? atk.actions
        .map((sub) => enemy.actions.find((a) => a.name === sub.action_name))
        .filter(Boolean)
    : [atk];

  let totalDano = 0;

  for (const acao of acoesParaExecutar) {
    console.log("todas acoes", enemy);
    console.log("acao", acao);
    const acerto = rolarDado(20);
    const crit = acerto === 20;
    const bonusAtaque = acao.attack_bonus ?? 0;
    const modificador = acerto + bonusAtaque;
    const esquivaAtiva = player.buff["esquiva"]?.timeEffect > 0;
    const sumirAtivo = player.buff["sumir"]?.timeEffect > 0;
    let sucesso = !(esquivaAtiva || sumirAtivo) && modificador > player.cArmor;

    if (esquivaAtiva || sumirAtivo) {
      mensagens.push({ tipo: "buff", texto: `${player.name} intangível!` });
    }

    if (sucesso) {
      let danoAcao = 0;
      for (const d of acao.damage || []) {
        const dano = rolarDanoPersonalizado(d.damage_dice);
        danoAcao += dano;
      }

      if (crit) danoAcao *= 2;
      totalDano += danoAcao;

      mensagens.push({
        tipo: "inimigo",
        texto: `${enemy.name} ${crit ? "CRÍTICO" : "acertou"} com ${
          acao.name
        } 🎲${acerto}+${bonusAtaque} = ${modificador}, causando ${danoAcao}💥`,
      });
    } else {
      mensagens.push({
        tipo: "inimigo",
        texto: `${enemy.name} errou ${acao.name} 🎲${acerto}+${bonusAtaque} = ${modificador}🛡️`,
      });
    }
  }

  if (totalDano > 0) {
    setPlayerHP((hp) => Math.max(0, hp - totalDano));
  }

  mensagens.push({ tipo: "sistema", texto: `--- Fim do ${round}° Round ---` });
  setMensagens((prev) => [...prev, ...mensagens]);

  const textoAbolethTentacle = `The dragon exhales lightning in a 90-foot line that is 5 ft. wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.`;

  console.log("isso aqui ta muito bom", parseHabilidade(textoAbolethTentacle));
}

function rolarDanoPersonalizado(diceExpr) {
  const [quantidade, lados] = diceExpr.split("d").map(Number);
  let total = 0;
  for (let i = 0; i < quantidade; i++) {
    total += rolarDado(lados);
  }
  return total;
}
