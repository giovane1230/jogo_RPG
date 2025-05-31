import React, { useEffect, useMemo, useState } from "react";

import { useCharacter } from "../../context/CharacterContext";
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
import { useCombat } from "../../context/useCombat";

function CombatePage() {
  const { enemy, enemyHP, setEnemyHP } = useCombat();
  const { character, setCharacter } = useCharacter();

  const [mensagens, setMensagens] = useState([]);
  const [combateFinalizado, setCombateFinalizado] = useState(false);
  const [dropReady, setDropReady] = useState(false);
  const [derrota, setDerrota] = useState(false);
  const [round, setRound] = useState(1);
  const [precisaRecarregar, setPrecisaRecarregar] = useState(true);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [trocarDeArma, setTrocaDeArma] = useState(false);

  if (!enemy)
    return <p>Combate Interrompido, por favor saia desta página...</p>;

  const dexMod = character ? character.attributes.dex.mod : 0;
  const maxDexMod =
    character.attributes.dex.mod > 2 ? 2 : character.attributes.dex.mod;
  const strMod = character ? character.attributes.str.mod : 0;
  const caFinal = useMemo(
    () => calcularCA(character.equipment, dexMod, character),
    [character.equipment, dexMod, character]
  );

  useEffect(() => {
    if (!combateFinalizado) {
      if (enemyHP <= 0) {
        setPlayer((prev) => ({
          ...prev,
          buff: {},
        }));
        finalizarCombate(true);
      } else if (playerHP <= 0) {
        finalizarCombate(false);
      }
    }
  }, [enemyHP, playerHP, combateFinalizado]);

  function finalizarCombate(jogadorVenceu) {
    setCombateFinalizado(true);

    if (jogadorVenceu) {
      setMensagens((prev) => [
        ...prev,
        { tipo: "sistema", texto: `Você derrotou ${enemy.name}!` },
      ]);
    } else {
      // derrota: Ouro perdido (aqui 5% do max)
      const ouroPerdido = Math.floor(character.gold / 20);
      setCharacter((prev) => ({
        ...prev,
        gold: character.gold - Math.floor(character.gold / 20),
      }));
      setMensagens((prev) => [
        ...prev,
        {
          tipo: "sistema",
          texto: `Você foi derrotado! E perdeu ${ouroPerdido} de ouro.`,
        },
      ]);
    }

    // ativa o drop (loot) para renderizar
    if (character.vidaAtual <= 0) {
      setDerrota(true);
      return;
    }
    setDropReady(true);
  }

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

  function turnoInimigo() {
    turnoInimigoUtil({
      enemy,
      round,
      setRound,
      setMensagens,
      combateFinalizado,
      BuffUtils,
    });
  }

  const recarregarArma = () => {
    setPrecisaRecarregar(true);
    setMensagens((prev) => [
      ...prev,
      { tipo: "jogador", texto: "Você recarregou sua arma!" },
    ]);
    setTimeout(turnoInimigo, 1000);
  };

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
        { tipo: "sistema", texto: "Falhou na fuga, sofreu ataque!" },
      ]);
      setTimeout(turnoInimigo, 1000);
    }
  };

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

  const TrocarDeArmaBtn = () => {
    if (trocarDeArma) {
      const hasShield = !!character.equipment.shield;
      if (hasShield) {
        console.log("botou escudo CA:", character.cArmor);
      } else {
        console.log("tirou o escudo CA:", character.cArmor);
      }
      setTrocaDeArma(false);
      setMensagens((prev) => [
        ...prev,
        {
          tipo: "jogador",
          texto: `Trocou de arma`,
        },
      ]);
      setTimeout(turnoInimigo, 1000);
      return;
    }
    setTrocaDeArma(true);
  };

  return (
    <div>
      <h1>Combate</h1>
      <MonsterDetail monsterId={enemy.index} />
      <button onClick={() => character.vidaAtual(1)}>vida 1 player</button>
      <button onClick={() => character.vidaAtual(10000)}>
        vida 10000 player
      </button>
      <button onClick={() => setEnemyHP(1)}>vida 1 enemy</button>
      <button onClick={() => setEnemyHP(1000)}>vida 1000 enemy</button>

      {/* Status */}
      <button onClick={() => console.log("player", character.buff)}>
        Ver Buffs do Player
      </button>
      <button onClick={() => console.log("character", character.buff)}>
        Ver Buffs do Personagem
      </button>

      <BarraStatus
        label={character.name}
        valorAtual={character.vidaAtual}
        valorMaximo={character.vidaInicial || 100}
        CA={`| CA: ${caFinal}`}
        cor="blue"
      />

      {/* Exibe buffs ativos do player, se houver */}
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

      <BarraStatus
        label={enemy.name}
        valorAtual={enemyHP}
        valorMaximo={enemy.hit_points || 50}
        CA={`| CA: ${enemy.armor_class?.[0]?.value}`}
        cor="red"
      />
      <BarraStatus
        label="Experiência"
        valorAtual={character.exp}
        valorMaximo={xpLevels[character.nivel + 1]?.xp || 0}
        cor="yellow"
      />

      {/* Se o combate não finalizou, mostra controles */}
      {character.spells && (
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
      {!combateFinalizado && !trocarDeArma ? (
        <>
          <strong>Poção:</strong> <CombatPotions />
          <h2>Ataques</h2>
          <p>
            Modificador de ataque: +
            {Math.max(
              character.attributes.dex.mod,
              character.attributes.str.mod
            )}
            <br />
            Proficiência: +{character.proficienciesBonus}
          </p>
          {!precisaRecarregar && (
            <button onClick={recarregarArma} disabled={precisaRecarregar}>
              Recarregar
            </button>
          )}
          <button
            onClick={() => handleAtaquePorBotao()}
            disabled={!precisaRecarregar}
          >
            Ataque Principal (
            {character.equipment.weapon
              ? `${character.equipment.weapon.status.damage_dice} ${character.equipment.weapon.name}`
              : character.equipment["two-handed"]?.twoHandedDamage
              ? `${character.equipment["two-handed"].twoHandedDamage?.damage_dice} ${character.equipment["two-handed"].name}`
              : character.equipment["two-handed"]
              ? `${character.equipment["two-handed"].status} ${character.equipment["two-handed"].name}`
              : "1D4"}
            )
            {character.equipment.offHand &&
              ` e secundaria + ${character.equipment.offHand.status} ${character.equipment.offHand.name}`}
          </button>
          <button onClick={() => handleAtaquePorBotao()}>Ataque Pesado</button>
          <div>
            <CombatActions
              onEscapeAttempt={handleEscapeResult}
              iniciaTurnoInimigo={iniciaTurnoInimigo}
            />
            <button onClick={TrocarDeArmaBtn}> Troca de arma </button>
            {combateFinalizado && (
              <>
                <p>Fugiu do combate</p>
                <button onClick={() => console.log("fuiug")}>fuga</button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <button onClick={TrocarDeArmaBtn}>Confirmar troca</button>
        </>
      )}
      {trocarDeArma && <TrocarDeArma />}
      {/* Loot / drop aparece sempre que o combate acabar */}
      {derrota && <DropComponent CR={"derrota"} />}
      {dropReady && <DropComponent CR={enemy.challenge_rating} />}

      {/* Mensagens de combate */}
      <div style={{ marginTop: 20 }}>
        <h2 style={{ textAlign: "center" }}>Mensagens</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {mensagens
            .slice()
            .reverse()
            .map((m, i) => {
              let corDeFundo = "#eee";
              let corTexto = "#000";
              let titulo = "";
              let emoji = "";

              if (m.tipo === "sistema") {
                corDeFundo = "#cce5ff"; // azul claro
                corTexto = "#004085";
                titulo = "Sistema";
                emoji = "⚙️";
              } else if (m.tipo === "jogador") {
                corDeFundo = "#d4edda"; // verde claro
                corTexto = "#155724";
                titulo = character.name;
                emoji = "🧙‍♂️";
              } else if (m.tipo === "inimigo") {
                corDeFundo = "#f8d7da"; // vermelho claro
                corTexto = "#721c24";
                titulo = enemy.name;
                emoji = "👹";
              } else if (m.tipo === "buff") {
                corDeFundo = "#rgb(24 217 197 / 73%)"; // vermelho claro
                corTexto = "#rgb(36 56 77)";
                titulo = "buffs";
                emoji = "✨";
              }

              return (
                <li
                  key={i}
                  style={{
                    backgroundColor: corDeFundo,
                    color: corTexto,
                    border: `1px solid ${corTexto}`,
                    borderRadius: "8px",
                    padding: "8px",
                    margin: "4px 8px",
                    textAlign: "left",
                    fontFamily: "monospace",
                    fontSize: "18px",
                  }}
                >
                  <strong>
                    {emoji} {titulo}:
                  </strong>{" "}
                  {m.texto}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default CombatePage;
