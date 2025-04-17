import React, { useEffect, useState } from "react";
import SpellsDetalhes from "../components/SpellsDetalhes";

function SpellsPage() {
  const [spells, setSpells] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState("");
  const [spellDetails, setSpellDetails] = useState(null);

  useEffect(() => {
    async function fetchSpells() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/spells");
        const data = await response.json();
        setSpells(data.results);
      } catch (error) {
        console.error("Erro ao buscar spells:", error);
      }
    }

    fetchSpells();
  }, []);

  useEffect(() => {
    if (!selectedSpell) return;

    async function fetchSpellDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${selectedSpell}`);
        const data = await response.json();
        setSpellDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da spell:", error);
      }
    }

    fetchSpellDetails();
  }, [selectedSpell]);

  const handleSpellChange = (event) => {
    setSelectedSpell(event.target.value);
    setSpellDetails(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Spells</h1>
      <select onChange={handleSpellChange} value={selectedSpell}>
        <option value="">-- Selecione uma Spell --</option>
        {spells.map((spell) => (
          <option key={spell.index} value={spell.index}>
            {spell.name}
          </option>
        ))}
      </select>

      <SpellsDetalhes dados={spellDetails} />
    </div>
  );
}

export default SpellsPage;
