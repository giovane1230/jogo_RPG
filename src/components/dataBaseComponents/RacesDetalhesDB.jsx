import React from "react";
import PropTypes from "prop-types";

function RacesDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Detalhes da Raça: {dados.name}</h3>
      <p><strong>Velocidade:</strong> {dados.speed}</p>
      <p><strong>Alinhamento:</strong> {dados.alignment}</p>
      <p><strong>Idade:</strong> {dados.age}</p>
      <p><strong>Tamanho:</strong> {dados.size}</p>
      <p><strong>Descrição do Tamanho:</strong> {dados.size_description}</p>

      <div>
        <strong>Bonus de Atributos:</strong>
        <ul>
          {dados.ability_bonuses.map((bonus, index) => (
            <li key={index}>
              {bonus.ability_score.name}: +{bonus.bonus}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Proficiências Iniciais:</strong>
        <ul>
          {dados.starting_proficiencies.length > 0 ? (
            dados.starting_proficiencies.map((prof, index) => (
              <li key={index}>{prof.name}</li>
            ))
          ) : (
            <li>Nenhuma</li>
          )}
        </ul>
      </div>

      <div>
        <strong>Linguagens:</strong>
        <ul>
          {dados.languages.map((lang, index) => (
            <li key={index}>{lang.name}</li>
          ))}
        </ul>
        <p><strong>Descrição das Linguagens:</strong> {dados.language_desc}</p>
      </div>

      <div>
        <strong>Traços:</strong>
        <ul>
          {dados.traits.length > 0 ? (
            dados.traits.map((trait, index) => (
              <li key={index}>{trait.name}</li>
            ))
          ) : (
            <li>Nenhum</li>
          )}
        </ul>
      </div>

      <div>
        <strong>Subraças:</strong>
        <ul>
          {dados.subraces.length > 0 ? (
            dados.subraces.map((subrace, index) => (
              <li key={index}>{subrace.name}</li>
            ))
          ) : (
            <li>Nenhuma</li>
          )}
        </ul>
      </div>
    </div>
  );
}
RacesDetalhes.propTypes = {
  dados: PropTypes.shape({
    name: PropTypes.string,
    speed: PropTypes.number,
    alignment: PropTypes.string,
    age: PropTypes.string,
    size: PropTypes.string,
    size_description: PropTypes.string,
    ability_bonuses: PropTypes.arrayOf(
      PropTypes.shape({
        ability_score: PropTypes.shape({
          name: PropTypes.string,
        }),
        bonus: PropTypes.number,
      })
    ),
    starting_proficiencies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    language_desc: PropTypes.string,
    traits: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    subraces: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};

export default RacesDetalhes;
