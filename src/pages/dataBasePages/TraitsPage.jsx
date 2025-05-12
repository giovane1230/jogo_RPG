import React, { useEffect, useState } from "react";
import TraitsDetalhes from  "../../components/dataBaseComponents/TraitsDetalhesDB";
import BtnVoltarDB from "../../components/dataBaseComponents/BtnVoltarDB";

function TraitsPage() {
  const [traits, setTraits] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState("");
  const [traitsDetails, setTraitsDetails] = useState(null);

  useEffect(() => {
    async function fetchtraits() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/traits");
        const data = await response.json();
        setTraits(data.results);
      } catch (error) {
        console.error("Erro ao buscar traits:", error);
      }
    }

    fetchtraits();
  }, []);

  useEffect(() => {
    if (!selectedTraits) return;

    async function fetchTraitsDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/traits/${selectedTraits}`);
        const data = await response.json();
        setTraitsDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da Traits:", error);
      }
    }

    fetchTraitsDetails();
  }, [selectedTraits]);

  const handleTraitsChange = (event) => {
    setSelectedTraits(event.target.value);
    setTraitsDetails(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <BtnVoltarDB /><br />
      <h1>Traços</h1>
      <select onChange={handleTraitsChange} value={selectedTraits}>
        <option value="">-- Selecione uma Traits --</option>
        {traits.map((Traits) => (
          <option key={Traits.index} value={Traits.index}>
            {Traits.name}
          </option>
        ))}
      </select>

      <TraitsDetalhes dados={traitsDetails} />
    </div>
  );
}

export default TraitsPage;
