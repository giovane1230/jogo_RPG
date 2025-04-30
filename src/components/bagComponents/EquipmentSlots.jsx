// src/components/EquipmentSlots.jsx
import React, { useContext, useState } from 'react';
import { CharacterContext } from '../../context/CharacterContext';

const initialSlots = {
  armor: null,
  weapon: null,
  shield: null,
  focus: null,
  ring: [],
  wondrousItem: null,
};

const EquipmentSlots = () => {
  const { character } = useContext(CharacterContext);
  const [equipment, setEquipment] = useState(initialSlots);

  const getItemSlot = (item) => {
    const category = item.equipment_category?.index;

    if (["light-armor", "medium-armor", "heavy-armor"].includes(category)) return "armor";
    if (category === "shields") return "shield";
    if (category.includes("weapon")) return "weapon";
    if (["arcane-foci", "druidic-foci", "holy-symbols", "staff", "wand", "rod"].includes(category)) return "focus";
    if (category === "ring") return "ring";
    if (category === "wondrous-items") return "wondrousItem";

    return null;
  };

  const isProficient = (item) => {
    const profs = character.proficiencies.map(p => p.name.toLowerCase());
    const itemType = item.equipment_category?.name?.toLowerCase();
    const itemName = item.name?.toLowerCase();
    return profs.includes(itemType) || profs.includes(itemName);
  };

  const equipItem = (item) => {
    if (!isProficient(item)) {
      alert(`Você não é proficiente com ${item.name} - (${item.equipment_category.name})`);
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

  // Exemplo de item para teste
  const testItem = {
    name: " Hide Armor",
    equipment_category: { name: "Medium Armor", index: "heavy-armor" },
  };

  return (
    <div>
      <h2>Equipamentos</h2>

      <div>
        <h3>Armadura</h3>
        {equipment.armor ? (
          <div>
            {equipment.armor.name}
            <button onClick={() => unequipItem("armor")}>Remover</button>
          </div>
        ) : (
          <button onClick={() => equipItem(testItem)}>Equipar Exemplo</button>
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
