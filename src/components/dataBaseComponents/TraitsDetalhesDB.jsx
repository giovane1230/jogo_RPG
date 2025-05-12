import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TraitsDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Detalhes do Traço:</h3>
      <p>
        <strong>Nome:</strong> {dados.name}
      </p>
      <p>
        <strong>Descrição:</strong>
      </p>
      <ul>
        {dados.desc.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      {dados.races.length > 0 && (
        <p>
          <strong>Raça Associada: </strong>{" "}
          <ul>
            {dados.races.map((rac) => (
              <li key={rac.index}>{rac.name}</li>
            ))}
          </ul>
        </p>
      )}
      {dados.subraces.length > 0 && (
        <p>
          <strong>Sub Raça Associada: </strong>{" "}
          <ul>
            {dados.subraces.map((rac) => (
              <li key={rac.index}>{rac.name}</li>
            ))}
          </ul>
        </p>
      )}
      <Link
        to={`https://www.dnd5eapi.co/api/2014/traits/${dados.index}`}
        style={{ marginTop: "10px", display: "block" }}
      >
        Ver mais detalhes
      </Link>
    </div>
  );
}

export default TraitsDetalhes;
