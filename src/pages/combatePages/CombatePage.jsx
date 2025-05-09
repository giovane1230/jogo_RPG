import React, { useEffect, useState } from "react";
import { useCombat } from "../../context/CombateContext";
import { useCharacter } from "../../context/CharacterContext";
import BarraStatus from "../../components/barsComponents/BarraStatus";
import DropComponent from "../../components/monsterComponents/dropComponent";
import { useCharEquip } from "../../context/charEquipContext";
import DiceRollerMedium from "../../components/barsComponents/DiceRollerMedium";
import CombatPotions from "../../components/combateComponents/combatPotions";
import xpLevels from "../../api/regras";

function CombatePage() {
  const { player, enemy, playerHP, setPlayerHP } = useCombat();
  const { character, setCharacter } = useCharacter();
  const { equipment } = useCharEquip();
  const [ultimoResultado, setUltimoResultado] = useState("-");

  const [enemyHP, setEnemyHP] = useState(enemy?.hit_points || 50);
  const [mensagens, setMensagens] = useState([]);
  const [combateFinalizado, setCombateFinalizado] = useState(false);
  const [round, setRound] = useState(1);

  if (!enemy) {
    return <p>Combate Interrompido, por favor saida dessa pagina...</p>;
  }

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
      const xpGanho = (enemy.challenge_rating || 1) * 10;

      setMensagens((prev) => [
        ...prev,
        `Você derrotou ${enemy.name}! Ganhou ${xpGanho} XP.`,
      ]);
    } else {
      setMensagens((prev) => [...prev, "Você foi derrotado!"]);
    }
  }

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  function ataqueJogador(dano) {
    if (combateFinalizado) return;

    const acerto = 19; // MUDAR PARA rolarDado(20);
    const sucesso =
      acerto + character.attributes.dex.mod > enemy.armor_class?.[0]?.value;
    const critico = acerto === 20;
    const danoTotal = critico ? dano * 2 : dano;

    setRound(round + 1);
    setMensagens((prev) => [
      ...prev,
      ` ------------------------ ${round}° Rodada --------------------------`,
    ]);

    if (critico || sucesso) {
      setMensagens((prev) => [
        ...prev,
        `Você ${critico ? "acertou um CRÍTICO" : "acertou"} 🎲${acerto}+${
          character.attributes.dex.mod
        } = ${acerto + character.attributes.dex.mod} Causou ⚔️${danoTotal}!`,
      ]);
      setEnemyHP((hp) => Math.max(0, hp - danoTotal));
    } else {
      setMensagens((prev) => [
        ...prev,
        `Você errou 🎲${acerto}+${character.attributes.dex.mod} = ${
          acerto + character.attributes.dex.mod
        }.`,
      ]);
    }

    if (enemyHP - danoTotal > 0) {
      setTimeout(turnoInimigo, 1000);
    }
  }

  function ataquePorBotao(tipo) {
    const DanoEquipado = equipment.weapon?.status || "1d4";
    const lados = parseInt(DanoEquipado.split("d")[1]) || 6;
    const dado = tipo === "leve" ? lados : 999999;
    const dano = rolarDado(dado);
    ataqueJogador(dano);
  }

  function turnoInimigo() {
    if (!enemy.actions || enemy.actions.length === 0 || combateFinalizado)
      return;

    const ataque =
      enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
    const dadoStr = ataque.damage?.[0]?.damage_dice || "1d6";
    const lados = parseInt(dadoStr.split("d")[1]) || 6;
    const dano = rolarDado(lados);

    const acerto = rolarDado(20);
    const critico = acerto === 20;
    const sucesso = acerto + 5 > player.cArmor;
    const danoTotal = critico ? dano * 2 : dano;

    if (sucesso) {
      setMensagens((prev) => [
        ...prev,
        `${enemy.name} ${
          critico ? "acertou um CRÍTICO" : "acertou"
        } com 🎲${acerto}(+5)=${acerto + 5}! Causou ⚔️${danoTotal}!`,
      ]);
      setPlayerHP((hp) => Math.max(0, hp - danoTotal));
    } else {
      setMensagens((prev) => [
        ...prev,
        `${enemy.name} errou com um roll de 🎲${acerto}(+5)=${acerto + 5}.`,
      ]);
    }
  }

  const handleRoll = (resultado) => {
    console.log("Dado rolado:", resultado);
    setUltimoResultado(resultado);
  };

  return (
    <div>
      <h1>Combate</h1>
      {combateFinalizado && <DropComponent CR={enemy.challenge_rating} />}

      <div>
        <BarraStatus
          label={player.name}
          valorAtual={playerHP}
          valorMaximo={character.vidaInicial || 100}
          CA={`| CA: ${player.cArmor}`}
          cor="blue"
        />
        <p>
          <strong>CA:</strong> {player.cArmor}
        </p>
      </div>
      <BarraStatus
        label={enemy.name}
        valorAtual={enemyHP}
        valorMaximo={enemy.hit_points || 50}
        CA={`| CA: ${enemy.armor_class?.[0]?.value}`}
        CR={`| CA: ${enemy.challenge_rating}`}
        cor="red"
      />
      <BarraStatus
        label="Experiência"
        valorAtual={character.exp}
        valorMaximo={xpLevels[character.nivel + 1].xp}
        cor="yellow"
      />

      {!combateFinalizado && (
        <div>
          <CombatPotions />
          <h2>Ataques:</h2>
          <p>
            Modificador de acerto dex ou str:({character.attributes.dex.mod})
            Proeficiencia:({character.proficienciesBonus})
          </p>
          <p>
            Chance de acerto d20+(
            {character.attributes.dex.mod + character.proficienciesBonus})
          </p>
          <button onClick={() => ataquePorBotao("leve")}>
            Ataque Leve ({equipment.weapon?.status || "1d4"})
          </button>
          <button onClick={() => ataquePorBotao("pesado")}>
            Ataque Pesado (HITKILL)
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h2>Mensagens:</h2>
        <ul>
          {mensagens
            .slice()
            .reverse()
            .map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CombatePage;
