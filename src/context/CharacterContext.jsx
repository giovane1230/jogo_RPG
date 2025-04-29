import React, { createContext, useContext, useState, useEffect } from "react";

const CharacterContext = createContext();

export const useCharacter = () => {
  return useContext(CharacterContext);
};

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState(() => {
    // Tenta carregar o personagem salvo no localStorage ao iniciar
    const savedCharacter = localStorage.getItem("charData");
    return savedCharacter
      ? JSON.parse(savedCharacter)
      : {
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
          selectedEquipments: [],
          equipments: [],
          background: "",
          alignment: "",
          gold: 5,
          exp: 0,
          nivel: 1,
        };
  });

  // Sempre que o personagem mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem("charData", JSON.stringify(character));
  }, [character]);

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
