import React, { useEffect, useState } from "react";
import DiceRollerMedium from "../../components/barsComponents/DiceRollerMedium";
import { useCharacter } from "../../context/CharacterContext";

function TestProeficiencia() {
  const [ultimoResultado, setUltimoResultado] = useState("-");
  const { character } = useCharacter();
  const [selected, setSelected] = useState("");

  const handleRoll = (resultado) => {
    console.log("Dado rolado:", resultado);
    setUltimoResultado(resultado);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="proficiency">Escolha uma proficiência:</label>
        <select
          id="proficiency"
          value={selected}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="">Sem Proeficiencia</option>
          {character?.selectedProficiencies?.["0"]?.map((prof, index) => (
            <option key={index} value={prof}>
              {prof}
            </option>
          ))}
        </select>
        <br />
        {selected && (
          <p style={{ marginTop: "10px" }}>
            Proficiência selecionada: <strong>{selected}</strong>
          </p>
        )}
        <span>
          {selected === ""
            ? `Seu resultado foi ${ultimoResultado}`
            : `Seu resultado foi ${ultimoResultado} ( +${ character.proficienciesBonus }) = ${
                ultimoResultado + character.proficienciesBonus
              }`}
        </span>
      </div>
      <div>
        <ul>
          {character?.selectedProficiencies?.["0"]?.map((skill, index) => (
            <li key={index}>
              {skill.replace("Skill: ", "")} ( +{character.proficienciesBonus} )
            </li>
          ))}
        </ul>
        <DiceRollerMedium sides={20} onRoll={handleRoll} />
      </div>
    </>
  );
}

export default TestProeficiencia;
