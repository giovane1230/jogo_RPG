import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { fetchAllEquipments } from "../../api/equipments";

function DropComponent({ CR }) {
  const { updateCharacter, character } = useCharacter();
  const [pegou, setPegou] = useState(false);
  const [itemRecompensa, setItemRecompensa] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);

  useEffect(() => {
    async function getItem() {
      if (!CR) return;

      setLoadingItem(true);

      try {
        const equipamentos = await fetchAllEquipments();
        const limiteValor = CR * 100;

        const filtrados = equipamentos.filter(
          (eq) =>
            eq.cost &&
            eq.cost.unit === "gp" &&
            eq.cost.quantity <= limiteValor
        );

        if (filtrados.length > 0) {
          const sorteado =
            filtrados[Math.floor(Math.random() * filtrados.length)];
          setItemRecompensa(sorteado);
        } else {
          setItemRecompensa(null);
        }
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
        setItemRecompensa(null);
      } finally {
        setLoadingItem(false);
      }
    }

    getItem();
  }, [CR]);

  const pegarRecompensa = () => {
    if (!CR) return;

    const formattedEquipment = itemRecompensa
      ? {
          index: itemRecompensa.index,
          name: itemRecompensa.name,
          price: itemRecompensa.cost?.quantity ?? 0,
          url: itemRecompensa.url,
          type: itemRecompensa.equipment_category.index,
          category: itemRecompensa.weapon_category
            ? itemRecompensa.weapon_category
            : itemRecompensa.armor_category
            ? itemRecompensa.armor_category
            : null,
          status: itemRecompensa.weapon_category
            ? itemRecompensa.damage?.damage_dice ?? null
            : itemRecompensa.armor_category
            ? itemRecompensa.armor_class?.base ?? null
            : null,
          bonusDex: itemRecompensa.armor_category
            ? itemRecompensa.armor_class?.dex_bonus ?? null
            : null,
        }
      : null;

    updateCharacter({
      exp: character.exp + CR * 10,
      selectedEquipments: formattedEquipment
        ? [...(character.selectedEquipments || []), formattedEquipment]
        : [...(character.selectedEquipments || [])],
    });

    setPegou(true);
  };

  if (!CR) return null;

  return (
    <div>
      {!pegou ? (
        <>
          {loadingItem ? (
            <p>Carregando item de recompensa...</p>
          ) : (
            <>
              {itemRecompensa ? (
                <p>
                  Inimigo deixou cair:{" "}
                  <strong>{itemRecompensa.name}</strong> (
                  {itemRecompensa.cost.quantity}gp)
                </p>
              ) : (
                <p>Inimigo não deixou nenhum item.</p>
              )}
              <button onClick={pegarRecompensa}>Pegar Recompensa</button>
            </>
          )}
        </>
      ) : (
        <p>
          Você ganhou {CR * 10} XP
          {itemRecompensa && (
            <>
              {" "}
              e <strong>{itemRecompensa.name}</strong>!
            </>
          )}
        </p>
      )}
    </div>
  );
}

export default DropComponent;
