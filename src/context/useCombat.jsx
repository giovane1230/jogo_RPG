import { useState } from 'react';

export const useCombat = () => {
  // Estado do inimigo selecionado
  const [enemy, setEnemy] = useState(null);

  // Estado opcional do player no combate
  const [playerCombat, setPlayerCombat] = useState(null);

  // Estado para armazenar buffs/debuffs no combate
  const [combatStatus, setCombatStatus] = useState({
    playerBuffs: [],
    playerDebuffs: [],
    enemyBuffs: [],
    enemyDebuffs: [],
  });

  // Função para iniciar o combate com inimigo
  const startCombat = (selectedEnemy, selectedPlayer) => {
    setEnemy(selectedEnemy);
    setPlayerCombat(selectedPlayer);
  };

  // Função para resetar o combate
  const resetCombat = () => {
    setEnemy(null);
    setPlayerCombat(null);
    setCombatStatus({
      playerBuffs: [],
      playerDebuffs: [],
      enemyBuffs: [],
      enemyDebuffs: [],
    });
  };

  // Função para aplicar um debuff ou buff
  const applyStatus = (target, statusType, status) => {
    setCombatStatus(prev => ({
      ...prev,
      [target + statusType]: [...prev[target + statusType], status],
    }));
  };

  return {
    enemy,
    setEnemy,
    playerCombat,
    setPlayerCombat,
    combatStatus,
    applyStatus,
    startCombat,
    resetCombat
  };
};
