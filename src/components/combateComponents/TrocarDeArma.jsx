import React, { useEffect } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { getItemSlot, isProficient } from "../bagComponents/equipmentUtils";

const TrocarDeArma = () => {
  const { character, setCharacter } = useCharacter();

  if (!character || !character.bag) {
    return <p>Carregando personagem e itens...</p>;
  }

  useEffect(() => {
    localStorage.setItem("charEquip", JSON.stringify(character.equipment));
  }, [character]);

  const updateEquipStorage = (slot, item) => {
    setCharacter((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [slot]: item,
      },
    }));
  };

  // Função para atualizar vários slots de uma vez
  const setMultipleEquipment = (newEquipmentFields) => {
    setCharacter((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        ...newEquipmentFields,
      },
    }));
  };

  const equipItem = (item) => {
    const available = character.bag?.find((i) => i.name === item.name);
    if (!available) {
      alert("Você não possui esse item!");
      return;
    }

    if (!isProficient(character, item)) {
      alert(`Você não é proficiente com ${item.name}`);
      return;
    }

    const isTwoHanded = item.properties?.some((p) => p.index === "two-handed");
    const isAmmunition = item.properties?.some((p) => p.index === "ammunition");
    const isVersatile = item.properties?.some((p) => p.index === "versatile");
    const slot = getItemSlot(item);

    const currentWeapon = character.equipment.weapon;
    const isShield = character.equipment.shield;
    const offHand = character.equipment.offHand;
    const twoHandedInUse = character.equipment["two-handed"];

    // Impede equipar mesma arma duas vezes
    const isSameWeaponEquipped = [
      currentWeapon,
      isShield,
      offHand,
      twoHandedInUse,
    ].some((eq) => eq?.name === item.name);
    if (isSameWeaponEquipped) {
      alert("Você não pode equipar a mesma arma duas vezes.");
      return;
    }

    // Munição ou arma de duas mãos
    if (isAmmunition || isTwoHanded) {
      setMultipleEquipment({
        "two-handed": item,
        weapon: null,
        offHand: null,
        shield: null,
      });
      return;
    }

    // Versátil: pergunta se quer equipar duas mãos ou não
    if (isVersatile) {
      const usarDuasMaos = window.confirm(
        `${item.name} é versátil. Deseja equipar com DUAS mãos?`
      );
      if (usarDuasMaos) {
        setMultipleEquipment({
          "two-handed": item,
          weapon: null,
          offHand: null,
          shield: null,
        });
        return;
      } else {
        // Usar em uma mão:
        if (!currentWeapon) {
          updateEquipStorage("weapon", item);
        } else if (!isShield && !twoHandedInUse) {
          updateEquipStorage("offHand", item);
        } else {
          alert("Não é possível equipar esta arma agora.");
        }
        return;
      }
    }

    // Arma de uma mão normal
    if (slot === "weapon") {
      if (twoHandedInUse) {
        alert("Você está usando uma arma de duas mãos. Remova-a primeiro.");
        return;
      }
      if (!currentWeapon) {
        updateEquipStorage("weapon", item);
      } else if (!isShield) {
        updateEquipStorage("offHand", item);
      } else {
        alert("Ambas as mãos estão ocupadas.");
      }
      return;
    }

    // Escudo
    if (slot === "shield") {
      if (twoHandedInUse) {
        alert("Você não pode usar um escudo com uma arma de duas mãos.");
        return;
      }
      if (offHand) {
        alert("Você não pode usar um escudo com duas armas.");
        return;
      }
      updateEquipStorage("shield", item);
      return;
    }

    // Anéis (slot “ring” armazena um array)
    if (slot === "ring") {
      if (character.equipment.ring.length >= 2) {
        alert("Você só pode usar até 2 anéis.");
        return;
      }
      updateEquipStorage("ring", [...character.equipment.ring, item]);
      return;
    }

    // Outros slots (ex.: armor, wondrousItem, focos, etc.)
    updateEquipStorage(slot, item);
  };

  const unequipItem = (slot) => {
    if (!character.equipment[slot]) {
      alert("Nenhum item equipado nesse slot.");
      return;
    }
    // Para anéis, passa array vazio; para outros, passa null
    updateEquipStorage(slot, slot === "ring" ? [] : null);
  };

  const renderAvailableItems = (slotType) => {
    if (!character?.bag) {
      return null;
    }

    const filtered = character.bag.filter(
      (item) => getItemSlot(item) === slotType
    );

    if (filtered.length === 0)
      return <p>Nenhum item disponível para {slotType}</p>;

    return (
      <select
        onChange={(e) => {
          const selectedIndex = e.target.value;
          if (selectedIndex !== "") {
            equipItem(filtered[selectedIndex]);
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>
          {slotType}
        </option>
        {filtered.map((item, i) => (
          <option key={i} value={i}>
            {item.name}
          </option>
        ))}
      </select>
    );
  };

  // Lógica para slots de armas e escudo
  const hasTwoHanded = !!character.equipment["two-handed"];
  const hasMainWeapon = !!character.equipment.weapon;
  const hasOffHand = !!character.equipment.offHand;
  const hasShield = !!character.equipment.shield;

  return (
    <div>
      {/* Arma de duas mãos */}
      {!hasShield && !hasMainWeapon && (
        <div>
          <h3>Duas mãos</h3>
          {hasTwoHanded ? (
            <div>
              {character.equipment["two-handed"].name}
              <button onClick={() => unequipItem("two-handed")}>Remover</button>
            </div>
          ) : (
            renderAvailableItems("two-handed")
          )}
        </div>
      )}
      {/* Mão Direita (arma principal) */}
      {!hasTwoHanded && (
        <div>
          <h3>Mão Direita</h3>
          {hasMainWeapon ? (
            <div>
              {character.equipment.weapon.name}
              <button onClick={() => unequipItem("weapon")}>Remover</button>
            </div>
          ) : (
            renderAvailableItems("weapon")
          )}
        </div>
      )}

      {/* Mão Esquerda (arma secundária) */}
      {!hasShield && hasMainWeapon && !hasTwoHanded && (
        <div>
          <h3>Mão Esquerda</h3>
          {hasOffHand ? (
            <div>
              {character.equipment.offHand.name}
              <button onClick={() => unequipItem("offHand")}>Remover</button>
            </div>
          ) : (
            renderAvailableItems("weapon")
          )}
        </div>
      )}

      {/* Escudo */}
      {!hasTwoHanded && !hasOffHand && (
        <div>
          <h3>Escudo</h3>
          {hasShield ? (
            <div>
              {character.equipment.shield.name}
              <button onClick={() => unequipItem("shield")}>Remover</button>
            </div>
          ) : (
            renderAvailableItems("shield")
          )}
        </div>
      )}
    </div>
  );
};

export default TrocarDeArma;