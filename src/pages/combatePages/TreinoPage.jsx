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
      console.log(inimigoSelecionado);
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

  // Função utilitária para gerar uma cor baseada no índice
  const getColorByIndex = (idx) => {
    const colors = [
      "#FFB6C1", // rosa claro
      "#ADD8E6", // azul claro
      "#90EE90", // verde claro
      "#FFD700", // amarelo
      "#FFA07A", // salmão claro
      "#DDA0DD", // roxo claro
      "#F08080", // vermelho claro
      "#E0FFFF", // ciano claro
      "#FFE4B5", // bege claro
      "#B0E0E6", // azul-petróleo claro
    ];
    return colors[idx % colors.length];
  };

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
            <strong>AC:</strong> {inimigoSelecionado.armor_class[0].value}
          </p>
          <p>
            <strong>Desafio:</strong> {inimigoSelecionado.challenge_rating}
          </p>
          <p>
            <strong>Açoes:</strong>
          </p>
          <ul>
            {Array.isArray(inimigoSelecionado.actions) &&
              inimigoSelecionado.actions.map((act, idx) => (
                <li
                  key={idx}
                  style={{
                    background: getColorByIndex(idx),
                    padding: "4px",
                    borderRadius: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <strong>{act.name}</strong>

                  {act.attack_bonus !== undefined && (
                    <div>🎯 Bônus de Ataque: {act.attack_bonus}</div>
                  )}

                  {Array.isArray(act.damage) && act.damage.length > 0 && (
                    <>
                      <div>💥 Dano:</div>
                      <ul>
                        {act.damage.map((dmg, dmgIdx) => (
                          <li key={dmgIdx}>
                            {dmg.damage_type?.name || "Tipo desconhecido"} -{" "}
                            {dmg.damage_dice || "Sem dado"}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {act.dc && (
                    <>
                      <div>🧠 Salvaguarda:</div>
                      <ul>
                        <li>
                          {act.dc.dc_type?.name || "Atributo desconhecido"} - CD{" "}
                          {act.dc.dc_value || "?"} (
                          {act.dc.success_type === "half"
                            ? "Meio dano no sucesso"
                            : "Total ou nenhum"}
                          )
                        </li>
                      </ul>
                    </>
                  )}

                  {act.usage && (
                    <>
                      <div>♻️ Uso:</div>
                      <ul>
                        <li>
                          {act.usage.type} -{" "}
                          {act.usage.dice
                            ? `${act.usage.dice} (mínimo ${act.usage.min_value})`
                            : "sem dados"}
                        </li>
                      </ul>
                    </>
                  )}

                  {Array.isArray(act.actions) && act.actions.length > 0 && (
                    <>
                      <div>📦 Ações inclusas:</div>
                      <ul>
                        {act.actions.map((subAction, subIdx) => (
                          <li key={subIdx}>
                            {subAction.action_name} ×{subAction.count} (
                            {subAction.type})
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p style={{ marginTop: "4px" }}>{act.desc}</p>
                </li>
              ))}
          </ul>
        </div>
      )}

      {personagemSelecionado && (
        <div style={{ marginTop: "20px" }}>
          <h2>Seu Personagem: {personagemSelecionado.name || "Sem nome"}</h2>
          {personagemSelecionado.buff && Object.keys(personagemSelecionado.buff).length > 0 && (
            <ul>
              {Object.entries(personagemSelecionado.buff).map(
                ([nomeBuff, detalhes], idx) => (
                  <li
                    key={nomeBuff}
                    style={{
                      background: getColorByIndex(idx),
                      padding: "4px",
                      borderRadius: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    <strong>{nomeBuff}</strong>: CD = {detalhes.CD}, TE ={" "}
                    {detalhes.timeEffect}, {detalhes.desc}
                  </li>
                )
              )}
            </ul>
          )}
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
                {personagemSelecionado.spells.map((potion, idx) => (
                  <li
                    key={potion.index}
                    style={{
                      background: getColorByIndex(idx),
                      padding: "4px",
                      borderRadius: "4px",
                      marginBottom: "4px",
                    }}
                  >
                    <SpellTooltip spell={potion.index}>
                      {" "}
                      {potion.name}
                    </SpellTooltip>
                  </li>
                ))}
              </ul>
            </>
          )}
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
