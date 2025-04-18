import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRaces, getRaceDetails } from '../../api/racesApi';
import { useCharacter } from '../../context/CharacterContext';

const RaceSelection = () => {
  const [races, setRaces] = useState([]);
  const [selectedRaceIndex, setSelectedRaceIndex] = useState('');
  const [raceDetails, setRaceDetails] = useState(null);

  const { character, setCharacter } = useCharacter();

  // Carrega todas as raças disponíveis
  useEffect(() => {
    getAllRaces().then(setRaces);
  }, []);

  // Quando o usuário escolhe uma raça, busca os detalhes e salva no contexto
  const handleRaceChange = async (e) => {
    const index = e.target.value;
    setSelectedRaceIndex(index);

    if (index) {
      const details = await getRaceDetails(index);
      setRaceDetails(details);

      // Salva raça e bônus no contexto global
      setCharacter(prev => ({
        ...prev,
        race: details,
        attributes: {
          ...prev.attributes,
          ...details.ability_bonuses.reduce((acc, bonus) => {
            const key = mapAbilityNameToKey(bonus.ability_score.name);
            acc[key] = (prev.attributes?.[key] || 8) + bonus.bonus;
            return acc;
          }, {})
        }
      }));
    }
  };

  // Mapeia "Strength" para "str", etc.
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

  return (
    <div>
      <h3>Escolha sua raça:</h3>
      <select value={selectedRaceIndex} onChange={handleRaceChange}>
        <option value="">-- escolha --</option>
        {races.map((race) => (
          <option key={race.index} value={race.index}>
            {race.name}
          </option>
        ))}
      </select>

      {raceDetails && (
        <div style={{ marginTop: 20 }}>
          <h4>Informações da Raça:</h4>
          <p><strong>Nome:</strong> {raceDetails.name}</p>
          <p><strong>Velocidade:</strong> {raceDetails.speed}</p>
          <p><strong>Idiomas:</strong> {raceDetails.languages.map(lang => lang.name).join(', ')}</p>
          <p><strong>Proeficiências:</strong> {raceDetails.starting_proficiencies.map(p => p.name).join(', ') || 'Nenhuma'}</p>
          <p><strong>Aumento de Habilidades:</strong></p>
          <ul>
            {raceDetails.ability_bonuses.map((bonus, i) => (
              <li key={i}>{bonus.ability_score.name}: +{bonus.bonus}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedRaceIndex && (
        <Link to="/charcreateptns">
          <button style={{ marginTop: 20 }}>Avançar</button>
        </Link>
      )}
    </div>
  );
};

export default RaceSelection;
