import React, { useState, useEffect } from "react";
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

  const dexMod = character ? character.attributes.dex.mod : 0;
  // const strMod = character ? character.attributes.str.mod : 0; depois fazer a verificação de qual é maior 
  const caFinal = calcularCA(equipment, dexMod);

  // Função para atualizar o cArmor no localStorage
  const atualizarCArmorNoLocalStorage = (newCharacter) => {
    newCharacter.cArmor = caFinal; // Atualiza o cArmor diretamente
    localStorage.setItem("charData", JSON.stringify(newCharacter)); // Atualiza o localStorage com o novo cArmor
  };

  // Efeito para atualizar o localStorage sempre que o equipamento mudar
  useEffect(() => {
    if (character) {
      atualizarCArmorNoLocalStorage(character); // Atualiza o cArmor no localStorage
    }
  }, [equipment]); // Atualiza apenas quando o equipamento mudar

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
          <span>
            VIDA: {character?.vidaAtual} / {character?.vidaInicial}
          </span>
          <br />
          <span>CA: {caFinal}</span>
          <span>
            {equipment.armor?.name || ""}
            {equipment.shield ? ` + ${equipment.shield.name}` : ""}
            {equipment.armor?.bonusDex ? ` + Mod dex(${dexMod})` : ""}
          </span>
          <br />
          <br />
          <p>Arma Equipada</p>
          <span>
            {equipment.weapon?.name || "Sem arma equipada"}{" "}
            {equipment.weapon?.status || ""}
          </span>
          <p>Bonus para acertar: {dexMod}</p> 
          <br />
          <br />
          <span>
            {character?.class?.name} - {character?.race?.name} -{" "}
            {character?.nivel}
            <br />
            <span>Bonus Proeficiencia: (+{character?.proficienciesBonus})</span>
          </span>
          <br />
          <ul>
            {Object.entries(character.attributes).map(([key, val]) => (
              <p key={key}>
                <strong>{key.toUpperCase()}:</strong> {val.value} ({val.mod})
              </p>
            ))}
          </ul>
          <br />
          <ul>
            {character?.proficiencies.map((e) => (
              <li key={e.index}>{e.name}</li>
            ))}
          </ul>

          <h2>Equipados</h2>
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
