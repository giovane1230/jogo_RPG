import React, { useEffect, useMemo, useState } from "react";

// Contextos e componentes utilizados
import { useCharacter } from "../../context/CharacterContext";
import { useCombat } from "../../context/CombateContext";
import BarraStatus from "../../components/barsComponents/BarraStatus";
import DropComponent from "../../components/monsterComponents/dropComponent";
import CombatPotions from "../../components/combateComponents/combatPotions";
import xpLevels from "../../api/regras";
import SpellTolltip from "../../components/SpellsComponents/SpellsTooltip";
import CombatActions from "../../components/combateComponents/combatActions";
import BuffUtils from "../../components/buffDebuffsComponents/BuffUtils";
import TrocarDeArma from "../../components/combateComponents/trocarDeArma";
import { calcularCA } from "../../components/combateComponents/calcularCAUtils";
import MonsterDetail from "../../components/monsterComponents/MonsterDetail";
import { rolarDado } from "../../components/combateComponents/rolarDados";
import {
  ataqueJogador,
  ataqueJogadorOffHand,
  ataquePorBotao,
} from "../../components/combateComponents/turnoJogador";
import { turnoInimigoUtil } from "../../components/combateComponents/turnoInimigoUtil";
import { useNavigate } from "react-router-dom";

function CombatePage() {
  // Estado do combate
  const { character, setCharacter, updateCharacter } = useCharacter();
  const { enemy, setEnemyHP, enemyHP, setEnemy } = useCombat();

  const [mensagens, setMensagens] = useState([]); // Logs do combate
  const [combateFinalizado, setCombateFinalizado] = useState(false);
  const [dropReady, setDropReady] = useState(false);
  const [derrota, setDerrota] = useState(false);
  const [round, setRound] = useState(1);
  const [precisaRecarregar, setPrecisaRecarregar] = useState(true);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [trocarDeArma, setTrocaDeArma] = useState(false);
  const [motivoFinalizacao, setMotivoFinalizacao] = useState("");

  const navigate = useNavigate();

  // Se não houver inimigo, interrompe o combate
  if (!enemy) {
    return (
      <div>
        <p>Combate Interrompido, por favor escolha um novo inimigo.</p>
        <button onClick={() => console.log(enemy)}>CONSOLE</button>
        <button onClick={() => navigate("/treino")}>Escolher Inimigo</button>
      </div>
    );
  }

  // Cálculo de modificadores e Classe de Armadura (CA)
  const dexMod = character ? character.attributes.dex.mod : 0;
  const strMod = character ? character.attributes.str.mod : 0;

  const caFinal = useMemo(
    () => calcularCA(character.equipment, dexMod, character),
    [character.equipment, dexMod, character]
  );

  // Efeito que verifica se alguém morreu
  useEffect(() => {
    if (!combateFinalizado) {
      if (enemy.vidaAtual <= 0) {
        setCombateFinalizado(true); // evita chamadas múltiplas
        setCharacter((prev) => ({ ...prev, buff: {} }));
        finalizarCombate(true);
      } else if (character.vidaAtual <= 0) {
        setCombateFinalizado(true);
        finalizarCombate(false);
      }
    }
  }, [enemy.vidaAtual, character.vidaAtual, combateFinalizado]);

  // Função que finaliza o combate
  function finalizarCombate(jogadorVenceu, motivo = "") {
    setCombateFinalizado(true);
    setMotivoFinalizacao(motivo);

    if (motivo === "fuga") {
      setMensagens((prev) => [
        ...prev,
        { tipo: "sistema", texto: "Você fugiu do combate." },
      ]);
      return;
    }

    if (jogadorVenceu) {
      setMensagens((prev) => [
        ...prev,
        { tipo: "sistema", texto: `Você derrotou ${enemy.name}!` },
      ]);
    } else {
      // Penalidade por derrota: perda de 5% do ouro
      const ouroPerdido = Math.floor(character.gold / 20);
      setCharacter((prev) => ({
        ...prev,
        gold: character.gold - ouroPerdido,
      }));
      setMensagens((prev) => [
        ...prev,
        {
          tipo: "sistema",
          texto: `Você foi derrotado! E perdeu ${ouroPerdido} de ouro.`,
        },
      ]);
    }

    // Exibe drop se não morreu
    if (character.vidaAtual <= 0) {
      setDerrota(true);
      return;
    }
    setDropReady(true);
  }

  // Função de ataque
  function handleAtaquePorBotao() {
    ataquePorBotao({
      alvo: enemy,
      equipment: character.equipment,
      setPrecisaRecarregar,
      ataqueJogador: (dano) =>
        ataqueJogador({
          combateFinalizado,
          rolarDado,
          character,
          setEnemy,
          enemy,
          setMensagens,
          enemyHP,
          setTimeout,
          turnoInimigo,
          dano,
        }),
      ataqueJogadorOffHand: (dano) =>
        ataqueJogadorOffHand({
          combateFinalizado,
          rolarDado,
          character,
          enemy,
          setMensagens,
          setEnemyHP,
          dano,
        }),
      rolarDado,
    });
  }

  // Turno do inimigo
  function turnoInimigo() {
    turnoInimigoUtil({
      player: character,
      setPlayer: setCharacter,
      enemy,
      round,
      setRound,
      setMensagens,
      combateFinalizado,
      BuffUtils,
    });
  }

  // Função para recarregar arma
  const recarregarArma = () => {
    setPrecisaRecarregar(true);
    setMensagens((prev) => [
      ...prev,
      { tipo: "jogador", texto: "Você recarregou sua arma!" },
    ]);
    setTimeout(turnoInimigo, 1000);
  };

  // Resultado de tentativa de fuga
  const handleEscapeResult = (fugiu) => {
    if (fugiu) {
      setMensagens((prev) => [
        ...prev,
        { tipo: "sistema", texto: "Personagem escapou com sucesso!" },
      ]);
      setDerrota(true);
    } else {
      setMensagens((prev) => [
        ...prev,
        {
          tipo: "sistema",
          texto:
            "Tentou usar uma ação mas falhou e sofreu um ataque de oportunidade",
        },
      ]);
      setTimeout(turnoInimigo, 1000);
    }
  };

  // Quando falha em usar uma ação
  const iniciaTurnoInimigo = () => {
    setMensagens((prev) => [
      ...prev,
      {
        tipo: "jogador",
        texto: `Tentou usar uma ação mas falhou e sofreu um ataque de oportunidade`,
      },
    ]);
    setTimeout(turnoInimigo, 1000);
  };

  // Função para trocar de arma
  const TrocarDeArmaBtn = () => {
    if (trocarDeArma) {
      setTrocaDeArma(false);
      setMensagens((prev) => [
        ...prev,
        { tipo: "jogador", texto: "Você trocou de arma." },
      ]);
      setTimeout(turnoInimigo, 1000);
      return;
    }
    setTrocaDeArma(true);
  };

  function getArmaEquipada(equipamentos) {
    return (
      equipamentos.mainHand ||
      equipamentos["two-handed"] ||
      equipamentos.offHand ||
      null
    );
  }

  const arma = getArmaEquipada(character.equipment);

  return (
    <div>
      <h1>Combate</h1>

      {/* Detalhes do monstro */}
      <MonsterDetail monsterId={enemy.index} />

      {/* Botões para debug de vida */}
      <button onClick={() => updateCharacter({ vidaAtual: 1 })}>
        Jogador 1 HP
      </button>
      <button onClick={() => updateCharacter({ vidaAtual: 100000 })}>
        Jogador 100000 HP
      </button>
      <button onClick={() => setEnemy((prev) => ({ ...prev, vidaAtual: 1 }))}>
        enemy 1 HP
      </button>
      <button
        onClick={() => setEnemy((prev) => ({ ...prev, vidaAtual: 100000 }))}
      >
        enemy 100000 HP
      </button>
      <button onClick={() => console.log(enemy, enemy.vidaAtual)}>
        enemy console
      </button>
      <button onClick={() => console.log(character)}>char console</button>

      <button onClick={() => console.log("character", character.buff)}>
        Ver Buffs do Personagem
      </button>

      {/* Barras de status */}
      <BarraStatus
        label={character.name}
        valorAtual={character.vidaAtual}
        valorMaximo={character.vidaInicial || 100}
        CA={`| CA: ${caFinal}`}
        cor="blue"
      />

      {/* Exibe buffs ativos */}
      {character.buff && Object.keys(character.buff).length > 0 && (
        <ul>
          {Object.entries(character.buff).map(([nomeBuff, detalhes]) => (
            <li key={nomeBuff}>
              <strong>{nomeBuff}</strong>: CD = {detalhes.CD} | TE ={" "}
              {detalhes.timeEffect}
              {detalhes.penalidades && detalhes.penalidades.length > 0 && (
                <ul>
                  {detalhes.penalidades.map((penalidade, index) => (
                    <li key={index}>{penalidade}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Barra de vida inimigo */}
      <BarraStatus
        label={enemy.name}
        valorAtual={enemy.vidaAtual}
        valorMaximo={enemy.hit_points || 50}
        CA={`| CA: ${enemy.armor_class?.[0]?.value}`}
        cor="red"
      />

      {/* Barra de experiência */}
      <BarraStatus
        label="Experiência"
        valorAtual={character.exp}
        valorMaximo={xpLevels[character.nivel + 1]?.xp || 0}
        cor="yellow"
      />

      {/* Se o combate não finalizou, mostra controles */}
      {character.spells.length > 0 && (
        <p>
          <strong>Magias:</strong>{" "}
          <select
            onChange={(e) =>
              setSelectedSpell(
                character.spells.find((sp) => sp.index === e.target.value)
              )
            }
          >
            <option value="">Selecione uma magia</option>
            {character.spells.map((sp) => (
              <option key={sp.index} value={sp.index}>
                {sp.name}
              </option>
            ))}
          </select>
          {selectedSpell && (
            <span style={{ marginLeft: "8px" }}>
              <SpellTolltip spell={selectedSpell.index}>?</SpellTolltip>
            </span>
          )}
          <button
            onClick={() => selectedSpell}
            disabled={!selectedSpell}
            style={{ marginLeft: "8px" }}
          >
            Usar
          </button>
        </p>
      )}

      {!combateFinalizado && !trocarDeArma && (
        <div>
          {/* Potions e drop */}
          <CombatPotions
            setMensagens={setMensagens}
            setTimeout={setTimeout}
            turnoInimigo={turnoInimigo}
          />
          <button onClick={handleAtaquePorBotao}>
            {arma
              ? `Atacar com ${arma.name} (${
                  (arma.twoHandedDamage || arma.status)?.damage_dice
                } ${(arma.twoHandedDamage || arma.status)?.damage_type.name})`
              : "Atacar com Punho (1d4) "}
          </button>

          <CombatActions
            iniciaTurnoInimigo={iniciaTurnoInimigo}
            setMensagens={setMensagens}
            onEscapeAttempt={false}
            finalizarCombate={finalizarCombate}
          />
        </div>
      )}
      {!combateFinalizado && (
        <button onClick={TrocarDeArmaBtn}>
          {trocarDeArma ? "Confirmar Troca" : "Trocar de Arma"}
        </button>
      )}

      {trocarDeArma && (
        <TrocarDeArma
          character={character}
          setCharacter={setCharacter}
          onClose={() => setTrocaDeArma(false)}
        />
      )}
      {dropReady && motivoFinalizacao !== "fuga" && (
        <DropComponent CR={derrota ? "derrota" : enemy.challenge_rating} />
      )}
      <div>
        {mensagens
          .slice()
          .reverse()
          .map((msg, index) => (
            <div
              key={index}
              style={{
                backgroundColor: msg.tipo === "sistema" ? "#aac5ff" : "#d9adad",
                fontWeight: msg.tipo === "jogador" ? "bold" : "normal",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {msg.texto}
            </div>
          ))}
      </div>
      {combateFinalizado && motivoFinalizacao === "fuga" && (
        <button onClick={() => navigate("/treino")}>Sair</button>
      )}
    </div>
  );
}

export default CombatePage;
