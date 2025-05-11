import React, { useEffect, useState } from "react";
import { useCharEquip } from "../../context/charEquipContext";

const EquipmentSlots = () => {
  const [character, setCharacter] = useState(() => {
    const savedData = localStorage.getItem("charData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const { equipment, updateEquipment } = useCharEquip();

  if (!character || !character.bag) {
    return <p>Carregando personagem e itens...</p>;
  }

  useEffect(() => {
    localStorage.setItem("charEquip", JSON.stringify(equipment));
  }, [equipment]);

  const getItemSlot = (item) => {
    const category = (
      item.type ||
      item.equipment_category?.name ||
      ""
    ).toLowerCase();

    const itemIndex = item.index?.toLowerCase() || "";
    const itemName = item.name?.toLowerCase() || "";
    const itemCategory = item.category?.toLowerCase() || "";

    // Detecta escudo corretamente
    if (
      itemCategory === "shield" ||
      itemIndex.includes("shield") ||
      itemName.includes("shield")
    ) {
      return "shield";
    }

    if (
      ["light-armor", "medium-armor", "heavy-armor", "armor"].includes(category)
    )
      return "armor";

    if (item.properties?.some((prop) => prop.index === "two-handed")) {
      return "two-handed";
    }

    if (category === "weapon") return "weapon";

    if (
      [
        "arcane-foci",
        "druidic-foci",
        "holy-symbols",
        "staff",
        "wand",
        "rod",
        "focus",
      ].includes(category)
    )
      return "focus";

    if (category === "ring") return "ring";
    if (category === "wondrous-items") return "wondrousItem";

    return null;
  };

  const isProficient = (item) => {
    const profs = character.proficiencies.map((p) => p.name.toLowerCase());
    const itemName = item.name?.toLowerCase();
    const itemType = item.type?.toLowerCase(); // "armor", "weapon"
    let itemCategoryRaw = item.category?.toLowerCase() || "";
    let itemCategory = itemCategoryRaw;

    // Escudo é um caso à parte
    const isShield =
      item.index?.toLowerCase().includes("shield") ||
      itemCategoryRaw === "shield";

    if (isShield) {
      itemCategory = "shields"; // precisa estar escrito exatamente assim
    } else if (itemType === "armor") {
      if (["light", "medium", "heavy"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} armor`; // Ex: "heavy armor"
      }
    } else if (itemType === "weapon") {
      if (["simple", "martial"].includes(itemCategoryRaw)) {
        itemCategory = `${itemCategoryRaw} weapons`; // Ex: "simple weapons"
      }
    }

    const isProf =
      profs.includes(itemCategory) ||
      (profs.includes("all armor") && itemType === "armor" && !isShield) ||
      (profs.includes("all weapons") && itemType === "weapon") ||
      profs.includes(itemName);

    return isProf;
  };

  const updateEquipStorage = (newEquipment) => {
    updateEquipment(newEquipment); // atualiza para renderizar
    localStorage.setItem("charEquip", JSON.stringify(newEquipment)); // persiste
  };

  const equipItem = (item) => {
    const available = character.bag?.find((i) => i.name === item.name);
    if (!available) {
      alert("Você não possui esse item!");
      return;
    }

    if (!isProficient(item)) {
      alert(`Você não é proficiente com ${item.name}`);
      return;
    }

    const isTwoHanded = item.properties?.some((p) => p.index === "two-handed");
    const isVersatile = item.properties?.some((p) => p.index === "versatile");
    const slot = getItemSlot(item);

    const currentWeapon = equipment.weapon;
    const isShield = equipment.shield;
    const offHand = equipment.offHand;
    const isSameWeaponEquipped =
      currentWeapon?.name === item.name || isShield?.name === item.name;
    const usingTwoHandedWeapon = equipment["two-handed"];
    const usingOffHand = equipment["offHand"];

    // Impede equipar mesma arma duas vezes
    if (isSameWeaponEquipped) {
      alert("Você não pode equipar a mesma arma duas vezes.");
      return;
    }

    // Armas de duas mãos
    if (isTwoHanded) {
      if (currentWeapon || offHand) {
        alert("Você precisa das duas mãos livres para usar esta arma.");
        return;
      }
      updateEquipStorage({
        ...equipment,
        "two-handed": item,
        weapon: null,
        shield: null,
      });
      return;
    }

    // Armas versáteis — escolher 1 ou 2 mãos
    if (isVersatile) {
      const usarDuasMaos = window.confirm(
        `${item.name} é versátil. Deseja equipar com DUAS mãos?`
      );
      if (usarDuasMaos) {
        if (currentWeapon || offHand) {
          alert(
            "Você precisa das duas mãos livres para usar esta arma em modo duas mãos."
          );
          return;
        }
        updateEquipStorage({
          ...equipment,
          "two-handed": item,
          weapon: null,
          shield: null,
        });
        return;
      } else {
        // Equipar como arma de uma mão
        if (!currentWeapon) {
          updateEquipStorage({
            ...equipment,
            weapon: item,
          });
          return;
        } else if (!isShield && !usingTwoHandedWeapon) {
          updateEquipStorage({
            ...equipment,
            shield: item,
          });
          return;
        } else {
          alert("Não é possível equipar esta arma agora.");
          return;
        }
      }
    }

    // Armas de uma mão
    if (slot === "weapon") {
      if (usingTwoHandedWeapon) {
        alert("Você está usando uma arma de duas mãos. Remova-a primeiro.");
        return;
      }

      if (!currentWeapon) {
        updateEquipStorage({
          ...equipment,
          weapon: item,
        });
      } else if (!isShield) {
        updateEquipStorage({
          ...equipment,
          offHand: item,
        });
      } else {
        alert("Ambas as mãos estão ocupadas.");
      }
      return;
    }

    // Escudo
    if (slot === "shield") {
      if (usingTwoHandedWeapon) {
        alert("Você não pode usar um escudo com uma arma de duas mãos.");
        return;
      }
      if (usingOffHand) {
        alert("Você não pode usar um escudo com duas armas.");
        return;
      }
      updateEquipStorage({
        ...equipment,
        shield: item,
      });
      return;
    }

    // Anéis
    if (slot === "ring") {
      if (equipment.ring.length >= 2) {
        alert("Você só pode usar até 2 anéis.");
        return;
      }
      updateEquipStorage({
        ...equipment,
        ring: [...equipment.ring, item],
      });
      return;
    }

    // Outros itens (armadura, etc.)
    updateEquipStorage({
      ...equipment,
      [slot]: item,
    });
  };

  const unequipItem = (slot) => {
    if (!equipment[slot]) {
      alert("Nenhum item equipado nesse slot.");
      return;
    }

    const updatedEquipment = { ...equipment };
    updatedEquipment[slot] = slot === "ring" ? [] : null;

    updateEquipStorage(updatedEquipment);
  };

  const renderAvailableItems = (slotType) => {
    if (!character?.bag) {
      return null;
    }

    const filtered = character.bag.filter(
      (item) => getItemSlot(item) === slotType
    );

    if (filtered.length === 0)
      return <p>Nenhum item disponível para {slotType}</p>;

    return filtered.map((item, i) => (
      <div key={i}>
        {item.name}
        <button onClick={() => equipItem(item)}>Equipar</button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Equipamentos</h2>

      <div>
        <h3>Armadura</h3>
        {equipment.armor ? (
          <div>
            {equipment.armor.name}
            <button onClick={() => unequipItem("armor")}>Remover</button>
          </div>
        ) : (
          <>{renderAvailableItems("armor")}</>
        )}
      </div>
      <div>
        <h3>Mão direita</h3>
        {equipment["two-handed"] ? (
          <div>
            {equipment["two-handed"].name}
            <button onClick={() => unequipItem("two-handed")}>Remover</button>
          </div>
        ) : (
          <>{renderAvailableItems("two-handed")}</>
        )}

        {!equipment["two-handed"] && equipment.weapon ? (
          <div>
            {equipment.weapon.name}
            <button onClick={() => unequipItem("weapon")}>Remover</button>
          </div>
        ) : (
          <>{!equipment["two-handed"] && renderAvailableItems("weapon")}</>
        )}
      </div>
      <div>
        <h3>Mão Esquerda</h3>
        {equipment.offHand ? (
          <div>
            {equipment.offHand.name}{" "}
            <button onClick={() => unequipItem("offHand")}>Remover</button>
          </div>
        ) : (
          renderAvailableItems("weapon")
        )}

        <h3>Escudo</h3>
        {equipment.shield ? (
          <div>
            {equipment.shield.name}

            <button onClick={() => unequipItem("shield")}>Remover</button>
          </div>
        ) : (
          <>{renderAvailableItems("shield")}</>
        )}
      </div>

      {/* Repita esse bloco para outras categorias */}
      <div>
        <h3>Anéis</h3>
        {equipment.ring.map((ring, i) => (
          <div key={i}>
            {ring.name}
            <button onClick={() => unequipItem("ring", i)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSlots;
