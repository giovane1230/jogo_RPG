import React, { useEffect, useRef, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { fetchAllEquipments } from "../../api/equipments";
import { useNavigate } from "react-router-dom";
import { useCombat } from "../../context/CombateContext";

function DropComponent({ CR }) {
  const { updateCharacter, character } = useCharacter();
  const [pegou, setPegou] = useState(false);
  const [itemRecompensa, setItemRecompensa] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const { playerHP } = useCombat();
  const navigate = useNavigate();

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }
  const hasDropped = useRef(false);

  useEffect(() => {
    async function getItem() {
      if (!CR || hasDropped.current) return;

      hasDropped.current = true;

      setLoadingItem(true);

      try {
        const equipamentos = await fetchAllEquipments();
        const limiteValor = CR * 100;

        const filtrados = equipamentos.filter(
          (eq) =>
            eq.cost && eq.cost.unit === "gp" && eq.cost.quantity <= limiteValor
        );

        const RNG = rolarDado(20);

        if (filtrados.length > 0 && RNG >= 10) {
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

    if (CR === "derrota") {
      updateCharacter({
        vidaAtual: 1,
      });
      setPegou(true);
      navigate("/treino");
      return;
    }

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
      exp: character.exp + Math.floor(CR * 10),
      gold: character.gold + Math.floor(CR * 10),
      bag: formattedEquipment
        ? [...(character.bag || []), formattedEquipment]
        : [...(character.bag || [])],
      vidaAtual: playerHP,
    });

    setPegou(true);
    navigate("/treino");
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
              {CR === "derrota" ? (
                <p>Você morreu e não recebe recompensa</p>
              ) : (
                <p>
                  Você ganhou {Math.floor(CR * 10)}⭐️ e {Math.floor(CR * 10)}
                </p>
              )}
              {itemRecompensa ? (
                <p>
                  Inimigo deixou cair: <strong>{itemRecompensa.name}</strong> (
                  {itemRecompensa.cost.quantity}gp)
                </p>
              ) : (
                <p>Inimigo não deixou nenhum item.</p>
              )}
              <button onClick={pegarRecompensa}>
                Pegar Recompensa e voltar
              </button>
            </>
          )}
        </>
      ) : (
        <p>
          Você ganhou {Math.floor(CR * 10)}⭐️ e {Math.floor(CR * 10)}🪙!
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
