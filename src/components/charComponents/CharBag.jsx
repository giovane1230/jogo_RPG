import React, { useEffect, useState } from "react";
import EquipmentSlots from "../bagComponents/EquipmentSlots";

function CharBag() {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem('charData');
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
        const res = await fetch(`https://www.dnd5eapi.co/api/equipment/${selectedItem.index}`);
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
        const res = await fetch(`https://www.dnd5eapi.co/api/magic-items/${selectedPotion.index}`);
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
    {character.selectedEquipments.length > 0 ? (
      <ul>
      {character.selectedEquipments.map((equip) => (
        <li key={equip.index}>
          {equip.name}
          <br/>
          <button onClick={() => setSelectedItem(equip)}>Ver Detalhes</button>
    
          {/* Detalhes do item comprado */}
          {selectedItem?.index === equip.index && itemDetails && (
            <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
              <h3>Detalhes do Item:</h3>
              <p><strong>Nome:</strong> {itemDetails.name}</p>
              <p><strong>Categoria:</strong> {itemDetails.equipment_category.name}</p>
              <p><strong>Preço:</strong> {itemDetails.cost?.quantity} {itemDetails.cost?.unit}</p>
              <p><strong>Descrição:</strong> {itemDetails.desc}</p>
              {itemDetails.weight && <p><strong>Peso:</strong> {itemDetails.weight}</p>}
              {itemDetails.rarity && <p><strong>Raridade:</strong> {itemDetails.rarity}</p>}
              {itemDetails.armor_class && (
                <>
                  <p><strong>Tipo de Armadura:</strong> {itemDetails.armor_category}</p>
                  <p><strong>Classe de Armadura:</strong> {itemDetails.armor_class.base}</p>
                  <p><strong>Bônus de Destreza:</strong> {itemDetails.armor_class.dex_bonus ? "Sim" : "Não"}</p>
                </>
              )}
              {itemDetails.damage && (
                <>
                  <p><strong>Dano:</strong> {itemDetails.damage.damage_dice}</p>
                  <p><strong>Tipo de Dano:</strong> {itemDetails.damage.damage_type.name}</p>
                </>
              )}
              <p><strong>Peso:</strong> {itemDetails.weight} KG</p>
            </div>
          )}
        </li>
      ))}
    </ul>        
    ) : (
      <p>Sem equipamentos.</p>
    )}
            {character.potions.length > 0 ? (
          <ul>
            {character.potions.map((equip) => (
              <li key={equip.index}>
                {equip.name}

                {/* Detalhes do item comprado */}
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
  </div>
  );
}

export default CharBag;