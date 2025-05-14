import React, { useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useCharEquip } from "../../context/charEquipContext";

const CombatActions = ({ onEscapeAttempt, removeDefender }) => {
  const { character, setCharacter } = useCharacter();
  const { equipment } = useCharEquip();
  const [ defendendo, setDefendendo ] = useState(false);

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
    if (equipment.shield) {
      const tentaDefender = rolarDado(2);
      const buffDefensivo = tentaDefender === 1;
      // 50% de chance de defender o proximo ataque CD 5 turnos;

      if (buffDefensivo) {
        const BuffDefenderComEscudo = [...character.buff, "defender"];
        setCharacter((prev) => ({
          ...prev,
          buff: BuffDefenderComEscudo,
        }));
        setDefendendo(true);
        console.log("Sucesso");
        return;
      }
         console.log("Falhou");
      return;
    }
    console.log("Escudo não esta equipado");
    return;
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <button onClick={fugirBtn}>Fugir</button>
      <button>Criar distancia</button>
      <button>Esconder-se</button>
      <button>Esquivar-se</button>
      <button>Pesquisa</button>
      <button>Empurrão</button>
      <button onClick={defenderComEscudo} disabled={defendendo} setDefendendo(removeDefender)>
        {defendendo ? 'Defendendo o proximo ataque' : 'Defender (requer escudo)'}
      </button>
    </div>
  );
};

export default CombatActions;
