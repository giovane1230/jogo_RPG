import React, { createContext, useContext, useEffect, useState } from "react";

const CombatContext = createContext();

export function CombatProvider({ children }) {
  // 1) Estado para armazenar o objeto "enemy" completo (incluindo hit_points, CA, etc.)
  const [enemy, setEnemy] = useState(null);

  // 2) Estado para armazenar apenas o HP atual do inimigo
  const [enemyHP, setEnemyHP] = useState(null);

  // 3) Sempre que o "enemy" mudar, inicializamos enemyHP com enemy.hit_points
  useEffect(() => {
    if (enemy) {
      setEnemyHP(enemy.hit_points);
    } else {
      setEnemyHP(null);
    }
  }, [enemy]);

  // 4) Função para atualizar qualquer campo de "enemy" (sem mexer no HP atual)
  const updateEnemy = (updates) => {
    setEnemy((prev) => ({ ...prev, ...updates }));
  };

  // 5) Função para mudar apenas o HP atual (sem alterar o objeto enemy.original_hit_points)
  // const updateEnemyHP = (novoHP) => {
  //   // Garante que não ficará abaixo de zero
  //   const hpValido = Math.max(0, novoHP);
  //   setEnemyHP(hpValido);
  // };

  return (
    <CombatContext.Provider
      value={{
        enemy, // Objeto completo do inimigo
        setEnemy, // Para trocar o inimigo inteiro (ex: carregar outro monstro)
        updateEnemy, // Para mexer em campos pontuais de "enemy" (ex: mudar AC, nome, etc.)
        enemyHP, // HP atual que os componentes podem exibir
        setEnemyHP, // Para atualizar só a vida atual
      }}
    >
      {children}
    </CombatContext.Provider>
  );
}

export function useCombat() {
  return useContext(CombatContext);
}
