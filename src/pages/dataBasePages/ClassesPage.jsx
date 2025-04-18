import React, { useEffect, useState } from "react";
import ClasseDetalhes from "../../components/dataBaseComponents/ClasseDetalhesDB";
import BtnVoltarDB from "../../components/dataBaseComponents/BtnVoltarDB";

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/classes");
        const data = await response.json();
        setClasses(data.results);
      } catch (error) {
        console.error("Erro ao buscar classes:", error);
      }
    }

    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;

    async function fetchClassDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/classes/${selectedClass}`);
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da classe:", error);
      }
    }

    fetchClassDetails();
  }, [selectedClass]);

  const handleClassChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedClass(selectedValue);
    setClassDetails(null); // limpa os dados antigos enquanto carrega os novos
  };

  return (
    <div style={{ padding: "20px" }}>
      <BtnVoltarDB /><br />
      <h1>Classes</h1>
      <select onChange={handleClassChange} value={selectedClass} style={{ marginBottom: "20px" }}>
        <option value="">-- Selecione uma Classe --</option>
        {classes.map((classe) => (
          <option key={classe.index} value={classe.index}>
            {classe.name}
          </option>
        ))}
      </select>

      <ClasseDetalhes dados={classDetails} />
    </div>
  );
}

export default ClassesPage;
