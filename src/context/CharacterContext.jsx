import React, { createContext, useContext, useEffect, useState } from "react";
import personagemPronto from "../api/injetarChar";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState(() => {
    const local = localStorage.getItem("characterData");
    return local ? JSON.parse(local) : personagemPronto;
  });

  useEffect(() => {
    localStorage.setItem("characterData", JSON.stringify(character));
  }, [character]);

  const updateCharacter = (updates) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };

  const addEquipment = (equip, slot) => {
    setCharacter((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [slot]: Array.isArray(prev.equipment[slot])
          ? [...prev.equipment[slot], equip]
          : equip,
      },
    }));
  };

  const removeEquipment = (slot, equip) => {
    setCharacter((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [slot]: Array.isArray(prev.equipment[slot])
          ? prev.equipment[slot].filter((e) => e !== equip)
          : null,
      },
    }));
  };

  // outros métodos...

  return (
    <CharacterContext.Provider
      value={{ character, updateCharacter, addEquipment, removeEquipment, setCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
