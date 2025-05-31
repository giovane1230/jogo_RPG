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
          ? [...prev.equipment[slot], equip] // ex.: para "ring"
          : equip, // para slots simples: "armor", "mainHand" etc.
      },
    }));
  };

  // outros métodos...

  return (
    <CharacterContext.Provider
      value={{ character, updateCharacter, addEquipment }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
