// import { interpretarPenalidades } from "../buffDebuffsComponents/interpretarPenalidades";
import { aplicarDano } from "./aplicarDano";
import { rolarDado } from "./rolarDados";

/**
 * Função responsável pelo ataque principal do jogador.
 * Realiza o cálculo de acerto, verifica crítico e aplica o dano ao inimigo.
 */
export function ataqueJogador({
  combateFinalizado,
  character,
  player,
  enemy,
  setMensagens,
  setEnemyHP,
  enemyHP,
  setEnemy,
  setTimeout,
  turnoInimigo,
  dano, // { dano: número, tipo: string }
}) {
  if (combateFinalizado) return; // Se o combate terminou, não faz nada.

  // let acerto = rolarDado(20, "normal");
  let acerto = 19;

  if (character.buff && character.buff.sumir) {
    acerto = 20;
    console.log("SUMIUUUUUUUUUUU", acerto);
  }

  // Calcula o maior modificador de ataque: Destreza ou Força.
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );

  // Bônus total inclui o modificador e o bônus de proficiência.
  let bonusTotal = modAtk + character.proficienciesBonus;

  if (character.buff && character.buff.pesquisar) {
    bonusTotal += modAtk;
    console.log("PESQUISOU O INIMIGO", bonusTotal);
  }

  // Verifica se o ataque foi bem-sucedido comparando com a CA do inimigo.
  const sucesso = acerto + bonusTotal >= enemy.armor_class[0].value;

  // Verifica se foi um ataque crítico.
  const critico = acerto === 20;

  // Se for crítico, dobra o dano.
  const danoTotal = acerto === 20 ? dano.dano * 2 : dano.dano;

  // Atualiza mensagens no log.
  setMensagens((prev) => [
    ...prev,
    {
      tipo: "jogador",
      texto: sucesso
        ? `Você ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causando ${danoTotal} de dano!
`
        : `Você errou 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}🛡️`,
    },
  ]);

  // Força o turno a seguir se inimigo ainda está vivo.
  if (sucesso) {
    const novaVida = aplicarDano(
      enemy,
      { dano: danoTotal, tipo: dano.tipo },
      setMensagens
    );

    setEnemy((prev) => ({ ...prev, vidaAtual: novaVida }));

    if (novaVida > 0) {
      setTimeout(turnoInimigo, 1000);
    }
  } else setTimeout(turnoInimigo, 1000);
}

/**
 * Função responsável pelo ataque com arma secundária (off-hand).
 * Realiza o cálculo de acerto, verifica crítico e aplica o dano ao inimigo.
 */
export function ataqueJogadorOffHand({
  combateFinalizado,
  character,
  enemy,
  setMensagens,
  setEnemyHP,
  dano, // { dano: número, tipo: string }
}) {
  if (combateFinalizado) return; // Se o combate terminou, não faz nada.

  // const acerto = rolarDado(20, "ataqueJogadorOffHand");
  let acerto = 19;

  if (character.buff && character.buff.sumir) {
    acerto = 20;
    console.log("SUMIUUUUUUUUUUU", acerto);
  }

  // Calcula o modificador de ataque.
  const modAtk = Math.max(
    character.attributes.dex.mod,
    character.attributes.str.mod
  );

  let bonusTotal = modAtk; // Sem bônus de proficiência.

  if (character.buff && character.buff.pesquisar) {
    bonusTotal += modAtk;
    console.log("PESQUISOU O INIMIGO", bonusTotal);
  }

  // Verifica sucesso.
  const sucesso = acerto + bonusTotal > enemy.armor_class[0].value;

  // Verifica crítico.
  const critico = acerto === 20;

  // Log da mensagem do ataque.
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
    aplicarDano(enemy, { dano: danoTotalOff, tipo: dano.tipo }, setMensagens);
    if (typeof setEnemyHP === "function") {
      setEnemyHP(enemy.vidaAtual);
    }
  }
}

/**
 * Função que dispara o ataque do jogador via botão.
 * Realiza verificações de arma, propriedades, extra damage e off-hand.
 */
export function ataquePorBotao({
  equipment,
  setPrecisaRecarregar,
  ataqueJogador,
  ataqueJogadorOffHand,
  rolarDado,
  alvo, // Exemplo: enemy
  tipo, // Exemplo: "fire", "cold", etc.
}) {
  // Define arma principal ou de duas mãos.
  const arma = equipment.weapon || equipment["two-handed"];

  console.log(arma || "desarmado"); // Debug.

  let armaTipo;

  // Identifica o tipo de dano da arma principal.
  if (equipment.weapon?.status?.damage_type?.index) {
    armaTipo = equipment.weapon.status.damage_type.index;
  } else if (equipment["two-handed"]?.status?.damage_type?.index) {
    armaTipo = equipment["two-handed"].status.damage_type.index;
  }

  // Verifica dano extra de armas two-handed.
  let extraDamage = null;

  if (equipment["two-handed"]?.status?.extra_damage?.length > 0) {
    // Se tiver múltiplos extras, pega o primeiro.
    extraDamage = equipment["two-handed"].status.extra_damage[0];
  } else if (
    equipment["two-handed"]?.status?.damage_dice &&
    equipment["two-handed"]?.status?.damage_type?.index &&
    (!arma || arma !== equipment["two-handed"])
  ) {
    // Se não for arma principal, mas tem dano, adiciona como extra.
    extraDamage = {
      damage_dice: equipment["two-handed"].status.damage_dice,
      damage_type: equipment["two-handed"].status.damage_type,
    };
  }

  // Define expressão de dado da arma, ou padrão "1d4".
  const diceExpr = arma?.status?.damage_dice || "1d4";

  // Extrai quantidade de lados do dado (ex.: "1d6" => 6).
  const lados = parseInt(diceExpr.split("d")[1], 10) || 6;

  // Verifica e executa ataque offHand.
  if (equipment.offHand) {
    const diceExprOff = equipment.offHand.status.damage_dice || "1d4";
    const tipoOff = equipment.offHand.status.damage_type?.index || undefined;
    const offLados = parseInt(diceExprOff.split("d")[1], 10) || 6;

    // Rola o dano para offHand.
    const danoOff = rolarDado(offLados, "dano offHand");

    // Executa ataque offHand.
    ataqueJogadorOffHand({ dano: danoOff, tipo: tipoOff });
  }

  // Verifica se a arma possui a propriedade "loading" e ajusta necessidade de recarregar.
  const isLoading = arma?.properties?.some((p) => p.index === "loading");

  if (isLoading) {
    setPrecisaRecarregar(false); // Desativa flag de recarregamento.
  }

  // Executa ataque principal.
  const danoValor = rolarDado(lados, "ataque principal");

  // console.log("ataque jogador", diceExpr, "tipo:", armaTipo);

  ataqueJogador({ dano: danoValor, tipo: armaTipo });
}
