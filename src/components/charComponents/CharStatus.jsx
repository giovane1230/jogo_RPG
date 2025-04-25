import React, { useEffect } from "react";
import "../../../styles/charCss/CharStatus.css";
import { useCharacter } from "../../context/CharacterContext";
import { useNavigate } from "react-router-dom";

function CharStats() {
  const { character } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    if (!character) {
      navigate("/");
    }
  }, [character, navigate]);

  return (
    <>
      {character && (
        <>
          <span>Força: {character.attributes.str}</span>
          <span>Destreza: {character.attributes.dex}</span>
          <span>Constituição: {character.attributes.con}</span>
          <span>Inteligência: {character.attributes.int}</span>
          <span>Sabedoria: {character.attributes.wis}</span>
          <span>Carisma: {character.attributes.cha}</span>
        </>
      )}
    </>
  );
}

export default CharStats;
