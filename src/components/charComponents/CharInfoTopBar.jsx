import React, { useState } from "react";
import { useCharEquip } from "../../context/charEquipContext";
import "../../../styles/charCss/CharStatus.css";

function CharInfoTopBar() {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem("charData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const { equipment } = useCharEquip();

  const calcularCA = (equipamentos, dexMod) => {
    let caBase = 10 + dexMod;

    const { armor, shield } = equipamentos;

    if (armor) {
      caBase = armor.status;

      if (armor.bonusDex) {
        caBase += dexMod;
      }
    }

    if (shield) {
      caBase += shield.status;
    }

    return caBase;
  };

  const dexMod = character.attributes.dex.mod;
  const caFinal = calcularCA(equipment, dexMod);

  const testConsole = () => {
    console.log(dexMod);
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
          <span>VIDA: {character?.vidaInicial} / {character?.vidaInicial}</span>
          <br />
          <span>
            CA: {caFinal}
          </span>
          <span>
            {equipment.armor?.name || ""}
            {equipment.shield ? ` + ${equipment.shield.name}` : ""}
            {equipment.armor?.bonusDex ? ` + Mod dex(${dexMod})` : ""}
          </span>
          <br />
          <br />
          <p>Arma Equipada</p>
          <span>{equipment.weapon?.name || "Sem arma equipada"} {equipment.weapon?.status || ""}</span>
          <p>Bonus para acertar: {dexMod}</p>
          <p>DEPOIS BUSCAR ESSA REGRA DE MOD PARA ACERTAR ESUQUECI</p>
          <br />
          <br />
          <span>
            {character?.class?.name} - {character?.race?.name} -{" "}
            {character?.nivel}
          </span>
          <br />
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
