import React, { useEffect, useState } from "react";

export default function AllMonsterActions() {
  const [actionsByType, setActionsByType] = useState({
    Ação: [],
    Especial: [],
    Reação: [],
    Lendária: [],
  });
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Lote pequeno para evitar rate limit
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchAllActions = async () => {
      setLoading(true);
      try {
        // Buscar lista de monstros com paginação
        const res = await fetch("https://www.dnd5eapi.co/api/monsters");
        const data = await res.json();

        const pagedMonsters = data.results.slice(offset, offset + limit);
        const monsterPromises = pagedMonsters.map(async (monster) => {
          const res = await fetch(`https://www.dnd5eapi.co${monster.url}`);
          return res.json();
        });

        const monsterDetails = await Promise.all(monsterPromises);

        // Agrupar ações por tipo
        const newActions = {
          Ação: [],
          Especial: [],
          Reação: [],
          Lendária: [],
        };

        monsterDetails.forEach((monster) => {
          (monster.actions || []).forEach((a) =>
            newActions.Ação.push({
              type: "Ação",
              name: a.name,
              desc: a.desc,
              monster: monster.name,
            })
          );
          (monster.special_abilities || []).forEach((a) =>
            newActions.Especial.push({
              type: "Especial",
              name: a.name,
              desc: a.desc,
              monster: monster.name,
            })
          );
          (monster.reactions || []).forEach((a) =>
            newActions.Reação.push({
              type: "Reação",
              name: a.name,
              desc: a.desc,
              monster: monster.name,
            })
          );
          (monster.legendary_actions || []).forEach((a) =>
            newActions.Lendária.push({
              type: "Lendária",
              name: a.name,
              desc: a.desc,
              monster: monster.name,
            })
          );
        });

        // Acumula os resultados anteriores
        setActionsByType((prev) => ({
          Ação: [...prev.Ação, ...newActions.Ação],
          Especial: [...prev.Especial, ...newActions.Especial],
          Reação: [...prev.Reação, ...newActions.Reação],
          Lendária: [...prev.Lendária, ...newActions.Lendária],
        }));
      } catch (err) {
        console.error("Erro ao buscar ações dos monstros:", err);
      }
      setLoading(false);
    };

    fetchAllActions();
    // eslint-disable-next-line
  }, [offset, limit]);

  const proximos = () => setOffset(offset + limit);
  const anterior = () => setOffset(Math.max(0, offset - limit));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ações de Monstros por Tipo</h1>
      <button onClick={anterior} disabled={offset === 0}>
        Anterior
      </button>
      <button onClick={proximos}>Próximos</button>
      <p>
        Mostrando monstros de {offset} até {offset + limit}
      </p>
      {loading ? (
        <p>Carregando ações...</p>
      ) : (
        <div>
          {Object.entries(actionsByType).map(([tipo, lista]) => (
            <div key={tipo}>
              <h2 className="font-bold mt-4">{tipo}</h2>
              {lista.map((action, idx) => (
                <div key={idx} className="border p-2 rounded shadow-sm mb-2">
                  <p className="text-sm text-gray-600">
                    <strong>{action.type}</strong> de{" "}
                    <strong>{action.monster}</strong>
                  </p>
                  <p className="font-semibold">{action.name}</p>
                  <p>{action.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
