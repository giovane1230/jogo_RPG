import React, { createContext, useContext, useEffect, useState } from "react";

const CombatContext = createContext();

export function CombatProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);

  // Atualiza o localStorage sempre que o player muda
  useEffect(() => {
    localStorage.setItem("charData", JSON.stringify(player));
  }, [player]);

  // Função para ganhar XP
  const ganharExperiencia = (xpGanho) => {
    setPlayer((prev) => ({
      ...prev,
      experiencia: prev.experiencia + xpGanho,
    }));
  };

  // Outras funções podem ser adicionadas aqui (ex: perder vida, etc)

  return (
    <CombatContext.Provider value={{ player, setPlayer, enemy, setEnemy, ganharExperiencia }}>
      {children}
    </CombatContext.Provider>
  );
}

export function useCombat() {
  return useContext(CombatContext);
}
