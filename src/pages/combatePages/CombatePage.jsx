import React, { useEffect, useState } from "react";
import { useCombat } from "../../context/CombateContext";
import { useNavigate } from "react-router-dom";
import BarraStatus from "../../components/barsComponents/BarraStatus";

function CombatePage() {
  const { player, enemy } = useCombat();
  const navigate = useNavigate();

  const [playerHP, setPlayerHP] = useState(player?.vida || 100);
  const [enemyHP, setEnemyHP] = useState(enemy?.hit_points || 50);
  const [xp, setXp] = useState(player?.experiencia || 0);
  const [mensagens, setMensagens] = useState([]);
  const [logCombate, setLogCombate] = useState([]);
  const [combateFinalizado, setCombateFinalizado] = useState(false);

  useEffect(() => {
    if (enemyHP <= 0) {
      if (!combateFinalizado) {
        const xpGanho = enemy.challenge_rating || 2;
        const novaExperiencia = xp + xpGanho;

        setMensagens((prev) => [...prev, `Você derrotou ${enemy.name}! Experiencia ganha ${xpGanho}xp!`]);
        setCombateFinalizado(true);
        setXp(novaExperiencia);

        const personagem = {
          ...player,
          experiencia: novaExperiencia,
        };
        localStorage.setItem("personagemFinal", JSON.stringify(personagem));
      }
    } else if (playerHP <= 0) {
      if (!combateFinalizado) {
        setMensagens((prev) => [...prev, "Você foi derrotado!"]);
        setCombateFinalizado(true);
      }
    }
  }, [enemyHP, playerHP, combateFinalizado, xp]);

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  // Função para realizar o ataque e calcular o dano
  function ataqueJogador(dano) {
    if (combateFinalizado) return;

    const acerto = rolarDado(20);
    const sucesso = acerto >= enemy.armor_class[0].value;
    const critico = acerto === 20;

    if (critico) {
      setMensagens((prev) => [
        ...prev,
        `Você acertou o ataque CRITICO (20)! Causou ${dano*2} de dano ao ${enemy.name}.`,
      ]);
      setLogCombate((log) => [
        ...log,
        `Você rolou: ${acerto} (ataque bem-sucedido)`,
      ]);
      setEnemyHP((hp) => Math.max(0, hp - dano*2));
    } else if (sucesso) {
      setMensagens((prev) => [
        ...prev,
        `Você acertou o ataque com um roll de ${acerto}! Causou ${dano} de dano ao ${enemy.name}.`,
      ]);
      setLogCombate((log) => [
        ...log,
        `Você rolou: ${acerto} (ataque bem-sucedido)`,
      ]);
      setEnemyHP((hp) => Math.max(0, hp - dano));
    } else {
      setMensagens((prev) => [
        ...prev,
        `Você errou o ataque com um roll de ${acerto}!`,
      ]);
      setLogCombate((log) => [...log, `Você rolou: ${acerto} (ataque falhou)`]);
    }

    // Realiza o turno do inimigo após o ataque
    setTimeout(turnoInimigo, 1000);
  }

  // Função para ataque por botão
  function ataquePorBotao(tipo) {
    const dano = tipo === "leve" ? rolarDado(6) : rolarDado(12);
    ataqueJogador(dano);
  }

  // Função para o turno do inimigo
  function turnoInimigo() {
    if (!enemy.actions || enemy.actions.length === 0 || combateFinalizado)
      return;

    const ataque =
      enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
    const dadoStr = ataque.damage?.[0]?.damage_dice || "1d6";
    const lados = parseInt(dadoStr.split("d")[1]) || 6;
    const dano = rolarDado(lados);

    // Ataque do inimigo
    const acerto = rolarDado(20);
    const sucesso = acerto >= player.cArmor;

    if (sucesso) {
      const msg = `${enemy.name} acertou o ataque com um roll de ${acerto}! Causou ${dano} de dano!`;
      setMensagens((prev) => [...prev, msg]);
      setLogCombate((log) => [
        ...log,
        `${enemy.name} rolou: ${acerto} (ataque bem-sucedido)`,
      ]);
      setPlayerHP((hp) => Math.max(0, hp - dano));
    } else {
      const msg = `${enemy.name} errou o ataque com um roll de ${acerto}!`;
      setMensagens((prev) => [...prev, msg]);
      setLogCombate((log) => [
        ...log,
        `${enemy.name} rolou: ${acerto} (ataque falhou)`,
      ]);
    }
  }

  const testCon = () => {
    console.log(enemy);
    console.log(player);
  };

  return (
    <div>
      <button onClick={testCon}>xxxxxxxxx</button>
      <h1>Combate</h1>

      <BarraStatus
        label="Vida do Jogador"
        valorAtual={playerHP}
        valorMaximo={player.maxHp || 100}
        cor="green"
      />
      <BarraStatus
        label="Vida do Monstro"
        valorAtual={enemyHP}
        valorMaximo={enemy.hit_points || 50}
        cor="red"
      />
      <BarraStatus
        label="Experiência"
        valorAtual={xp}
        valorMaximo={100}
        cor="blue"
      />

      <p>
        <strong>Seu HP:</strong> {playerHP} - <strong>CA:</strong> {player.cArmor}
      </p>
      <p>
        <strong>{enemy.name} HP:</strong> {enemyHP} - <strong>CA:</strong> {enemy.armor_class[0].value}
        <br />

        Dificuldade: <strong>{enemy.challenge_rating}</strong>
      </p>
      

      {!combateFinalizado && (
        <div>
          <h2>Ataques:</h2>
          <button onClick={() => ataquePorBotao("leve")}>
            Ataque Leve (1d6)
          </button>
          <button onClick={() => ataquePorBotao("pesado")}>
            Ataque Pesado (1d12)
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h2>Mensagens:</h2>
        <ul>
          {mensagens.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>

      {combateFinalizado && (
        <button onClick={() => navigate("/treino")}>Voltar ao Treino</button>
      )}
    </div>
  );
}

export default CombatePage;
