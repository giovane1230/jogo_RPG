import React from "react";
import { useCharacter } from "../../context/CharacterContext";

const CombatActions = ({ onEscapeAttempt }) => {
  const { character } = useCharacter();

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

  return (
    <div style={{ marginBottom: "8px" }}>
      <button onClick={fugirBtn}>Fugir</button>
      <button>Criar distancia</button>
      <button>Esconder-se</button>
      <button>Esquivar-se</button>
      <button>Pesquisa</button>
      <button>Empurrão</button>
      <button>Usar Escudo</button>
    </div>
  );
};

export default CombatActions;