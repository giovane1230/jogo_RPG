import React from "react";
import PropTypes from "prop-types";

function ClasseDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{dados.name}</h2>
      <p><strong>Hit Die:</strong> d{dados.hit_die}</p>

      <h3>Proeficiências:</h3>
      <ul>
        {dados.proficiency_choices.map((prof) => (
          <li key={prof.desc}>
            {prof.desc}
          </li>
        ))}
        {dados.proficiencies.map((prof) => (
          <li key={prof.index}>{prof.name}</li>
        ))}
      </ul>

      <h3>Equipamentos iniciais:</h3>
      <ul>
        {dados.starting_equipment.map((equip) => (
          <li key={equip.equipment.index}>
            {equip.equipment.name} (Quantidade: {equip.quantity})
          </li>
        ))}
      </ul>

      <h3>Equipamentos iniciais escolhas:</h3>
      <ul>
        {dados.starting_equipment_options.map((equip) => (
          <li key={equip.desc}>
            {equip.desc}
          </li>
        ))}
      </ul>

      <h3>Subclasses:</h3>
      <ul>
        {dados.subclasses.map((sub) => (
          <li key={sub.index}>{sub.name}</li>
        ))}
      </ul>

      <h3>Spell Casting:</h3>
      <ul>
      {dados.spellcasting?.info.map((spell) => (
        <li key={spell.name}>
          <strong>{spell.name}: </strong>
          {spell.desc}<br/><br/>
        </li>
      ))}
      </ul>
    </div>
  );
}
ClasseDetalhes.propTypes = {
  dados: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hit_die: PropTypes.number.isRequired,
    proficiency_choices: PropTypes.arrayOf(
      PropTypes.shape({
        desc: PropTypes.string.isRequired,
      })
    ).isRequired,
    proficiencies: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    starting_equipment: PropTypes.arrayOf(
      PropTypes.shape({
        equipment: PropTypes.shape({
          index: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    starting_equipment_options: PropTypes.arrayOf(
      PropTypes.shape({
        desc: PropTypes.string.isRequired,
      })
    ).isRequired,
    subclasses: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    spellcasting: PropTypes.shape({
      info: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          desc: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
};

export default ClasseDetalhes;
