import React, { createContext, useContext, useState } from "react";

const CharacterContext = createContext();

export const useCharacter = () => {
  return useContext(CharacterContext);
};

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    name: "",
    race: {},
    class: null,
    attributes: {
      str: 8,
      dex: 8,
      con: 8,
      int: 8,
      wis: 8,
      cha: 8,
    },
    proficiencies: [],
    selectedProficiencies: {},
    selectedEquipments: {},
    background: "",
    alignment: "",
  });

  // Função para atualizar o personagem
  const updateCharacter = (updates) => {
    setCharacter((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <CharacterContext.Provider value={{ character, setCharacter, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
