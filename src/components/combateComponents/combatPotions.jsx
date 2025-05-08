import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useCombat } from "../../context/CombateContext";

const CombatPotions = () => {
  const { character, setCharacter } = useCharacter();
  const [selectedPotion, setSelectedPotion] = useState(null);
  const [potionDetails, setPotionDetails] = useState(null);
  const { playerHP, setPlayerHP } = useCombat(1);

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

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

  function UsarPotion(item) {
    const updatedPotions = character.potions.filter(
      (equip) => equip.index !== item.index
    );

    setPlayerHP(playerHP + 100);
  }

  return (
    <div style={{ marginBottom: "8px" }}>
      {character.potions.length > 0 ? (
        <ul>
          {character.potions.map((equip) => (
            <li key={equip.index}>
              {equip.name}

              {/* Detalhes do item comprado */}
              <button onClick={() => UsarPotion(equip)}>Usar</button>
              <button onClick={() => setSelectedPotion(equip)}>
                Ver Detalhes
              </button>
              {selectedPotion?.index === equip.index && potionDetails && (
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  <h3>Detalhes do Item:</h3>
                  <p>
                    <strong>Nome:</strong> {potionDetails.name}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {potionDetails.desc}
                  </p>
                  {potionDetails.weight && (
                    <p>
                      <strong>Peso:</strong> {potionDetails.weight}
                    </p>
                  )}
                  {potionDetails.rarity && (
                    <p>
                      <strong>Raridade:</strong> {potionDetails.rarity.name}
                    </p>
                  )}
                  {potionDetails.armor_class && (
                    <>
                      <p>
                        <strong>Classe de Armadura:</strong>{" "}
                        {potionDetails.armor_class.base}
                      </p>
                      <p>
                        <strong>Bônus de Destreza:</strong>{" "}
                        {potionDetails.armor_class.dex_bonus ? "Sim" : "Não"}
                      </p>
                    </>
                  )}
                  {potionDetails.damage && (
                    <>
                      <p>
                        <strong>Dano:</strong>{" "}
                        {potionDetails.damage.damage_dice}
                      </p>
                      <p>
                        <strong>Tipo de Dano:</strong>{" "}
                        {potionDetails.damage.damage_type.name}
                      </p>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem poções.</p>
      )}
    </div>
  );
};

export default CombatPotions;
