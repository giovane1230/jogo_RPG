import React, { useState } from "react";
import "../../../styles/charCss/CharStatus.css";

function CharInfoTopBar() {
  const [character, setCharacter] = useState(() => {
    // Carrega os dados do localStorage na inicialização
    const savedData = localStorage.getItem('charData');
    return savedData ? JSON.parse(savedData) : null;
  });


  return (
    <>
      {character && (
        <>
          <span>Nome</span>
          <span>{character?.name}</span>
          <br />
          <span>Vida</span>
          <p>DEPOIS MUDAR PARA VIDA ATUAL E MAXIMA</p>
          <span>VIDA: {character?.vidaInicial} </span>
          <p>CA: {character?.cArmor} MOD: {character.attributes.dex.mod}</p>
          <span>CA TOTAL: {character?.cArmor + character.attributes.dex.mod}</span>
          <br />
          <span>{character?.class?.name} - {character?.race?.name} - {character?.nivel} </span>
          <br />
          <h2>Atributos</h2>
      <ul>
      {Object.entries(character.attributes).map(([key, val]) => (
  <p key={key}>
    <strong>{key.toUpperCase()}:</strong> {val.total} ({val.mod})
  </p>
))}

      </ul>
          <br />
          <span>Proeficiencias:</span>
          <ul>
            {character?.proficiencies.map((e) => (
              <li key={e.index}>{e.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default CharInfoTopBar;
