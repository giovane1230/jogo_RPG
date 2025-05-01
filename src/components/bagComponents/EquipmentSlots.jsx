// src/components/EquipmentSlots.jsx
import React, { useEffect, useState } from "react";

const initialSlots = {
  armor: null,
  weapon: null,
  shield: null,
  focus: null,
  ring: [],
  wondrousItem: null,
};

const EquipmentSlots = () => {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem("charData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [equipment, setEquipment] = useState(() => {
    const savedEquip = localStorage.getItem("charEquip");
    return savedEquip ? JSON.parse(savedEquip) : initialSlots;
  });

  if (!character || !character.selectedEquipments) {
    return <p>Carregando personagem e itens...</p>;
  }

  useEffect(() => {
    localStorage.setItem("charEquip", JSON.stringify(equipment));
  }, [equipment]);

  const getItemSlot = (item) => {
    const category = (
      item.type ||
      item.equipment_category?.name ||
      ""
    ).toLowerCase();

    if (
      ["light-armor", "medium-armor", "heavy-armor", "armor"].includes(category)
    )
      return "armor";
    if (category === "shields" || category === "shield") return "shield";
    if (category === "weapon") return "weapon";
    if (
      [
        "arcane-foci",
        "druidic-foci",
        "holy-symbols",
        "staff",
        "wand",
        "rod",
        "focus",
      ].includes(category)
    )
      return "focus";
    if (category === "ring") return "ring";
    if (category === "wondrous-items") return "wondrousItem";

    return null;
  };

  const isProficient = (item) => {
    const profs = character.proficiencies.map((p) => p.name.toLowerCase());
    const itemCategoryRaw = item.category?.toLowerCase();
    const itemType = item.type?.toLowerCase(); // "armor", "weapon" etc.
    const itemName = item.name?.toLowerCase();
  
    // Normaliza categorias de armadura e armas
    let itemCategory = itemCategoryRaw;
  
    if (itemType === "armor") {
      if (["light", "medium", "heavy"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} armor`; // ex: "heavy armor"
      }
    } else if (itemType === "weapon") {
      if (["simple", "martial"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} weapons`; // ex: "simple weapons"
      }
    }
  
    // Verifica se há correspondência com proficiências
    const isProf =
      profs.includes(itemCategory) ||
      profs.includes("all armor") && itemType === "armor" ||
      profs.includes("all weapons") && itemType === "weapon" ||
      profs.includes(itemName);
  
    console.log("Is proficient:", isProf);
    console.log("Proficiencies:", profs);
    console.log("Item category:", itemCategory);
    console.log("Item name:", itemName);
  
    return isProf;
  };
  
  
  

  const equipItem = (item) => {
    console.log(item);
    const available = character.selectedEquipments?.find(
      (i) => i.name === item.name
    );
    if (!available) {
      alert("Você não possui esse item!");
      return;
    }

    if (!isProficient(item)) {
      alert(
        `Você não é proficiente com ${item.name} - (${
          item.category || "Categoria desconhecida"
        })`
      );
      return;
    }

    const slot = getItemSlot(item);
    if (!slot) {
      alert("Tipo de item desconhecido.");
      return;
    }

    if (slot === "ring") {
      if (equipment.ring.length >= 2) {
        alert("Você só pode usar até 2 anéis.");
        return;
      }
      setEquipment((prev) => ({
        ...prev,
        ring: [...prev.ring, item],
      }));
    } else {
      setEquipment((prev) => ({
        ...prev,
        [slot]: item,
      }));
    }
  };

  const unequipItem = (slot, index = null) => {
    if (slot === "ring" && index !== null) {
      const newRings = [...equipment.ring];
      newRings.splice(index, 1);
      setEquipment((prev) => ({
        ...prev,
        ring: newRings,
      }));
    } else {
      setEquipment((prev) => ({
        ...prev,
        [slot]: null,
      }));
    }
  };

  const renderAvailableItems = (slotType) => {
    if (!character?.selectedEquipments) {
      console.log("Nenhum personagem ou itens encontrados");
      return null;
    }

    console.log(
      `Itens filtrados para ${slotType}`,
      character.selectedEquipments.filter(
        (item) => getItemSlot(item) === slotType
      )
    );

    const filtered = character.selectedEquipments.filter(
      (item) => getItemSlot(item) === slotType
    );

    if (filtered.length === 0)
      return <p>Nenhum item disponível para {slotType}</p>;

    return filtered.map((item, i) => (
      <div key={i}>
        {item.name}
        <button onClick={() => equipItem(item)}>Equipar</button>
      </div>
    ));
  };

  const testConsole = () => {
    console.log("character", character);
  };

  return (
    <div>
      <button onClick={testConsole}>CONSOLE</button>
      <h2>Equipamentos</h2>

      <div>
        <h3>Armadura</h3>
        {equipment.armor ? (
          <div>
            {equipment.armor.name}
            <button onClick={() => unequipItem("armor")}>Remover</button>
          </div>
        ) : (
          <>
            <h4>Armaduras disponíveis:</h4>
            {renderAvailableItems("armor")}
          </>
        )}
      </div>
      <div>
        <h3>weapon</h3>
        {equipment.weapon ? (
          <div>
            {equipment.weapon.name}
            <button onClick={() => unequipItem("weapon")}>Remover</button>
          </div>
        ) : (
          <>
            <h4>weapon disponíveis:</h4>
            {renderAvailableItems("weapon")}
          </>
        )}
      </div>

      {/* Repita esse bloco para outras categorias */}
      <div>
        <h3>Anéis</h3>
        {equipment.ring.map((ring, i) => (
          <div key={i}>
            {ring.name}
            <button onClick={() => unequipItem("ring", i)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSlots;
