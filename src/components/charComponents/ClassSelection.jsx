import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // necessário para navegação
import RaceSelection from './RaceSelection'; // Só mantenha se for usar aqui
import { useCharacter } from '../../context/CharacterContext';

const ClassSelection = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [proficiencies, setProficiencies] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState({});
  const [proficiencyChoices, setProficiencyChoices] = useState([]);
  const [selectedProficiencies, setSelectedProficiencies] = useState({});
  const { updateCharacter } = useCharacter();
  
  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/classes')
      .then(res => res.json())
      .then(data => setClasses(data.results));
  }, []);

  useEffect(() => {
    if (!selectedClass) return;

    fetch(`https://www.dnd5eapi.co/api/2014/classes/${selectedClass}`)
      .then(res => res.json())
      .then(async data => {
        setProficiencies(data.proficiencies || []);
        setProficiencyChoices(data.proficiency_choices || []);

        const processed = await Promise.all(
          (data.starting_equipment_options || []).map(async (choice) => {
            let items = [];

            if (choice.from.option_set_type === 'options_array') {
              for (const opt of choice.from.options) {
                if (opt.option_type === 'counted_reference') {
                  items.push({
                    name: opt.of.name,
                    url: opt.of.url,
                    count: opt.count
                  });
                } else if (opt.option_type === 'choice') {
                  const cat = opt.choice.from.equipment_category;
                  const catData = await fetch(
                    `https://www.dnd5eapi.co${cat.url}`
                  ).then(r => r.json());

                  catData.equipment.forEach(eq => {
                    items.push({
                      name: eq.name,
                      url: eq.url,
                      count: 1
                    });
                  });
                }
              }
            }

            const uniqueItems = items.reduce((acc, item) => {
              if (!acc.find(i => i.name === item.name)) {
                acc.push(item);
              }
              return acc;
            }, []);

            return {
              choose: choice.choose,
              desc: choice.desc,
              items: uniqueItems
            };
          })
        );

        setEquipmentOptions(processed);

        setSelectedEquipments(
          processed.reduce((acc, _, idx) => {
            acc[idx] = [];
            return acc;
          }, {})
        );
      });
  }, [selectedClass]);

  const toggleProficiency = (choiceIdx, proficiencyName, limit) => {
    setSelectedProficiencies(prev => {
      const sel = prev[choiceIdx] || [];
      const already = sel.includes(proficiencyName);
      let next;

      if (already) {
        next = sel.filter(n => n !== proficiencyName);
      } else if (sel.length < limit) {
        next = [...sel, proficiencyName];
      } else {
        return prev;
      }

      return { ...prev, [choiceIdx]: next };
    });
  };

  const toggleEquipment = (choiceIdx, itemName, limit) => {
    setSelectedEquipments(prev => {
      const sel = prev[choiceIdx] || [];
      const already = sel.includes(itemName);
      let next;

      if (already) {
        next = sel.filter(n => n !== itemName);
      } else if (sel.length < limit) {
        next = [...sel, itemName];
      } else {
        return prev;
      }

      return { ...prev, [choiceIdx]: next };
    });
  };
  
  const handleAvancar = () => {
    const selectedClassData = classes.find(c => c.index === selectedClass);
  
    const updatedData = {
      class: {
        index: selectedClassData.index,
        name: selectedClassData.name,
      },
      proficiencies,
      selectedProficiencies,
      selectedEquipments,
    };
  
    updateCharacter(updatedData);
  
    // Salva no localStorage junto com o que já tiver salvo
    const existingData = JSON.parse(localStorage.getItem('charData')) || {};
    const newCharData = { ...existingData, ...updatedData };
    localStorage.setItem('charData', JSON.stringify(newCharData));
  
    navigate('/charcreateptns');
  };
  
  
  

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="class-select"><strong>Selecione uma classe:</strong></label><br />
        <select
          id="class-select"
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
        >
          <option value="">-- escolha --</option>
          {classes.map(c => (
            <option key={c.index} value={c.index}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div style={{ marginBottom: 20 }}>
            <h3>Proficiencias:</h3>
            <ul>
              {proficiencies.map((prof, idx) => (
                <li key={idx}>{prof.name}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3>Escolha seus equipamentos iniciais:</h3>
            {equipmentOptions.map((option, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                <p><strong>{option.desc}</strong> (Escolher {option.choose})</p>
                {option.items.map((item, itemIdx) => {
                  const selected = selectedEquipments[idx] || [];
                  return (
                    <label key={itemIdx} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(item.name)}
                        onChange={() => toggleEquipment(idx, item.name, option.choose)}
                        disabled={!selected.includes(item.name) && selected.length >= option.choose}
                      />
                      {item.count > 1 ? `${item.count}x ` : ''}{item.name}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          {proficiencyChoices.length > 0 && (
            <div>
              <h3>Escolha suas proeficiências</h3>
              {proficiencyChoices.map((choice, idx) => (
                <div key={idx}>
                  <p><strong>{choice.desc}</strong> (Escolher {choice.choose})</p>
                  {choice.from.options.map(opt => {
                    const name = opt.item?.name;
                    const selected = selectedProficiencies[idx] || [];
                    return (
                      <label key={name} style={{ display: 'block' }}>
                        <input
                          type="checkbox"
                          checked={selected.includes(name)}
                          onChange={() => toggleProficiency(idx, name, choice.choose)}
                          disabled={!selected.includes(name) && selected.length >= choice.choose}
                        />
                        {name}
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          <RaceSelection />
          <button
            onClick={handleAvancar}
            // disabled={
            //   !selectedClass ||
            //   proficiencyChoices.some((choice, idx) => 
            //     (selectedProficiencies[idx] || []).length < choice.choose
            //   ) ||
            //   equipmentOptions.some((option, idx) => 
            //     (selectedEquipments[idx] || []).length < option.choose
            //   )
            // }
          >
            Avançar
          </button>
        </>
      )}
    </div>
  );
};

export default ClassSelection;
