// src/pages/CharacterCreationPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClasses, getClassDetails } from '../../api/classesApi';
import ClassSelection from '../../components/createCharComponents/ClassSelection';
import ProficiencySelector from '../../components/createCharComponents/ProficiencySelector';
import EquipmentSelector from '../../components/createCharComponents/EquipmentSelector';
import RaceSelection from '../../components/createCharComponents/RaceSelection';

const CharacterCreationPage = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    getAllClasses().then(setClasses);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      getClassDetails(selectedClass).then(setClassDetails);
    }
  }, [selectedClass]);

  const handleAvancar = () => {
    const dadosSalvos = JSON.parse(localStorage.getItem('characterData')) || {};

    const novosDados = {
      ...dadosSalvos,
      class: selectedClass,
      proficiencies: classDetails?.proficiencies || [],
      selectedProficiencies: classDetails?.selectedProficiencies || {},
      bag: classDetails?.bag || {},
    };

    localStorage.setItem('characterData', JSON.stringify(novosDados));
    navigate('/distribuir-atributos');
  };

  return (
    <div style={{ padding: 20 }}>
      <ClassSelection
        classes={classes}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
      />

      {classDetails && (
        <>
          <ProficiencySelector
            proficiencies={classDetails.proficiencies}
            proficiencyChoices={classDetails.proficiency_choices}
          />
          <EquipmentSelector equipmentOptions={classDetails.starting_equipment_options} />
          <RaceSelection />
          <button onClick={handleAvancar}>Avançar</button>
        </>
      )}
    </div>
  );
};

export default CharacterCreationPage;
