import { useEffect } from "react";

function ShopManager({
  character,
  sellerItems,
  setSellerItems,
  updateCharacter,
}) {
  const saveToLocalStorage = (characterData, items) => {
    updateCharacter(characterData);

    localStorage.setItem("sellerItems", JSON.stringify(items));
  };

  const buyItem = (item) => {
    if (character.bag.find((equip) => equip.index === item.index)) {
      alert("Você já possui esse item");
    }

    if (character.gold < item.price) {
      alert("Ouro insuficiente!");
      return;
    }

    const updatedEquipments = [...character.bag, item];
    const currentGold = character.gold - item.price;

    const updatedCharacter = {
      ...character,
      bag: updatedEquipments,
      gold: currentGold,
    };

    const updatedItems = sellerItems.filter(
      (sellerItem) => sellerItem.index !== item.index
    );

    updateCharacter(updatedCharacter);
    setSellerItems(updatedItems);
    saveToLocalStorage(updatedCharacter, updatedItems);
  };

  const sellItem = (item) => {
    const updatedEquipments = character.bag.filter(
      (equip) => equip.index !== item.index
    );
    const goldEarned = Math.floor(item.price / 1.3);
    const updatedGold = character.gold + goldEarned;

    const updatedCharacter = {
      ...character,
      bag: updatedEquipments,
      gold: updatedGold,
    };

    const updatedItems = [...sellerItems, item];

    updateCharacter(updatedCharacter);
    setSellerItems(updatedItems);
    saveToLocalStorage(updatedCharacter, updatedItems);
  };

  return { buyItem, sellItem };
}

export default ShopManager;
