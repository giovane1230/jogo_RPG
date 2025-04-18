import React, { createContext, useContext, useEffect, useState } from 'react';

// Criação do contexto
const CharacterContext = createContext();

// Hook para acessar o contexto de qualquer componente
export const useCharacter = () => useContext(CharacterContext);

// Provider que envolve a aplicação
export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState(() => {
    // Inicializa com dados do localStorage (se existirem)
    const saved = localStorage.getItem('charData');
    return saved ? JSON.parse(saved) : {
      name: '',
      race: null,
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
      background: '',
      alignment: '',
    };
  });

  // Sempre que o personagem mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('charData', JSON.stringify(character));
  }, [character]);

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
