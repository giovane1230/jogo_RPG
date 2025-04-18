import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

const SpellSelection = () => {
  const navigate = useNavigate();
  const [spells, setSpells] = useState([]);
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxSpells, setMaxSpells] = useState(0);
  const { updateCharacter } = useCharacter();


  useEffect(() => {
    const charData = JSON.parse(localStorage.getItem('charData'));
    const charClass = typeof charData?.class === 'object' ? charData.class.index : charData?.class;
    console.log("Classe detectada:", charClass);


    if (!charClass) {
      setLoading(false);
      return;
    }

    const fetchSpells = async () => {
      try {
        const response = await fetch('https://www.dnd5eapi.co/api/spells?level=1');
        const data = await response.json();
        const spellsLevel1 = data.results;
    
        const detailedSpells = await Promise.all(
          spellsLevel1.map(spell =>
            fetch(`https://www.dnd5eapi.co${spell.url}`)
              .then(res => res.json())
              .catch(() => null) // evita quebra se uma falhar
          )
        );
    
        const classSpells = detailedSpells.filter(
          spell => spell && spell.classes?.some(cls => cls.index === charClass)
        );
    
        setSpells(classSpells);
        setMaxSpells(getMaxSpellsByClass(charClass));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar magias:', error);
        setLoading(false);
      }
    };
    

    fetchSpells();
  }, []);

  const getMaxSpellsByClass = (charClass) => {
    const limits = {
      wizard: 6,
      sorcerer: 2,
      bard: 4,
      cleric: 3,
      druid: 2,
      warlock: 2,
      paladin: 2,
      ranger: 2,
    };
    return limits[charClass] || 0;
  };

  const toggleSpell = (spell) => {
    const alreadySelected = selectedSpells.find(s => s.index === spell.index);
    if (alreadySelected) {
      setSelectedSpells(selectedSpells.filter(s => s.index !== spell.index));
    } else if (selectedSpells.length < maxSpells) {
      setSelectedSpells([...selectedSpells, spell]);
    }
  };

  const handleFinish = () => {
    const charData = JSON.parse(localStorage.getItem('charData')) || {};
    charData.spells = selectedSpells;
  
    localStorage.setItem('charData', JSON.stringify(charData));
    updateCharacter({ spells: selectedSpells }); // <- Atualiza o contexto
    navigate('/resumo');
  };
  

  if (loading) return <p>Carregando magias...</p>;
  if (!loading && spells.length === 0) return <p>Nenhuma magia disponível ou classe não definida.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Seleção de Magias de Nível 1</h2>
      <p>Selecione até {maxSpells} magias:</p>
      <ul>
        {spells.map(spell => (
          <li key={spell.index} style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                checked={selectedSpells.some(s => s.index === spell.index)}
                onChange={() => toggleSpell(spell)}
                disabled={
                  !selectedSpells.some(s => s.index === spell.index) && selectedSpells.length >= maxSpells
                }
              />
              <strong> {spell.name}</strong> - {spell.desc[0]}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleFinish} 
      // disabled={selectedSpells.length !== maxSpells || selectedSpells === 0}
      >
        Finalizar Criação
      </button>
    </div>
  );
};

export default SpellSelection;
