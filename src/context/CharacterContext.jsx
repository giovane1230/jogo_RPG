import React, { createContext, useContext, useState, useEffect } from "react";

export const CharacterContext = createContext();

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
            str: { mod: -1, value: 8 },
            dex: { mod: -1, value: 8 },
            con: { mod: -1, value: 8 },
            int: { mod: -1, value: 8 },
            wis: { mod: -1, value: 8 },
            cha: { mod: -1, value: 8 },
          },
          proficiencies: [],
          selectedProficiencies: {},
          selectedEquipments: [],
          background: "",
          alignment: "",
          gold: 1000,
          exp: 0,
          nivel: 1,
          cArmor: 10,
          initialSlots: {
            armor: null,
            weapon: null,
            shield: null,
            focus: null,
            ring: [],
            wondrousItem: null,
          },
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
