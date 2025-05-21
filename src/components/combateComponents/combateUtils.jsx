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

function detectConditions(texto) {
  const conditionsList = [
    "blinded",
    "charmed",
    "deafened",
    "exhaustion",
    "frightened",
    "grappled",
    "incapacitated",
    "invisible",
    "paralyzed",
    "petrified",
    "poisoned",
    "prone",
    "restrained",
    "stunned",
    "unconscious",
  ];

  const encontrados = conditionsList.filter((cond) =>
    new RegExp(`\\b${cond}\\b`, "i").test(texto)
  );

  return encontrados;
}

// Função auxiliar para parsear uma ação de monstro
function parseAction(action) {
  const texto = action.desc || "";
  const name = action.name || "Ataque Desconhecido";

  const bonusMatch = texto.match(/\+(\d+)\s+to hit/);
  const attack_bonus = bonusMatch ? parseInt(bonusMatch[1]) : null;

  // 2. Pega o DC
  const dcMatch = texto.match(
    /DC\s+(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)/i
  );

  let success_type = "none"; // valor padrão
  if (/half\s+as\s+much\s+damage/i.test(texto)) {
    success_type = true;
  }

  const dc = dcMatch
    ? {
        dc_type: {
          index: dcMatch[2].slice(0, 3).toLowerCase(),
          name: dcMatch[2].toUpperCase(),
          url: `/api/2014/ability-scores/${dcMatch[2]
            .slice(0, 3)
            .toLowerCase()}`,
        },
        dc_value: parseInt(dcMatch[1]),
        success_type,
      }
    : null;

  const damageMatches = [
    ...texto.matchAll(
      /\(([\dd\s\+\-]+)\)\s*(bludgeoning|slashing|piercing|acid|fire|cold|lightning|poison|necrotic|radiant|force|psychic|thunder)\s+damage/gi
    ),
  ];

  const damage = damageMatches.map((match) => ({
    damage_type: {
      index: match[2].toLowerCase(),
      name: match[2].charAt(0).toUpperCase() + match[2].slice(1),
    },
    damage_dice: match[1].replace(/\s+/g, ""),
  }));

  const conditions = detectConditions ? detectConditions(texto) : [];

  const rangeMatch = texto.match(/(reach|range)\s+([\d\s\w\.]+)/i);
  const targetMatch = texto.match(/(one|two|each|up to \d+)\s+target/i);
  const areaMatch = texto.match(
    /\b(\d{1,3})\s*ft\.\s*(radius|cone|line|sphere)/i
  );

  return {
    name,
    desc: texto,
    ...(attack_bonus !== null && { attack_bonus }),
    ...(dc && { dc }),
    ...(damage.length > 0 && { damage }),
    ...(conditions.length > 0 && { conditions }),
    ...(rangeMatch && { range: rangeMatch[2].trim() }),
    ...(targetMatch && { target: targetMatch[0] }),
    ...(areaMatch && { area: `${areaMatch[1]}ft. ${areaMatch[2]}` }),
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

  const acoesParseadas = enemy.actions.map(parseAction);
  console.log("🧠 Ações Parseadas do Monstro:", acoesParseadas);

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

  // Seleciona ação aleatória
  const atkBruto =
    enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  const atk = parseAction(atkBruto);
  const mensagens = [];

  console.log("🎯 Ataque escolhido:", parseAction(atk));

  const acoesParaExecutar = atkBruto.actions?.length
    ? atkBruto.actions
        .map((sub) => enemy.actions.find((a) => a.name === sub.action_name))
        .filter(Boolean)
        .map(parseAction)
    : [atk];

  let totalDano = 0;

  for (const acao of acoesParaExecutar) {
    const acerto = rolarDado(20);
    const crit = acerto === 20;
    const bonusAtaque = parseAction(atk).attack_bonus ?? 0;
    const modificador = acerto + bonusAtaque;

    const esquivaAtiva = player.buff["esquiva"]?.timeEffect > 0;
    const sumirAtivo = player.buff["sumir"]?.timeEffect > 0;
    let sucesso = !(esquivaAtiva || sumirAtivo) && modificador > player.cArmor;

    console.log("ca:",player.cArmor, "ata", modificador);

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

      if (acao.conditions?.length) {
        mensagens.push({
          tipo: "efeito",
          texto: `Condicional: ${acao.conditions.join(", ")}`,
        });
      }
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
