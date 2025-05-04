import React from "react";
import { useCombat } from "../../context/CombatContext";
import { useNavigate } from "react-router-dom";

function ResumoPersonagem({ personagem }) {
  const { setPlayer } = useCombat();
  const navigate = useNavigate();

  const handleAvancarParaCombate = () => {
    setPlayer(personagem); // Salva o personagem no contexto
    navigate("/combate"); // Redireciona para a página de combate
  };

  return (
    <div>
      <h2>Resumo do Personagem</h2>
      <p>Nome: {personagem.nome}</p>
      <p>Raça: {personagem.raca}</p>
      <p>Classe: {personagem.classe}</p>
      <p>Força: {personagem.atributos.str}</p>
      <p>Destreza: {personagem.atributos.dex}</p>
      <p>Constituição: {personagem.atributos.con}</p>
      <p>Inteligência: {personagem.atributos.int}</p>
      <p>Sabedoria: {personagem.atributos.wis}</p>
      <p>Carisma: {personagem.atributos.cha}</p>

      <button onClick={handleAvancarParaCombate}>Avançar para Combate</button>
    </div>
  );
}

export default ResumoPersonagem;
