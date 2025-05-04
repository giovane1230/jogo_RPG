import React, { useEffect, useState } from "react";
import { useCombat } from "../../context/CombateContext";
import { useCharacter } from "../../context/CharacterContext";
import BarraStatus from "../../components/barsComponents/BarraStatus";
import DropComponent from "../../components/monsterComponents/dropComponent";
import { useCharEquip } from "../../context/charEquipContext";

function CombatePage() {
  const { player, enemy } = useCombat();
  const { character, setCharacter } = useCharacter();
  const { equipment } = useCharEquip();

  const [playerHP, setPlayerHP] = useState(player?.vida || 100);
  const [enemyHP, setEnemyHP] = useState(enemy?.hit_points || 50);
  const [mensagens, setMensagens] = useState([]);
  const [logCombate, setLogCombate] = useState([]);
  const [combateFinalizado, setCombateFinalizado] = useState(false);
  const [round, setRound] = useState(1);
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [potionDetails, setPotionDetails] = useState(null);

    useEffect(() => {
      // Se não houver item selecionado, não fazer nada
      if (!selectedPotion) return;
  
      async function fetchItemDetailsPotion() {
        try {
          const res = await fetch(`https://www.dnd5eapi.co/api/magic-items/${selectedPotion.index}`);
          const data = await res.json();
          setPotionDetails(data);
        } catch (err) {
          console.error("Erro ao buscar detalhes do item:", err);
        }
      }
  
      fetchItemDetailsPotion();
    }, [selectedPotion]);

  useEffect(() => {
    if (!combateFinalizado) {
      if (enemyHP <= 0) {
        finalizarCombate(true);
      } else if (playerHP <= 0) {
        finalizarCombate(false);
      }
    }
  }, [enemyHP, playerHP, combateFinalizado]);

  function finalizarCombate(jogadorVenceu) {
    setCombateFinalizado(true);

    if (jogadorVenceu) {
      const xpGanho = (enemy.challenge_rating || 1) * 10;

      setMensagens((prev) => [
        ...prev,
        `Você derrotou ${enemy.name}! Ganhou ${xpGanho} XP.`,
      ]);
    } else {
      setMensagens((prev) => [...prev, "Você foi derrotado!"]);
    }
  }

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  function ataqueJogador(dano) {
    if (combateFinalizado) return;

    const acerto = rolarDado(20);
    const sucesso = acerto + 5 > enemy.armor_class?.[0]?.value;
    const critico = acerto === 20;
    const danoTotal = critico ? dano * 2 : dano;

    setRound(round+1);
    setMensagens((prev) => [
      ...prev,
      ` ------------------------ ${round}° Rodada --------------------------`,
    ]);

    if (critico || sucesso) {
      setMensagens((prev) => [
        ...prev,
        `Você ${critico ? "acertou um CRÍTICO" : "acertou"} 🎲${acerto}(+5) = ${
          acerto + 5
        } Causou ⚔️${danoTotal}!`,
      ]);
      setLogCombate((log) => [...log, `Você rolou: ${acerto} (sucesso)`]);
      setEnemyHP((hp) => Math.max(0, hp - danoTotal));
    } else {
      setMensagens((prev) => [
        ...prev,
        `Você errou 🎲${acerto}(+5)=${acerto + 5}.`,
      ]);
      setLogCombate((log) => [...log, `Você rolou: ${acerto} (falha)`]);
    }

    if (enemyHP - danoTotal > 0) {
      setTimeout(turnoInimigo, 1000);
    }
  }

  function ataquePorBotao(tipo) {
    const DanoEquipado = equipment.weapon.status;
    const lados = parseInt(DanoEquipado.split("d")[1]) || 6;
    const dado = tipo === "leve" ? lados : 999999;
    const dano = rolarDado(dado);
    ataqueJogador(dano);
  }

  function UsarPotion(item) {
    setPlayerHP(playerHP + 100);
    const updatedPotions = character.potions.filter(
      (equip) => equip.index !== item.index
    );

    const updatedCharacter = {
      ...character,
      potions: updatedPotions,
    };

    setCharacter(updatedCharacter);
  }

  function turnoInimigo() {
    if (!enemy.actions || enemy.actions.length === 0 || combateFinalizado)
      return;

    const ataque =
      enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
    const dadoStr = ataque.damage?.[0]?.damage_dice || "1d6";
    const lados = parseInt(dadoStr.split("d")[1]) || 6;
    const dano = rolarDado(lados);

    const acerto = rolarDado(20);
    const critico = acerto === 20;
    const sucesso = acerto + 5 > player.cArmor;
    const danoTotal = critico ? dano * 2 : dano;

    if (sucesso) {
      setMensagens((prev) => [
        ...prev,
        `${enemy.name} ${
          critico ? "acertou um CRÍTICO" : "acertou"
        } com 🎲${acerto}(+5)=${acerto + 5}! Causou ⚔️${danoTotal}!`,
      ]);
      setLogCombate((log) => [
        ...log,
        `${enemy.name} rolou: ${acerto} (sucesso)`,
      ]);
      setPlayerHP((hp) => Math.max(0, hp - danoTotal));
    } else {
      setMensagens((prev) => [
        ...prev,
        `${enemy.name} errou com um roll de 🎲${acerto}(+5)=${acerto + 5}.`,
      ]);
      setLogCombate((log) => [
        ...log,
        `${enemy.name} rolou: ${acerto} (falha)`,
      ]);
    }
  }

  return (
    <div>
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
        valorAtual={character.exp}
        valorMaximo={100}
        cor="blue"
      />

      <p>
        <strong>Seu HP:</strong> {playerHP} - <strong>CA:</strong>{" "}
        {player.cArmor}
      </p>
      <p>
        <strong>{enemy.name} HP:</strong> {enemyHP} - <strong>CA:</strong>{" "}
        {enemy.armor_class?.[0]?.value}
      </p>
      <p>
        Dificuldade: <strong>{enemy.challenge_rating}</strong>
      </p>

      {!combateFinalizado && (
        <div>
          <h2>Ataques:</h2>
          {character.potions.length > 0 ? (
          <ul>
            {character.potions.map((equip) => (
              <li key={equip.index}>
                {equip.name}

                {/* Detalhes do item comprado */}
                <button onClick={() => UsarPotion(equip)}>Usar</button>
                <button onClick={() => setSelectedPotion(equip)}>Ver Detalhes</button>
                {selectedPotion?.index === equip.index && potionDetails && (
                  <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                    <h3>Detalhes do Item:</h3>
                    <p><strong>Nome:</strong> {potionDetails.name}</p>
                    {/* <p><strong>Preço de revenda:</strong> {Math.floor(calculatePriceByRarity(equip.rarity) / 1.3)}🪙</p> */}
                    <p><strong>Descrição:</strong> {potionDetails.desc}</p>
                    {potionDetails.weight && <p><strong>Peso:</strong> {potionDetails.weight}</p>}
                    {potionDetails.rarity && <p><strong>Raridade:</strong> {potionDetails.rarity.name}</p>}
                    {potionDetails.armor_class && (
                      <>
                        <p><strong>Classe de Armadura:</strong> {potionDetails.armor_class.base}</p>
                        <p><strong>Bônus de Destreza:</strong> {potionDetails.armor_class.dex_bonus ? "Sim" : "Não"}</p>
                      </>
                    )}
                    {potionDetails.damage && (
                      <>
                        <p><strong>Dano:</strong> {potionDetails.damage.damage_dice}</p>
                        <p><strong>Tipo de Dano:</strong> {potionDetails.damage.damage_type.name}</p>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Mochila vazia.</p>
        )}
          <button onClick={console.log("faz nada")}>xxx</button>
          <button onClick={() => ataquePorBotao("leve")}>
            Ataque Leve ({equipment.weapon.status})
          </button>
          <button onClick={() => ataquePorBotao("pesado")}>
            Ataque Pesado (10d12)
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h2>Mensagens:</h2>
        <ul>
          {mensagens
            .slice()
            .reverse()
            .map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
        </ul>
      </div>

      {combateFinalizado && <DropComponent CR={enemy.challenge_rating} />}
    </div>
  );
}

export default CombatePage;
