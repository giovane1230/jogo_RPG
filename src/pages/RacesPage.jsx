import React, { useEffect, useState } from "react";
import RacesDetalhes from "../components/RacesDetalhes";

function RacesPage() {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");
  const [raceDetails, setRaceDetails] = useState(null);

  useEffect(() => {
    async function fetchRaces() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/races");
        const data = await response.json();
        setRaces(data.results);
      } catch (error) {
        console.error("Erro ao buscar races:", error);
      }
    }

    fetchRaces();
  }, []);

  useEffect(() => {
    if (!selectedRace) return;

    async function fetchRaceDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/races/${selectedRace}`);
        const data = await response.json();
        setRaceDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da Race:", error);
      }
    }

    fetchRaceDetails();
  }, [selectedRace]);

  const handleRaceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRace(selectedValue);
    setRaceDetails(null); // limpa os dados antigos enquanto carrega os novos
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Races</h1>
      <select onChange={handleRaceChange} value={selectedRace} style={{ marginBottom: "20px" }}>
        <option value="">-- Selecione uma Race --</option>
        {races.map((race) => (
          <option key={race.index} value={race.index}>
            {race.name}
          </option>
        ))}
      </select>

      <RacesDetalhes dados={raceDetails} />
    </div>
  );
}

export default RacesPage;
