import React, { useState, useEffect } from "react";
import { useCombat } from "../../context/CombateContext";
import { useNavigate } from "react-router-dom";
import SpellTooltip from "../../components/SpellsComponents/SpellsTooltip";

function TreinoPage() {
  const { setPlayer, setEnemy, playerHP, setPlayerHP, player } = useCombat();
  const [monstros, setMonstros] = useState([]);
  const [inimigoSelecionado, setInimigoSelecionado] = useState(null);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarMonstros() {
      try {
        const resposta = await fetch("https://www.dnd5eapi.co/api/monsters");
        const data = await resposta.json();
        setMonstros(data.results);
      } catch (erro) {
        console.error("Erro ao buscar monstros:", erro);
      }
    }

    buscarMonstros();

    const personagemLocal = localStorage.getItem("charData");
    if (personagemLocal) {
      try {
        const personagem = JSON.parse(personagemLocal);
        setPersonagemSelecionado(personagem);
      } catch (erro) {
        console.error("Erro ao carregar personagem:", erro);
      } finally {
        setCarregando(false);
      }
    }
  }, []);

  const handleSelecionarInimigo = async (url) => {
    if (!url) return;
    try {
      const res = await fetch(`https://www.dnd5eapi.co${url}`);
      const data = await res.json();
      setInimigoSelecionado(data);
    } catch (erro) {
      console.error("Erro ao buscar detalhes do inimigo:", erro);
    }
  };

  const handleAvancarParaCombate = () => {
    const personagemLocal = localStorage.getItem("charData");
    if (!personagemLocal || !inimigoSelecionado) {
      alert("Você precisa ter um personagem criado e um inimigo selecionado.");
      return;
    }

    const personagem = JSON.parse(personagemLocal);
    setPlayer(personagem);
    setEnemy(inimigoSelecionado);
    navigate("/combate");
  };

  useEffect(() => {
    {
      carregando ? (
        <p>Carregando playerHP...</p>
      ) : playerHP === 0 ? (
        <button onClick={() => setPlayerHP(player / 1.5)}>RECURA VIDA</button>
      ) : null;
    }
  }, []);

  return (
    <div>
      <h1>Modo de Treino</h1>
      <p>Selecione um inimigo:</p>

      {carregando ? (
        <p>Carregando monstros...</p>
      ) : (
        <select
          onChange={(e) => handleSelecionarInimigo(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            -- Selecione um inimigo --
          </option>
          {monstros.map((monstro) => (
            <option key={monstro.index} value={monstro.url}>
              {monstro.name}
            </option>
          ))}
        </select>
      )}

      {inimigoSelecionado && (
        <div style={{ marginTop: "20px" }}>
          <h2>Inimigo Selecionado: {inimigoSelecionado.name}</h2>
          <p>
            <strong>HP:</strong> {inimigoSelecionado.hit_points}
          </p>
          <p>
            <strong>AC:</strong> {inimigoSelecionado.armor_class.value}
          </p>
          <p>
            <strong>Desafio:</strong> {inimigoSelecionado.challenge_rating}
          </p>
        </div>
      )}

      {personagemSelecionado && (
        <div style={{ marginTop: "20px" }}>
          <h2>Seu Personagem: {personagemSelecionado.name || "Sem nome"}</h2>
          <ul>
            {Object.entries(personagemSelecionado.buff).map(([nomeBuff, detalhes]) => (
              <li key={nomeBuff}>
                <strong>{nomeBuff}</strong>: CD = {detalhes.CD}, TE
                = {detalhes.timeEffect}, {detalhes.desc}
              </li>
            ))}
          </ul>
          <p>
            <strong>Vida:</strong> {playerHP}/
            {personagemSelecionado.vidaInicial}
          </p>
          <p>
            <strong>Classe:</strong> {personagemSelecionado.class?.name}
          </p>
          <p>
            <strong>Raça:</strong> {personagemSelecionado.race?.name}
          </p>
          <p>
            <strong>AC:</strong> {personagemSelecionado.cArmor}
          </p>
          {personagemSelecionado.spells && (
            <>
              <strong>Magias:</strong>{" "}
              <ul>
                {personagemSelecionado.spells.map((potion) => (
                  <li key={potion.index}>
                    <SpellTooltip spell={potion.index}>
                      {" "}
                      {potion.name}
                    </SpellTooltip>
                  </li>
                ))}
              </ul>
            </>
          )}
          {/* etc, dependendo de como está estruturado seu objeto */}
        </div>
      )}
      {playerHP <= 0 && (
        <button onClick={() => setPlayerHP(Math.floor(player.vidaInicial / 2))}>
          Se cure antes de iniciar o combate (50%)
        </button>
      )}
      <button
        disabled={!inimigoSelecionado || playerHP <= 0}
        onClick={handleAvancarParaCombate}
        style={{ marginTop: "20px" }}
      >
        Avançar para Combate
      </button>
    </div>
  );
}

export default TreinoPage;
