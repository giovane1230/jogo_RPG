import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import SpellSelection from './SpellSelection';

const CharStatusCreate = () => {
  const { character, setCharacter } = useCharacter();
  const [alignments, setAlignments] = useState([]);

  const [points, setPoints] = useState(27);
  const [baseAttributes, setBaseAttributes] = useState({
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/alignments')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAlignments(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar alinhamentos:', err);
        setError('Erro ao carregar alinhamentos.');
        setLoading(false);
      });
  }, []);

  const handleAlignmentChange = (e) => {
    setCharacter({ ...character, alignment: e.target.value });
  };

  const pointBuyCost = {
    8: 0, 9: 1, 10: 2, 11: 3,
    12: 4, 13: 5, 14: 7, 15: 9,
  };

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

  const racialBonuses = character.race?.ability_bonuses?.reduce((acc, bonus) => {
    const key = mapAbilityNameToKey(bonus.ability_score.name);
    acc[key] = bonus.bonus;
    return acc;
  }, {}) || {};

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

  useEffect(() => {
    setCharacter(prev => ({
      ...prev,
      attributes: baseAttributes,
    }));
  }, [baseAttributes, setCharacter]);

  // const handleFinalizar = () => {
  //   const base = baseAttributes;
  //   const bonus = racialBonuses;

  //   const finalAttributes = Object.keys(base).reduce((acc, key) => {
  //     acc[key] = base[key] + (bonus[key] || 0);
  //     return acc;
  //   }, {});

  //   // Apenas os dados essenciais:
  //   // const filteredCharacter = {
  //   //   name: character.name,
  //   //   alignment: character.alignment,
  //   //   background: character.background,
  //   //   finalAttributes,
  //   //   race: character.race ? {
  //   //   index: character.race.index,
  //   //   name: character.race.name,
  //   //   } : null,
  //   //   class: character.class ? {
  //   //   index: character.class.index,
  //   //   name: character.class.name,
  //   //   } : null,
  //   //   selectedProficiencies: character.selectedProficiencies || {},
  //   //   selectedEquipments: character.selectedEquipments || {},
  //   //   vidaInicial: {
  //   //   ...character.vidaInicial,
  //   //   total: (character.vidaInicial || 0) + getModifier(finalAttributes.con),
  //   //   modCon: getModifier(finalAttributes.con)
  //   //   },
  //   //   spells: character.spells || [], // opcional
  //   // };

  //   // localStorage.setItem('charData', JSON.stringify(filteredCharacter, null, 2));
  //   // console.log('Personagem salvo:', filteredCharacter);
  //   // alert('Personagem criado e salvo com sucesso!');
  // };

  return (
    <div>
      <h2>Nome do Personagem:</h2>
      <input
        type="text"
        value={character.name || ''}
        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        placeholder="Digite o nome do personagem"
        style={{ width: "200px" }}
      />

      <h2>Alinhamento:</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select
        value={character.alignment || ''}
        onChange={handleAlignmentChange}
      >
        <option value="" disabled>
          {loading ? 'Carregando...' : 'Selecione um alinhamento'}
        </option>
        {alignments.map((a) => (
          <option key={a.index} value={a.name}>{a.name}</option>
        ))}
      </select>

      <h2>Background:</h2>
      <textarea
        value={character.background || ''}
        onChange={(e) => setCharacter({ ...character, background: e.target.value })}
        placeholder="Digite o background"
        style={{ width: '50%', height: '100px' }}
        maxLength={500}
      />

      <h2>Distribuição de Pontos</h2>
      <p>Pontos disponíveis: {points}</p>
      {Object.keys(baseAttributes).map((attr) => {
        const base = baseAttributes[attr];
        const bonus = racialBonuses[attr] || 0;
        const total = base + bonus;

        return (
          <div key={attr}>
            <strong>{attr.toUpperCase()}:</strong> {base}
            {bonus > 0 && <span> + {bonus} = <strong>{total}</strong></span>}
            <span> (Mod: {getModifier(total)}) </span>
            <button onClick={() => handleIncrease(attr)}>+</button>
            <button onClick={() => handleDecrease(attr)}>-</button>
          </div>
        );
      })}

      <SpellSelection />

      {/* <button
        onClick={handleFinalizar}
        style={{ marginTop: '20px', padding: '10px 20px', fontWeight: 'bold' }}
      >
        SALVAR TESTE
      </button> */}
    </div>
  );
};

export default CharStatusCreate;
