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
    const updatedPotions = character.potions.filter(
      (equip) => equip.index !== item.index
    );

    // Atualiza o HP do jogador, considerando o efeito da poção
    const cura = item?.healing || 100;
  
    setPlayerHP(Math.min(playerHP + cura, character.vidaInicial));

    setCharacter({ ...character, potions: updatedPotions });
  }

  return (
    <div style={{ marginBottom: "8px" }}>
      {character.potions.length > 0 ? (
        <ul>
          {character.potions.map((potion) => (
            <li key={potion.index}>
              <ItemTooltip item={potion} isMagic={true}>
                <span>{potion.name}</span>
              </ItemTooltip>
              <button onClick={() => UsarPotion(potion)}>Usar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Mochila vazia.</p>
      )}
    </div>
  );
};

export default CombatPotions;
