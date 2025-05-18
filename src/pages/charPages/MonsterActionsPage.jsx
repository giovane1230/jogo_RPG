import React, { useState } from "react";
import { fetchMonster } from "../../api/monsters";
import MonsterActionsList from "../../components/monsterComponents/MonsterActionsList";

export default function MonsterActionsPage() {
  const [monsterIndex, setMonsterIndex] = useState("");
  const [monsterData, setMonsterData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchMonster(monsterIndex);
      setMonsterData(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar monstro. Verifique o nome ou index.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Busca de Ações de Monstros</h1>
      <input
        type="text"
        placeholder="Digite o index (ex: chain-devil)"
        className="border p-2 mr-2"
        value={monsterIndex}
        onChange={(e) => setMonsterIndex(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>

      {monsterData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">{monsterData.name}</h2>
          <MonsterActionsList monster={monsterData} />
        </div>
      )}
    </div>
  );
}
