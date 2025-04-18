import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../context/CharacterContext';

const CharStatusCreate = () => {
  const { character, setCharacter } = useCharacter();

  const [points, setPoints] = useState(27);
  const [baseAttributes, setBaseAttributes] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8,
  });

  const pointBuyCost = {
    8: 0, 9: 1, 10: 2, 11: 3,
    12: 4, 13: 5, 14: 7, 15: 9,
  };

  // Mapeia nomes longos para chaves curtas
  const mapAbilityNameToKey = (name) => {
    const map = {
      Strength: 'str',
      Dexterity: 'dex',
      Constitution: 'con',
      Intelligence: 'int',
      Wisdom: 'wis',
      Charisma: 'cha',
    };
    return map[name] || name.toLowerCase();
  };

    // Pega os bônus raciais do contexto
    const racialBonuses = character.race?.ability_bonuses?.reduce((acc, bonus) => {
        const key = mapAbilityNameToKey(bonus.ability_score.name);
        acc[key] = bonus.bonus;
        return acc;
      }, {}) || {};

  // Manipula aumento de atributo
  const handleIncrease = (attr) => {
    const current = baseAttributes[attr];
    const next = current + 1;
    const diff = (pointBuyCost[next] ?? 99) - (pointBuyCost[current] ?? 0);

    if (next <= 15 && points >= diff) {
      setBaseAttributes(prev => ({ ...prev, [attr]: next }));
      setPoints(prev => prev - diff);
    }
  };

  const handleDecrease = (attr) => {
    const current = baseAttributes[attr];
    const prevVal = current - 1;
    const refund = (pointBuyCost[current] ?? 0) - (pointBuyCost[prevVal] ?? 0);

    if (prevVal >= 8) {
      setBaseAttributes(prev => ({ ...prev, [attr]: prevVal }));
      setPoints(prev => prev + refund);
    }
  };

  const getModifier = (total) => Math.floor((total - 10) / 2);

  // Salvar no contexto quando mudar
  useEffect(() => {
    setCharacter(prev => ({
      ...prev,
      attributes: baseAttributes,
    }));
  }, [baseAttributes, setCharacter]);

  const handleFinalizar = () => {
    const base = baseAttributes;
    const bonus = racialBonuses;
  
    const finalAttributes = Object.keys(base).reduce((acc, key) => {
      acc[key] = base[key] + (bonus[key] || 0);
      return acc;
    }, {});
  
    const finalData = {
      ...character,
      finalAttributes,
    };
  
    localStorage.setItem('finalCharacter', JSON.stringify(finalData));
    console.log(localStorage.getItem("finalCharacter"));
    alert('Personagem criado e salvo com sucesso!');
  };
  

  return (
    <div>
      <h2>Distribuição de Pontos</h2>
      <p>Pontos disponíveis: {points}</p>
      <div>
        {Object.keys(baseAttributes).map((attr) => {
          const base = baseAttributes[attr];
          const bonus = racialBonuses[attr] || 0;
          const total = base + bonus;

          return (
            <div key={attr}>
              <strong>{attr.toUpperCase()}:</strong> {base}
              {bonus > 0 && <span> + {bonus} (racial) = <strong>{total}</strong></span>}
              <span> (Mod: {getModifier(total)}) </span>
              <button onClick={() => handleIncrease(attr)}>+</button>
              <button onClick={() => handleDecrease(attr)}>-</button>
            </div>
          );
        })}
      </div>
      <button
  onClick={handleFinalizar}
  style={{ marginTop: '20px', padding: '10px 20px', fontWeight: 'bold' }}
>
  Finalizar Criação
</button>

    </div>
  );
};

export default CharStatusCreate;
