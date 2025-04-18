import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RaceSelection = ({ selectedClass }) => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [raceDetails, setRaceDetails] = useState(null);

  // Buscar lista de raças
  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/races')
      .then(res => res.json())
      .then(data => setRaces(data.results))
      .catch(err => console.error('Erro ao buscar raças:', err));
  }, []);

  // Buscar detalhes da raça ao selecionar
  const handleRaceChange = async (e) => {
    const raceIndex = e.target.value;
    setSelectedRace(raceIndex);

    if (raceIndex) {
      try {
        const res = await fetch(`https://www.dnd5eapi.co/api/races/${raceIndex}`);
        const data = await res.json();
        setRaceDetails(data);

        const charData = JSON.parse(localStorage.getItem('charData')) || {};
        localStorage.setItem('charData', JSON.stringify({ ...charData, race: raceIndex, raceDetails: data }));
      } catch (err) {
        console.error('Erro ao buscar detalhes da raça:', err);
      }
    }
  };

  return (
    <div>
      <h3>Escolha sua raça:</h3>
      <select value={selectedRace} onChange={handleRaceChange}>
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

      {/* Só mostra o botão se tiver classe e raça escolhidas */}
      {selectedRace && (
        <Link to={"/charcreateptns"}>
        <button>
          Avançar
        </button>
        </Link>
      )}
    </div>
  );
};

export default RaceSelection;
