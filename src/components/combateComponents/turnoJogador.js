import { aplicarDano } from "./aplicarDano";
import { rolarDado } from "./rolarDados";

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
  dano, // aqui chega { dano: número, tipo: string }
}) {
  if (combateFinalizado) return;

  const acerto = 20; // fixo para teste
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );
  const bonusTotal = modAtk + character.proficienciesBonus;
  const sucesso = acerto + bonusTotal > enemy.armor_class[0].value;
  const critico = acerto === 20;
  const danoTotal = critico ? dano.dano * 2 : dano.dano;

  setMensagens((prev) => [
    ...prev,
    {
      tipo: "jogador",
      texto: sucesso
        ? `Você ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}`
        : `Você errou 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}🛡️`,
    },
  ]);

  if (sucesso) {
    // danoTotal já considera o crítico
    const tipo = dano.tipo;
    aplicarDano(enemy, { dano: danoTotal, tipo }, setMensagens);
    setEnemyHP(enemy.vida);
    if (enemy.vida > 0) setTimeout(turnoInimigo, 1000);
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
  dano, // { dano, tipo }
}) {
  if (combateFinalizado) return;

  const acerto = rolarDado(20, "ataqueJogadorOffHand");
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );
  const bonusTotal = modAtk;
  const sucesso = acerto + bonusTotal > enemy.armor_class[0].value;
  const critico = acerto === 20;

  setMensagens((prev) => [
    ...prev,
    {
      tipo: "jogador",
      texto: sucesso
        ? `Você usou secundária ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}`
        : `Você errou secundária 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }🛡️`,
    },
  ]);

  if (sucesso) {
    const danoTotalOff = critico ? dano.dano * 2 : dano.dano;
    const tipo = dano.tipo;
    aplicarDano(enemy, { dano: danoTotalOff, tipo }, setMensagens);
    setEnemyHP(enemy.vida);
  }
}

// Função para ataque por botão
export function ataquePorBotao({
  equipment,
  setPrecisaRecarregar,
  ataqueJogador,
  ataqueJogadorOffHand,
  rolarDado,
  alvo, // ex.: enemy
  tipo, // ex.: "fire", "cold", etc.
}) {
  // arma principal ou two-handed
  const arma = equipment.weapon || equipment["two-handed"];
  console.log(arma);
  let armaTipo;
  if (equipment.weapon && equipment.weapon.status?.damage_type?.index) {
    armaTipo = equipment.weapon.status.damage_type.index;
  } else if (equipment["two-handed"] && equipment["two-handed"].status?.damage_type?.index) {
    armaTipo = equipment["two-handed"].status.damage_type.index;
  }

  // Se two-handed tiver um segundo tipo de dano, adiciona também
  let extraDamage = null;
  if (
    equipment["two-handed"] &&
    Array.isArray(equipment["two-handed"].status?.extra_damage) &&
    equipment["two-handed"].status.extra_damage.length > 0
  ) {
    // Suporta múltiplos tipos extras, mas pega só o primeiro para exemplo
    extraDamage = equipment["two-handed"].status.extra_damage[0];
  } else if (
    equipment["two-handed"] &&
    equipment["two-handed"].status?.damage_dice &&
    equipment["two-handed"].status?.damage_type?.index &&
    (!arma || arma !== equipment["two-handed"])
  ) {
    // Se não for a arma principal, mas tem dano, adiciona como extra
    extraDamage = {
      damage_dice: equipment["two-handed"].status.damage_dice,
      damage_type: equipment["two-handed"].status.damage_type,
    };
  }
  
  const diceExpr = arma?.status?.damage_dice || "1d4";
  const lados = parseInt(diceExpr.split("d")[1], 10) || 6;

  // offHand, se houver
  if (equipment.offHand) {
    const diceExprOff = equipment.offHand.status.damage_dice || "1d4";
    const tipoOff = equipment.offHand.status.damage_type.index || "Sem tipo";
    const offLados = parseInt(diceExprOff.split("d")[1], 10) || 6;
    const danoOff = rolarDado(offLados, "dano offHand");
    ataqueJogadorOffHand({ dano: danoOff, tipo: tipoOff });
  }

  // munição e recarga
  const isLoading = arma?.properties?.some((p) => p.index === "loading");
  if (isLoading) setPrecisaRecarregar(false);

  // ataque principal
  const danoValor = rolarDado(lados, "ataque principal");
  // console.log("ataque jogador", diceExpr, "tipo:", armaTipo);
  ataqueJogador({ dano: danoValor, tipo: armaTipo });
}
