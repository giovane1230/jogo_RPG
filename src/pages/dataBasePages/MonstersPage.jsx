import React, { useEffect, useState } from "react";
import MonsterDetalhes from  "../../components/dataBaseComponents/MonsterDetalhesDB";
import BtnVoltarDB from "../../components/dataBaseComponents/BtnVoltarDB";

function MonstersPage() {
  const [monsters, setMonsters] = useState([]);
  const [selectedMonster, setSelectedMonster] = useState("");
  const [monsterData, setMonsterData] = useState(null);

  useEffect(() => {
    async function fetchMonsters() {
      try {
        const res = await fetch("https://www.dnd5eapi.co/api/monsters");
        const data = await res.json();
        setMonsters(data.results);
      } catch (error) {
        console.error("Erro ao buscar monstros:", error);
      }
    }

    fetchMonsters();
  }, []);

  useEffect(() => {
    if (!selectedMonster) return;

    async function fetchMonsterData() {
      try {
        const res = await fetch(`https://www.dnd5eapi.co/api/monsters/${selectedMonster}`);
        const data = await res.json();
        setMonsterData(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do monstro:", error);
      }
    }

    fetchMonsterData();
  }, [selectedMonster]);

  return (
    <div style={{ padding: "20px" }}>
      <BtnVoltarDB /><br />
      <h1>Monstros</h1>
      <select onChange={e => setSelectedMonster(e.target.value)} value={selectedMonster}>
        <option value="">-- Selecione um Monstro --</option>
        {monsters.map(monster => (
          <option key={monster.index} value={monster.index}>{monster.name}</option>
        ))}
      </select>

      <MonsterDetalhes dados={monsterData} />
    </div>
  );
}

export default MonstersPage;
