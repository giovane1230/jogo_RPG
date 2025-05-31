
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
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const addEquipment = (equip) => {
    setCharacter(prev => ({
      ...prev,
      equipment: [...prev.equipment, equip]
    }));
  };

  // outros métodos...

  return (
    <CharacterContext.Provider value={{ character, updateCharacter, addEquipment }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
