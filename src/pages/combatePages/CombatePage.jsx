import React, { useEffect, useState } from "react";
import { useCombat } from "../../context/CombateContext";
import { useCharacter } from "../../context/CharacterContext";
import BarraStatus from "../../components/barsComponents/BarraStatus";
import DropComponent from "../../components/monsterComponents/dropComponent";
import { useCharEquip } from "../../context/charEquipContext";
import CombatPotions from "../../components/combateComponents/combatPotions";
import xpLevels from "../../api/regras";

function CombatePage() {
  const { player, enemy, playerHP, setPlayerHP } = useCombat();
  const { character, setCharacter } = useCharacter();
  const { equipment } = useCharEquip();

  const [enemyHP, setEnemyHP] = useState(enemy?.hit_points || 50);
  const [mensagens, setMensagens] = useState([]);
  const [combateFinalizado, setCombateFinalizado] = useState(false);
  const [dropReady, setDropReady] = useState(false);
  const [derrota, setDerrota] = useState(false);
  const [round, setRound] = useState(1);
  const [precisaRecarregar, setPrecisaRecarregar] = useState(true);

  if (!enemy)
    return <p>Combate Interrompido, por favor saia desta página...</p>;

  useEffect(() => {
    if (!combateFinalizado) {
      if (enemyHP <= 0) {
        finalizarCombate(true);
      } else if (playerHP <= 0) {
        finalizarCombate(false);
      }
    }
  }, [enemyHP, playerHP, combateFinalizado]);

  function finalizarCombate(jogadorVenceu) {
    setCombateFinalizado(true);

    if (jogadorVenceu) {
      setMensagens((prev) => [...prev, `Você derrotou ${enemy.name}!`]);
    } else {
      // derrota: Ouro perdido (aqui 5% do max)
      const ouroPerdido = Math.floor(character.gold / 20);
      setCharacter((prev) => ({
        ...prev,
        gold: character.gold - Math.floor(character.gold / 20),
      }));
      setMensagens((prev) => [
        ...prev,
        `Você foi derrotado! E perdeu ${ouroPerdido} de ouro.`,
      ]);
    }

    // ativa o drop (loot) para renderizar
    if (playerHP <= 0) {
      setDerrota(true);
      return;
    }
    setDropReady(true);
  }

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  function ataqueJogador(dano) {
    if (combateFinalizado) return;

    const acerto = rolarDado(20);
    const modAtk = Math.max(
      character.attributes.dex.mod,
      character.attributes.str.mod
    );
    const bonusTotal = modAtk + character.proficienciesBonus;
    const sucesso = acerto + bonusTotal > enemy.armor_class?.[0]?.value;
    const critico = acerto === 20;
    const danoTotal = critico ? dano * 2 : dano;

    setMensagens((prev) => [
      ...prev,
      sucesso
        ? `Você ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ⚔️${danoTotal}!`
        : `Você errou 🎲${acerto}+${bonusTotal} = ${acerto + bonusTotal}.`,
    ]);

    if (sucesso) {
      setEnemyHP((hp) => Math.max(0, hp - danoTotal));
      if (enemyHP - danoTotal > 0) setTimeout(turnoInimigo, 1000);
    } else {
      if (enemyHP - danoTotal > 0) setTimeout(turnoInimigo, 1000);
    }
  }

  function ataqueJogadorOffHand(dano) {
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

    // so da o dano bonus e acerto bonus se tiver a caracteristica
    // caso tenha fazer a logica aqui

    setMensagens((prev) => [
      ...prev,
      sucesso
        ? `Você usou sua SECUNDARIA ${
            critico ? "CRÍTICO" : "acertou"
          } 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }, causou ⚔️${danoTotal}!`
        : `Você errou SECUNDARIA 🎲${acerto}+${bonusTotal} = ${
            acerto + bonusTotal
          }.`,
    ]);

    if (sucesso) setEnemyHP((hp) => Math.max(0, hp - danoTotal));
  }

  function ataquePorBotao() {
    const diceExpr = equipment.weapon
      ? equipment.weapon.status
      : equipment["two-handed"]?.twoHandedDamage?.damage_dice || "1d4";

    const isAmmunition = equipment["two-handed"].properties?.some(
      (p) => p.index === "ammunition"
    );
    const isLoading = equipment["two-handed"].properties?.some(
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
      console.log("Precisa de munição, fazer a logica depois");
    }
    if (isLoading) {
      setPrecisaRecarregar(false);
    }
    const dano = rolarDado(lados);
    ataqueJogador(dano);
  }

  function turnoInimigo() {
    if (!enemy.actions?.length || combateFinalizado) return;
    const atk = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
    const lados = parseInt(atk.damage?.[0]?.damage_dice.split("d")[1], 10) || 6;
    const dano = rolarDado(lados);

    const acerto = rolarDado(20);
    const crit = acerto === 20;
    const sucesso = acerto + 5 > player.cArmor;
    const danoTotal = crit ? dano * 2 : dano;

    setRound((r) => r + 1);
    setMensagens((prev) => [
      ...prev,
      sucesso
        ? `${enemy.name} ${crit ? "CRÍTICO" : "acertou"} 🎲${acerto}+5 = ${
            acerto + 5
          }, causou ⚔️${danoTotal}!`
        : `${enemy.name} errou 🎲${acerto}+5 = ${acerto + 5}.`,
      `--- Fim do ${round}° Round ---`,
    ]);

    if (sucesso) setPlayerHP((hp) => Math.max(0, hp - danoTotal));
  }

  const recarregarArma = () => {
    setPrecisaRecarregar(true);
        setMensagens((prev) => [
      ...prev,
        "Você recarregou sua arma!"
    ]);
    setTimeout(turnoInimigo, 1000);
  };

  return (
    <div>
      <h1>Combate</h1>
      <button onClick={() => setPlayerHP(1)}>vida 1 player</button>
      <button onClick={() => setPlayerHP(100)}>vida 100 player</button>
      <button onClick={() => setEnemyHP(1)}>vida 1 enemy</button>

      {/* Status */}
      <BarraStatus
        label={player.name}
        valorAtual={playerHP}
        valorMaximo={character.vidaInicial || 100}
        CA={`| CA: ${player.cArmor}`}
        cor="blue"
      />
      <BarraStatus
        label={enemy.name}
        valorAtual={enemyHP}
        valorMaximo={enemy.hit_points || 50}
        CA={`| CA: ${enemy.armor_class?.[0]?.value}`}
        cor="red"
      />
      <BarraStatus
        label="Experiência"
        valorAtual={character.exp}
        valorMaximo={xpLevels[character.nivel + 1].xp}
        cor="yellow"
      />

      {/* Se o combate não finalizou, mostra controles */}
      {!combateFinalizado && (
        <>
          <CombatPotions />

          <h2>Ataques</h2>
          <p>
            Modificador de ataque: +
            {Math.max(
              character.attributes.dex.mod,
              character.attributes.str.mod
            )}
            <br />
            Proficiência: +{character.proficienciesBonus}
          </p>

          <button onClick={recarregarArma} disabled={precisaRecarregar}>
            Recarregar
          </button>
          <button
            onClick={() => ataquePorBotao("leve")}
            disabled={!precisaRecarregar}
          >
            Ataque Principal (
            {equipment.weapon
              ? `${equipment.weapon.status} ${equipment.weapon.name}`
              : equipment["two-handed"].twoHandedDamage
              ? `${equipment["two-handed"].twoHandedDamage?.damage_dice} ${equipment["two-handed"].name}`
              : equipment["two-handed"]
              ? `${equipment["two-handed"].status} ${equipment["two-handed"].name}`
              : "1D4"}
            )
            {equipment.offHand &&
              ` e secundaria + ${equipment.offHand.status} ${equipment.offHand.name}`}
          </button>
          <button onClick={() => ataquePorBotao("pesado")}>
            Ataque Pesado
          </button>
        </>
      )}

      {/* Mensagens de combate */}
      <div style={{ marginTop: 20 }}>
        <h2>Mensagens</h2>
        <ul>
          {mensagens
            .slice()
            .reverse()
            .map((m, i) => (
              <li key={i}>{m}</li>
            ))}
        </ul>
      </div>

      {/* Loot / drop aparece sempre que o combate acabar */}
      {derrota && <DropComponent CR={"derrota"} />}
      {dropReady && <DropComponent CR={enemy.challenge_rating} />}
    </div>
  );
}

export default CombatePage;
