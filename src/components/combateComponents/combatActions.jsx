import React from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useCharEquip } from "../../context/charEquipContext";
import { useCombat } from "../../context/CombateContext";
import BuffUtils from "./BuffUtils";

const CombatActions = ({
  onEscapeAttempt,
  iniciaTurnoInimigo,
}) => {
  const { character } = useCharacter();
  const { equipment } = useCharEquip();
  const { setBuff, player, setPlayer } = useCombat();

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  const fugirBtn = () => {
    const result = rolarDado(20) + character.attributes.dex.mod;

    const sucesso = result >= 10;

    if (onEscapeAttempt) {
      onEscapeAttempt(sucesso); // envia true ou false para o pai
    }

    if (sucesso) {
      console.log("fugiu???????????", result);
    } else {
      console.log("você sofreu ataque de oportunidade");
    }
  };

  const defenderComEscudo = () => {
    if (!equipment.shield) {
      console.log("Escudo não está equipado");
      return;
    }

    if (!BuffUtils.podeUsarBuff(player, "defender")) {
      console.log("Defender em recarga");
      return;
    }

    const tentaDefender = rolarDado(2);
    const buffDefensivo = tentaDefender === 1;

    if (buffDefensivo) {
      const novoBuff = {
        ...player.buff,
        defender: {
          CD: 5,
          timeEffect: 3, // ou 0 se quiser efeito apenas imediato
        },
      };

      setPlayer((prev) => ({
        ...prev,
        buff: novoBuff,
      }));

      setBuff(true);
      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!buffDefensivo);
    }
  };

  const distancia = () => {
    console.log("player", player.buff);
    console.log("character", character.buff);
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <button onClick={fugirBtn}>Fugir</button>
      <button onClick={distancia}>Criar distancia</button>
      <button>Esconder-se</button>
      <button>Esquivar-se</button>
      <button>Pesquisa</button>
      <button>Empurrão</button>
      <button
        onClick={defenderComEscudo}
        disabled={!BuffUtils.podeUsarBuff(player, "defender")}
      >
        {!BuffUtils.podeUsarBuff(player, "defender")
          ? "Defendendo o proximo ataque"
          : "Defender (requer escudo)"}
      </button>
    </div>
  );
};

export default CombatActions;
