import React, { useEffect, useState } from "react";
import SkillsDetalhes from  "../../components/dataBaseComponents/SkillsDetalhesDB";
import BtnVoltarDB from "../../components/dataBaseComponents/BtnVoltarDB";

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skillDetails, setSkillDetails] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/skills");
        const data = await response.json();
        setSkills(data.results);
      } catch (error) {
        console.error("Erro ao buscar skills:", error);
      }
    }

    fetchSkills();
  }, []);

  useEffect(() => {
    if (!selectedSkill) return;

    async function fetchSkillDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/skills/${selectedSkill}`);
        const data = await response.json();
        setSkillDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da skill:", error);
      }
    }

    fetchSkillDetails();
  }, [selectedSkill]);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
    setSkillDetails(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <BtnVoltarDB /><br />
      <h1>Skills</h1>
      <select onChange={handleSkillChange} value={selectedSkill}>
        <option value="">-- Selecione uma Skill --</option>
        {skills.map((skill) => (
          <option key={skill.index} value={skill.index}>
            {skill.name}
          </option>
        ))}
      </select>

      <SkillsDetalhes dados={skillDetails} />
    </div>
  );
}

export default SkillsPage;
