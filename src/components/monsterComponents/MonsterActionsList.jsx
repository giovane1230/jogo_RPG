import React from "react";

export default function MonsterActionsList({ monster }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Ações</h2>
      {monster.actions?.map((action, i) => (
        <div key={i} className="p-2 border rounded">
          <p className="font-semibold">{action.name}</p>
          <p>{action.desc}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">Ações Especiais</h2>
      {monster.special_abilities?.map((special, i) => (
        <div key={i} className="p-2 border rounded">
          <p className="font-semibold">{special.name}</p>
          <p>{special.desc}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">Reações</h2>
      {monster.reactions?.map((reaction, i) => (
        <div key={i} className="p-2 border rounded">
          <p className="font-semibold">{reaction.name}</p>
          <p>{reaction.desc}</p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-4">Ações Lendárias</h2>
      {monster.legendary_actions?.map((legendary, i) => (
        <div key={i} className="p-2 border rounded">
          <p className="font-semibold">{legendary.name}</p>
          <p>{legendary.desc}</p>
        </div>
      ))}
    </div>
  );
}
