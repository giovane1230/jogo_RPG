import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SkillsDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Detalhes da Skill:</h3>
      <p><strong>Nome:</strong> {dados.name}</p>
      <p><strong>Descrição:</strong></p>
      <ul>
        {dados.desc.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      <p><strong>Habilidade Associada:</strong> {dados.ability_score.name}</p>
      <Link to={`https://www.dnd5eapi.co/api/2014/skills/${dados.index}`} style={{ marginTop: "10px", display: "block" }}>
        Ver mais detalhes
      </Link>
    </div>
    
  );
}
SkillsDetalhes.propTypes = {
  dados: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.arrayOf(PropTypes.string).isRequired,
    ability_score: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.string.isRequired,
  }).isRequired,
};

export default SkillsDetalhes;
