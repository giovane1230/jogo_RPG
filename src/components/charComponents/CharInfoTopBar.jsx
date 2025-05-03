import React, { useState } from "react";
import { useCharEquip } from "../../context/charEquipContext";
import "../../../styles/charCss/CharStatus.css";

function CharInfoTopBar() {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem("charData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const { equipment } = useCharEquip();

  const testConsole = () => {
    console.log("Equipamento atual:", equipment);
  };

  return (
    <>
      {character && (
        <>
          <button onClick={testConsole}>TESTE</button>
          <span>Nome</span>
          <span>{character?.name}</span>
          <br />
          <span>Vida</span>
          <p>DEPOIS MUDAR PARA VIDA ATUAL E MÁXIMA</p>
          <span>VIDA: {character?.vidaInicial}</span>
          <p>
            CA: {character?.cArmor} MOD: {character.attributes.dex.mod}
          </p>
          <span>
            CA TOTAL: {character?.cArmor + character.attributes.dex.mod}
          </span>
          <br />
          <span>
            {character?.class?.name} - {character?.race?.name} -{" "}
            {character?.nivel}
          </span>
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
          <span>Proeficiências:</span>
          <ul>
            {character?.proficiencies.map((e) => (
              <li key={e.index}>{e.name}</li>
            ))}
          </ul>

          <h2>Equipamento</h2>
          <ul>
            {Object.entries(equipment).map(([slot, item]) => (
              <li key={slot}>
                <strong>{slot}:</strong>{" "}
                {Array.isArray(item)
                  ? item.map((r, i) => (
                      <span key={i}>{r?.name || "Nenhum"} </span>
                    ))
                  : item?.name || "Nenhum"}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default CharInfoTopBar;
