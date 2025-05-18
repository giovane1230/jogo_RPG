import React, { useEffect, useState } from "react";

export default function AllMonsterActions() {
  const [monsters, setMonsters] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20); // Limite inicial

  useEffect(() => {
    const fetchAllActions = async () => {
      setLoading(true);
      try {
        // 1. Buscar lista de monstros
        const res = await fetch("https://www.dnd5eapi.co/api/monsters");
        const data = await res.json();

        const limitedMonsters = data.results.slice(0, limit); // limitar a quantidade
        const monsterPromises = limitedMonsters.map(async (monster) => {
          const res = await fetch(`https://www.dnd5eapi.co${monster.url}`);
          return res.json();
        });

        const monsterDetails = await Promise.all(monsterPromises);

        // 2. Extrair todas as ações
        const allActions = monsterDetails.flatMap((monster) => {
          const normal = monster.actions || [];
          const specials = monster.special_abilities || [];
          const reactions = monster.reactions || [];
          const legendaries = monster.legendary_actions || [];

          return [
            ...normal.map((a) => ({ type: "Ação", name: a.name, desc: a.desc, monster: monster.name })),
            ...specials.map((a) => ({ type: "Especial", name: a.name, desc: a.desc, monster: monster.name })),
            ...reactions.map((a) => ({ type: "Reação", name: a.name, desc: a.desc, monster: monster.name })),
            ...legendaries.map((a) => ({ type: "Lendária", name: a.name, desc: a.desc, monster: monster.name })),
          ];
        });

        setActions(allActions);
      } catch (err) {
        console.error("Erro ao buscar ações dos monstros:", err);
      }
      setLoading(false);
    };

    fetchAllActions();
  }, [limit]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todas as Ações de Monstros</h1>

      <label className="mb-4 block">
        Limite de monstros:{" "}
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border p-1 w-20 ml-2"
        />
      </label>

      {loading ? (
        <p>Carregando ações...</p>
      ) : (
        <div className="space-y-4">
          {actions.map((action, index) => (
            <div key={index} className="border p-2 rounded shadow-sm">
              <p className="text-sm text-gray-600">
                <strong>{action.type}</strong> de <strong>{action.monster}</strong>
              </p>
              <p className="font-semibold">{action.name}</p>
              <p>{action.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
