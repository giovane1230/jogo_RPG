import React, { createContext, useContext, useState } from "react";

const initialEquip = {
  armor: null,
  mainHand: null,
  offHand: null,
  focus: null,
  ring: [],
  wondrousItem: null,
};

const CharEquipContext = createContext();

export const CharEquipProvider = ({ children }) => {
  const [equipment, setEquipment] = useState(() => {
    const stored = localStorage.getItem("charEquip");
    return stored ? JSON.parse(stored) : initialEquip;
  });

  const updateEquipment = (newEquip) => {
    localStorage.setItem("charEquip", JSON.stringify(newEquip));
    setEquipment(newEquip);
  };

  const equipItem = (slot, item) => {
    if (slot === "ring") {
      const updated = { ...equipment, ring: [...equipment.ring, item] };
      updateEquipment(updated);
    } else {
      updateEquipment({ ...equipment, [slot]: item });
    }
  };

  const unequipItem = (slot, index = null) => {
    if (slot === "ring" && index !== null) {
      const newRings = [...equipment.ring];
      newRings.splice(index, 1);
      updateEquipment({ ...equipment, ring: newRings });
    } else {
      updateEquipment({ ...equipment, [slot]: null });
    }
  };

  return (
    <CharEquipContext.Provider
      value={{ equipment, updateEquipment, equipItem, unequipItem }}
    >
      {children}
    </CharEquipContext.Provider>
  );
};

export const useCharEquip = () => useContext(CharEquipContext);
