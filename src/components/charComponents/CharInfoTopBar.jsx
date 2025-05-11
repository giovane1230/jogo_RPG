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
  const strMod = character ? character.attributes.str.mod : 0;
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

  return (
    <>
      {character && (
        <>
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
            {equipment["two-handed"]?.twoHandedDamage && "2H - "}
            {equipment.weapon?.name || equipment["two-handed"]?.name || "Sem arma equipada" }{" - "}
            {equipment.weapon?.status || equipment["two-handed"]?.twoHandedDamage?.damage_dice || equipment["two-handed"]?.status || ""}
            <br />
            {equipment.offHand?.status && `Secundaria - ${equipment.offHand.name} - ${equipment.offHand?.status}` }
          </span>
          <p>Bonus para acertar e dano:</p>
          <span>Mod. de {dexMod > strMod ? `Dextreza ${dexMod}` : `Força ${strMod}`}</span>
          <span>Proficiência: {character.proficienciesBonus && character.proficienciesBonus}</span>
        </>
      )}
    </>
  );
}

export default CharInfoTopBar;
