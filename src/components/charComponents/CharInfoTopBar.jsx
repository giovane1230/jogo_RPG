import React, { useState, useEffect } from "react";

import "../../../styles/charCss/CharStatus.css";
import { useCharacter } from "../../context/CharacterContext";

function CharInfoTopBar() {
const { character, updateCharacter } = useCharacter();

  const calcularCA = (equipment, dexMod) => {
    if (equipment.armor) {
      if (equipment.armor?.category === "Medium") {
        if (character.attributes.dex.mod > 2) dexMod = 2;
      }
    }

    let caBase = 10 + dexMod;

    const { armor, shield } = equipment;

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

  const dexMod = character?.attributes?.dex?.mod ?? 0;
  const maxDexMod =
    (character?.attributes?.dex?.mod ?? 0) > 2 ? 2 : (character?.attributes?.dex?.mod ?? 0);
  const strMod = character?.attributes?.str?.mod ?? 0;
  const caFinal = character?.equipment ? calcularCA(character.equipment, dexMod) : 0;

  // Função para atualizar o cArmor no localStorage
  // const atualizarCArmorNoLocalStorage = (newCharacter) => {
  //   newCharacter.cArmor = caFinal; // Atualiza o cArmor diretamente
  //   updateCharacter(newCharacter);
  // };

  // // Efeito para atualizar o localStorage sempre que o equipamento mudar
  // useEffect(() => {
  //   if (character) {
  //     atualizarCArmorNoLocalStorage(character); // Atualiza o cArmor no localStorage
  //   }
  // }, [character]); // Atualiza apenas quando o equipamento mudar

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
            {character.equipment.armor?.name || ""}
            {character.equipment.shield ? ` + ${character.equipment.shield.name}` : ""}
            {character.equipment.armor?.category === "Medium"
              ? ` + Mod LIMITADO dex(${maxDexMod})`
              : ` + Mod dex(${dexMod})`}
          </span>
          <br />
          <br />
          <p>Arma Equipada</p>
          <span>
            {character.equipment["two-handed"]?.twoHandedDamage && "2H - "}
            {character.equipment.weapon?.name ||
              character.equipment["two-handed"]?.name ||
              "Sem arma equipada"}
            {" - "}
            {character.equipment.weapon?.status?.damage_dice ||
              character.equipment["two-handed"]?.twoHandedDamage?.damage_dice ||
              character.equipment["two-handed"]?.status?.damage_dice ||
              ""}
            {character.equipment.weapon?.status?.damage_type?.name
              ? ` (${character.equipment.weapon.status.damage_type.name})`
              : character.equipment["two-handed"]?.twoHandedDamage?.damage_type?.name
              ? ` (${character.equipment["two-handed"].twoHandedDamage.damage_type.name})`
              : character.equipment["two-handed"]?.status?.damage_type?.name
              ? ` (${character.equipment["two-handed"].status.damage_type.name})`
              : ""}
            <br />
            {character.equipment.offHand?.status &&
              `Secundaria - ${character.equipment.offHand.name} - ${character.equipment.offHand.status.damage_dice || ""}${
                character.equipment.offHand.status.damage_type?.name
                  ? ` (${character.equipment.offHand.status.damage_type.name})`
                  : ""
              }`}
          </span>
          <p>Bonus para acertar e dano:</p>
          <span>
            Mod. de {dexMod > strMod ? `Dextreza ${dexMod}` : `Força ${strMod}`}
          </span>
          <span>
            Proficiência:{" "}
            {character.proficienciesBonus && character.proficienciesBonus}
          </span>
        </>
      )}
    </>
  );
}

export default CharInfoTopBar;
