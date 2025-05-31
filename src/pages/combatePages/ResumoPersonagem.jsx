import React from "react";
import { useNavigate } from "react-router-dom";
import { useCharacter } from "../../context/CharacterContext";

function ResumoPersonagem({ character }) {
  const { updataCharacter } = useCharacter();
  const navigate = useNavigate();

  const handleAvancarParaCombate = () => {
    updataCharacter(character); // Salva o character no contexto
    navigate("/combate"); // Redireciona para a página de combate
  };

  return (
    <div>
      <h2>Resumo do character</h2>
      <p>Nome: {character.nome}</p>
      <p>Raça: {character.raca}</p>
      <p>Classe: {character.classe}</p>
      <p>Força: {character.atributos.str}</p>
      <p>Destreza: {character.atributos.dex}</p>
      <p>Constituição: {character.atributos.con}</p>
      <p>Inteligência: {character.atributos.int}</p>
      <p>Sabedoria: {character.atributos.wis}</p>
      <p>Carisma: {character.atributos.cha}</p>

      <button onClick={handleAvancarParaCombate}>Avançar para Combate</button>
    </div>
  );
}

export default ResumoPersonagem;
