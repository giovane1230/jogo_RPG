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
  const modAtk = Math.max(character.attributes.dex.mod, character.attributes.str.mod);
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
          texto: `Você ${critico ? "CRÍTICO" : "acertou"} 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ${danoTotal}💥`,
        }
      : {
          tipo: "jogador",
          texto: `Você errou 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}🛡️`,
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
  const modAtk = Math.max(character.attributes.dex.mod, character.attributes.str.mod);
  const bonusTotal = modAtk;
  const sucesso = acerto + bonusTotal > enemy.armor_class?.[0]?.value;
  const critico = acerto === 20;
  const danoTotal = critico ? dano * 2 : dano;

  setMensagens((prev) => [
    ...prev,
    sucesso
      ? {
          tipo: "jogador",
          texto: `Você usou sua SECUNDARIA ${critico ? "CRÍTICO" : "acertou"} 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ${danoTotal}💥`,
        }
      : {
          tipo: "jogador",
          texto: `Você errou SECUNDARIA 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}🛡️`,
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
  setPlayer((prev) => ({
    ...prev,
    buff: buffsAtualizados,
  }));
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
  const lados = parseInt(atk.damage?.[0]?.damage_dice.split("d")[1], 10) || 6;
  const dano = rolarDado(lados);

  const acerto = rolarDado(20);
  const crit = acerto === 20;
  let sucesso = acerto + 5 > player.cArmor;
  const danoTotal = crit ? dano * 2 : dano;

  const temBuffDefender = player.buff["defender"]?.timeEffect > 0;
  const temBuffEsquiva = player.buff["esquiva"]?.timeEffect > 0;
  const temBuffSumir = player.buff["sumir"]?.timeEffect > 0;

  if (temBuffEsquiva || temBuffSumir) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "buff", texto: `${player.name} intangivel!` },
    ]);
    sucesso = false;
  }

  if (temBuffDefender) {
    sucesso = acerto + 5 > player.cArmor + player.attributes.con.mod;

    setMensagens((prev) => [
      ...prev,
      sucesso
        ? {
            tipo: "inimigo",
            texto: `${enemy.name} ${
              crit ? "CRÍTICO" : "acertou"
            } 🎲${acerto}+5 = ${acerto + 5}, causou ${danoTotal}💥`,
          }
        : {
            tipo: "jogador",
            texto: `${player.name} defendeu! 🎲${acerto}+5 = ${acerto + 5}🛡️`,
          },
    ]);
  }

  setMensagens((prev) => [
    ...prev,
    sucesso
      ? {
          tipo: "inimigo",
          texto: `${enemy.name} ${
            crit ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+5 = ${acerto + 5}, causou ${danoTotal}💥`,
        }
      : {
          tipo: "inimigo",
          texto: `${enemy.name} errou 🎲${acerto}+5 = ${acerto + 5}🛡️`,
        },
    { tipo: "sistema", texto: `--- Fim do ${round}° Round ---` },
  ]);

  if (sucesso) setPlayerHP((hp) => Math.max(0, hp - danoTotal));
}