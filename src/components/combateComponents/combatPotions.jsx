import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useCombat } from "../../context/CombateContext";
import ItemTooltip from "../itemsComponents/ItemTolltip";

const CombatPotions = () => {
  const { character, setCharacter } = useCharacter();
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [potionDetails, setPotionDetails] = useState(null);
  const { playerHP, setPlayerHP } = useCombat();

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  useEffect(() => {
    if (!selectedPotion) return;

    async function fetchItemDetailsPotion() {
      try {
        const res = await fetch(
          `https://www.dnd5eapi.co/api/magic-items/${selectedPotion.index}`
        );
        const data = await res.json();
        setPotionDetails(data); // Armazena os detalhes da poção
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    }

    fetchItemDetailsPotion();
  }, [selectedPotion]);

  function UsarPotion(item) {
    if (item.quantity > 0) {
      const updatedPotions = character.potions.map((potion) =>
        potion.index === item.index
          ? { ...potion, quantity: potion.quantity - 1 } // Diminui a quantidade
          : potion
      );

      // Atualiza o HP do jogador, considerando o efeito da poção
      const cura = item?.healing || 100;
      setPlayerHP(Math.min(playerHP + cura, character.vidaInicial));

      setCharacter({ ...character, potions: updatedPotions });
    } else {
      alert("Você não tem mais dessa poção!");
    }
  }

  return (
    <div style={{ marginBottom: "8px" }}>
      {character.potions.length > 0 ? (
        <div>
          <select
            onChange={(e) =>
              setSelectedPotion(
                character.potions.find((potion) => potion.index === e.target.value)
              )
            }
          >
            <option value="">Selecione uma poção</option>
            {character.potions.map((potion) => (
              <option key={potion.index} value={potion.index}>
                {potion.name} - Quantidade: {potion.quantity}
              </option>
            ))}
          </select>
          {selectedPotion && (
            <span style={{ marginLeft: "8px" }}>
              <ItemTooltip item={selectedPotion} isMagic={true}>?</ItemTooltip>
            </span>
          )}
          <button
            onClick={() => selectedPotion && UsarPotion(selectedPotion)}
            disabled={!selectedPotion}
            style={{ marginLeft: "8px" }}
          >
            Usar
          </button>
        </div>
      ) : (
        <p>Mochila vazia.</p>
      )}
    </div>
  );
};

export default CombatPotions;
