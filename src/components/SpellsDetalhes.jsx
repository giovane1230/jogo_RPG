import React from "react";
import { Link } from "react-router-dom";

function SpellsDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Detalhes da Spell:</h3>
      <p><strong>Nome:</strong> {dados.name}</p>
      <p><strong>Nível:</strong> {dados.level}</p>
      <p><strong>Escola:</strong> {dados.school.name}</p>
      <p><strong>Distancia:</strong> {dados.range}</p>
      <p><strong>Tempo de Conjuração:</strong> {dados.casting_time}</p>
      <p><strong>Duração:</strong> {dados.duration}</p>
      <p><strong>Componentes:</strong> {dados.components.join(", ")}</p>
      <p><strong>Ritual:</strong> {dados.ritual ? "Sim" : "Não"}</p>
      <p><strong>Classes:</strong></p>
<ul>
  {dados.classes?.map((cla, inx) => (
    <li key={inx}>{cla.name}</li>
  ))}
</ul>

{dados.damage?.damage_at_slot_level && (
  <div>
    <h4>Dano por nível de slot:</h4>
    <ul>
      {Object.entries(dados.damage.damage_at_slot_level).map(([nivel, dano]) => (
        <li key={nivel}>
          <strong>Nível {nivel}:</strong> {dano}
        </li>
      ))}
    </ul>
  </div>
)}

{dados.damage?.damage_type?.name && (
  <p><strong>Tipo de dano:</strong> {dados.damage.damage_type.name}</p>
)}

{dados.dc?.dc_type?.name && (
  <>
    <p><strong>Classe de Dificuldade:</strong> {dados.dc.dc_type.name}</p>
    {dados.dc.dc_success && (
      <p><strong>Classe de Dificuldade Sucesso:</strong> {dados.dc.dc_success}</p>
    )}
  </>
)}

{dados.area_of_effect?.type && (
  <p><strong>Área de efeito:</strong> {dados.area_of_effect.type} - {dados.area_of_effect.size}</p>
)}

{dados.higher_level?.length > 0 && (
  <>
    <h3>Nível Superior:</h3>
    <ul>
      {dados.higher_level.map((hig, index) => (
        <li key={index}>{hig}</li>
      ))}
    </ul>
  </>
)}

      <p><strong>Descrição:</strong></p>
      <ul>
        {dados.desc.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      <Link to={`https://www.dnd5eapi.co/api/2014/spells/${dados.index}`} style={{ marginTop: "10px", display: "block" }}>
        Ver mais detalhes
      </Link>
    </div>
  );
}

export default SpellsDetalhes;
