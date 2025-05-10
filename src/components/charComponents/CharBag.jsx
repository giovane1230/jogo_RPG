import React, { useEffect, useState } from "react";
import EquipmentSlots from "../bagComponents/EquipmentSlots";
import ItemTooltip from "../itemsComponents/ItemTolltip";

function CharBag() {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem("charData");
    return savedData ? JSON.parse(savedData) : null;
  });
  const [itemDetails, setItemDetails] = useState(null);
  const [potionDetails, setPotionDetails] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPotion, setSelectedPotion] = useState(null);

  useEffect(() => {
    // Se não houver item selecionado, não fazer nada
    if (!selectedItem) return;

    async function fetchItemDetails() {
      try {
        const res = await fetch(
          `https://www.dnd5eapi.co/api/equipment/${selectedItem.index}`
        );
        const data = await res.json();
        setItemDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    }

    fetchItemDetails();
  }, [selectedItem]);

  useEffect(() => {
    // Se não houver item selecionado, não fazer nada
    if (!selectedPotion) return;

    async function fetchItemDetailsPotion() {
      try {
        const res = await fetch(
          `https://www.dnd5eapi.co/api/magic-items/${selectedPotion.index}`
        );
        const data = await res.json();
        setPotionDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    }

    fetchItemDetailsPotion();
  }, [selectedPotion]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <EquipmentSlots />
      <h2>Sua Mochila:</h2>
      {character.bag.length > 0 ? (
        <ul>
          {character.bag.map((equip) => (
            <li key={equip.index}>
              <ItemTooltip item={equip}>
                <span>{equip.name}</span>
              </ItemTooltip>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem equipamentos.</p>
      )}
      {character.potions.length > 0 ? (
        <ul>
          {character.potions.map((potion) => (
            <li key={potion.index}>
              <ItemTooltip item={potion} isMagic={true}>
                <span>{potion.name}</span>
              </ItemTooltip>
            </li>
          ))}
        </ul>
      ) : (
        <p>Mochila vazia.</p>
      )}
    </div>
  );
}

export default CharBag;
