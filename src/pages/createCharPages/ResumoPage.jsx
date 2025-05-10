import React from "react";
import { useCharacter } from "../../context/CharacterContext";

const ResumoPage = () => {
  const { character } = useCharacter();

  return (
    <div style={{ padding: 20 }}>
      <h1>Personagem Criado</h1>

      <p>
        <strong>Nome:</strong> {character.name}
      </p>
      <p>
        <strong>Classe:</strong>{" "}
        {character.class?.name || "Nenhuma classe selecionada"}
      </p>
      <p>
        <strong>Alinhamento:</strong> {character.alignment}
      </p>
      <p>
        <strong>Background:</strong> {character.background}
      </p>

      <h2>Atributos</h2>
      <ul>
        {Object.entries(character.attributes).map(([key, val]) => (
          <p key={key}>
            <strong>{key.toUpperCase()}:</strong> Total: {val.value} ({val.mod})
          </p>
        ))}
      </ul>

      <h2>Equipamentos Iniciais</h2>
      <ul>
        {character.bag.map((item) => (
          <li key={item.index}>{item.name}</li>
        ))}
      </ul>

      <h2>Proficiências da Classe e Raça</h2>
      <ul>
        {character.proficiencies?.map((prof, index) => (
          <li key={`class-${index}`}>{prof.name}</li>
        ))}
        {character.race?.starting_proficiencies?.map((prof, index) => (
          <li key={`race-${index}`}>{prof.name}</li>
        ))}
      </ul>

      <h2>Proficiências Escolhidas</h2>
      <ul>
        {Object.values(character.selectedProficiencies || {})
          .flat()
          .map((prof, index) => (
            <li key={index}>{prof}</li>
          ))}
      </ul>

      {character.spells.length === 0 ? (
        <>
          <h2>Magias Selecionadas</h2>
          <ul>
            {character.spells?.map((spell, index) => (
              <li key={index}>
                <strong>{spell.name}</strong>: {spell.desc[0]}
              </li>
            ))}
          </ul>
        </>
      ) : "Sem Magias" }
    </div>
  );
};

export default ResumoPage;
