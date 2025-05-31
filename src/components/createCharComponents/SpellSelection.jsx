import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacter } from "../../context/CharacterContext";

const SpellSelection = () => {
  const navigate = useNavigate();
  const { character, updateCharacter } = useCharacter();

  const [spells, setSpells] = useState([]);
  const [cantrips, setCantrips] = useState([]);
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedCantrips, setSelectedCantrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxSpells, setMaxSpells] = useState(0);
  const [maxCantrips, setMaxCantrips] = useState(0);

  useEffect(() => {
    const characterData = JSON.parse(localStorage.getItem("characterData"));
    const charClass =
      typeof characterData?.class === "object"
        ? characterData.class.index
        : characterData?.class;

    if (!charClass) {
      setLoading(false);
      return;
    }

    const fetchClassSpellData = async () => {
      try {
        // Busca nível 1 para saber quantos pode escolher
        const levelResponse = await fetch(
          `https://www.dnd5eapi.co/api/classes/${charClass}/levels/1`
        );
        const levelData = await levelResponse.json();

        const cantripsLimit = levelData.spellcasting?.cantrips_known || 0;
        const spellSlotsLevel1 =
          levelData.spellcasting?.spell_slots_level_1 || 0;

        setMaxCantrips(cantripsLimit);
        setMaxSpells(spellSlotsLevel1);

        // Busca todas as magias da classe
        const spellsResponse = await fetch(
          `https://www.dnd5eapi.co/api/classes/${charClass}/spells`
        );
        const spellsData = await spellsResponse.json();

        // Separa todos os cantrips e magias de nível 1
        const cantripSpells = spellsData.results.filter(
          (spell) => spell.level === 0
        );
        const level1Spells = spellsData.results.filter(
          (spell) => spell.level === 1
        );

        // Busca detalhes em série para evitar too many requests
        const fetchDetailsSerial = async (spells) => {
          const details = [];
          for (const spell of spells) {
            try {
              const res = await fetch(`https://www.dnd5eapi.co${spell.url}`);
              details.push(await res.json());
            } catch {
              details.push(null);
            }
          }
          return details.filter(Boolean);
        };

        const detailedCantrips = await fetchDetailsSerial(cantripSpells);
        const detailedLevel1Spells = await fetchDetailsSerial(level1Spells);

        setCantrips(detailedCantrips);
        setSpells(detailedLevel1Spells);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar magias:", error);
        setLoading(false);
      }
    };

    fetchClassSpellData();
  }, []);

  const toggleSpell = (spell) => {
    const alreadySelected = selectedSpells.find((s) => s.index === spell.index);

    if (alreadySelected) {
      setSelectedSpells(selectedSpells.filter((s) => s.index !== spell.index));
    } else if (selectedSpells.length < maxSpells) {
      setSelectedSpells([...selectedSpells, spell]);
    }
  };

  const toggleCantrip = (spell) => {
    const alreadySelected = selectedCantrips.find(
      (s) => s.index === spell.index
    );
    if (alreadySelected) {
      setSelectedCantrips(
        selectedCantrips.filter((s) => s.index !== spell.index)
      );
    } else if (selectedCantrips.length < maxCantrips) {
      setSelectedCantrips([...selectedCantrips, spell]);
    }
  };

  const handleFinish = () => {
    const updatedCharacter = {
      ...character,
      spells: selectedSpells,
      cantrips: selectedCantrips,
    };

    updateCharacter(updatedCharacter);

    updateCharacter(updatedCharacter);
    navigate("/resumo");
  };

  if (loading) return <p>Carregando magias...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Seleção de Truques (Cantrips)</h2>
      <p>Selecione até {maxCantrips} truques:</p>
      <ul>
        {cantrips.map((spell) => (
          <li key={spell.index}>
            <label>
              <input
                type="checkbox"
                checked={selectedCantrips.some((s) => s.index === spell.index)}
                onChange={() => toggleCantrip(spell)}
                disabled={
                  !selectedCantrips.some((s) => s.index === spell.index) &&
                  selectedCantrips.length >= maxCantrips
                }
              />
              {spell.name}
            </label>
          </li>
        ))}
      </ul>

      <h2>Seleção de Magias de Nível 1</h2>
      <p>Selecione até {maxSpells} magias:</p>
      <ul>
        {spells.map((spell) => (
          <li key={spell.index}>
            <label>
              <input
                type="checkbox"
                checked={selectedSpells.some((s) => s.index === spell.index)}
                onChange={() => toggleSpell(spell)}
                disabled={
                  !selectedSpells.some((s) => s.index === spell.index) &&
                  selectedSpells.length >= maxSpells
                }
              />
              {spell.name}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleFinish}
        disabled={selectedSpells.length !== maxSpells}
      >
        Finalizar Criação
      </button>
    </div>
  );
};

export default SpellSelection;
