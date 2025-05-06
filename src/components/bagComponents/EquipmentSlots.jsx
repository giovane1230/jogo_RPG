import React, { useEffect, useState } from "react";
import { useCharEquip } from "../../context/charEquipContext";

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

  const { equipment, updateEquipment } = useCharEquip();

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
  
    const itemIndex = item.index?.toLowerCase() || "";
    const itemName = item.name?.toLowerCase() || "";
    const itemCategory = item.category?.toLowerCase() || "";
  
    // ✅ Detecta escudo corretamente
    if (itemCategory === "shield" || itemIndex.includes("shield") || itemName.includes("shield")) {
      return "shield";
    }
  
    if (
      ["light-armor", "medium-armor", "heavy-armor", "armor"].includes(category)
    )
      return "armor";
  
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
    const itemName = item.name?.toLowerCase();
    const itemType = item.type?.toLowerCase(); // "armor", "weapon"
    let itemCategoryRaw = item.category?.toLowerCase() || "";
    let itemCategory = itemCategoryRaw;
  
    // 🎯 Escudo é um caso à parte
    const isShield = item.index?.toLowerCase().includes("shield") || itemCategoryRaw === "shield";
  
    if (isShield) {
      itemCategory = "shields"; // precisa estar escrito exatamente assim
    } else if (itemType === "armor") {
      if (["light", "medium", "heavy"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} armor`; // Ex: "heavy armor"
      }
    } else if (itemType === "weapon") {
      if (["simple", "martial"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} weapons`; // Ex: "simple weapons"
      }
    }
  
    const isProf =
      profs.includes(itemCategory) ||
      (profs.includes("all armor") && itemType === "armor" && !isShield) ||
      (profs.includes("all weapons") && itemType === "weapon") ||
      profs.includes(itemName);
  
    return isProf;
  };

  const updateEquipStorage = (newEquipment) => {
    updateEquipment(newEquipment); // atualiza para renderizar
    localStorage.setItem("charEquip", JSON.stringify(newEquipment)); // persiste
  };  

  const equipItem = (item) => {
    const available = character.selectedEquipments?.find(
      (i) => i.name === item.name
    );
    if (!available) {
      alert("Você não possui esse item!");
      return;
    }
  
    if (!isProficient(item)) {
      alert(
        `Você não é proficiente com ${item.name} - (${item.category || "Categoria desconhecida"})`
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
      updateEquipStorage({
        ...equipment,
        ring: [...equipment.ring, item],
      });
    } else {
      updateEquipStorage({
        ...equipment,
        [slot]: item,
      });
    }
  };
  

  const unequipItem = (slot, index = null) => {
    if (slot === "ring" && index !== null) {
      const newRings = [...equipment.ring];
      newRings.splice(index, 1);
      updateEquipStorage({
        ...equipment,
        ring: newRings,
      });
    } else {
      updateEquipStorage({
        ...equipment,
        [slot]: null,
      });
    }
  };
  

  const renderAvailableItems = (slotType) => {
    if (!character?.selectedEquipments) {
      return null;
    }

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

  const contextConsole = () => {
    console.log(equipment)
  }

  return (
    <div>
      <h2>Equipamentos</h2>
      <button onClick={contextConsole}>
        xxxxxxxx
      </button>

      <div>
        <h3>Armadura</h3>
        {equipment.armor ? (
          <div>
            {equipment.armor.name}
            <button onClick={() => unequipItem("armor")}>Remover</button>
          </div>
        ) : (
          <>
            {renderAvailableItems("armor")}
          </>
        )}
      </div>
      <div>
        <h3>Mão esquerda</h3>
        {equipment.shield ? (
          <div>
            {equipment.shield.name}
            
            <button onClick={() => unequipItem("shield")}>Remover</button>
          </div>
        ) : (
          <>
            {renderAvailableItems("shield")}
          </>
        )}
      </div>
      <div>
        <h3>Mão direita</h3>
        {equipment.weapon ? (
          <div>
            {equipment.weapon.name}
            <button onClick={() => unequipItem("weapon")}>Remover</button>
          </div>
        ) : (
          <>
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
