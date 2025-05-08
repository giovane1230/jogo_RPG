import React from "react";
import { useCharacter } from "../../context/CharacterContext"

const CombatActions = () => {
    const { character } = useCharacter();
  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  const fugirBtn = () => {
    const result = rolarDado(20)+character.attributes.dex.mod;

    if (result >= 10) {
        console.log('fugiu');
        return
    }

    console.log('você sofreu ataque de oportunidade dano dobrado');
    return
  }

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
