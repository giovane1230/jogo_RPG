import React, { createContext, useContext, useEffect, useState } from "react";
import { useCharacter } from "./CharacterContext";

const CombatContext = createContext();

export function CombatProvider({ children }) {
  const { character } = useCharacter();
  const [player, setPlayer] = useState(null);
  const [enemy, setEnemy] = useState(null);
  const [playerHP, setPlayerHP] = useState(character?.vidaAtual || 0);
  const [buff, setBuff] = useState();

  // Atualiza o localStorage sempre que o player muda
  useEffect(() => {
    localStorage.setItem("charData", JSON.stringify(player));
  }, [player]);

  // Outras funções podem ser adicionadas aqui (ex: perder vida, etc)

  return (
    <CombatContext.Provider
      value={{
        player,
        setPlayer,
        enemy,
        setEnemy,
        playerHP,
        setPlayerHP,
        buff,
        setBuff,
      }}
    >
      {children}
    </CombatContext.Provider>
  );
}

export function useCombat() {
  return useContext(CombatContext);
}
