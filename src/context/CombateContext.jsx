import React, { createContext, useContext, useState } from "react";

const CombatContext = createContext();

export function CombatProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);

  return (
    <CombatContext.Provider value={{ player, setPlayer, enemy, setEnemy }}>
      {children}
    </CombatContext.Provider>
  );
}

export function useCombat() {
  return useContext(CombatContext);
}
