export const fetchItems = async () => {
  const STORAGE_KEY = "sellerItems"; // agora igual ao usado no SellerPage

  // Verificar se há itens já salvos
  const storedItems = localStorage.getItem(STORAGE_KEY);
  if (storedItems) {
    return JSON.parse(storedItems);
  }

  try {
    const response = await fetch("https://www.dnd5eapi.co/api/equipment");
    const data = await response.json();

    const shuffledItems = data.results.sort(() => Math.random() - 0.5).slice(0, 10);

    const itemsWithDetails = await Promise.all(
      shuffledItems.map(async (item) => {
        const itemResponse = await fetch(`https://www.dnd5eapi.co${item.url}`);
        const itemData = await itemResponse.json();

        const price = itemData.cost?.quantity || 0;
        const type = itemData.equipment_category?.name?.toLowerCase() || "unknown";
        const category = itemData.weapon_category || itemData.armor_category || "Misc";
        const itemStatus = itemData.damage?.damage_dice || itemData.armor_class?.base || "Misc";
        const bonusDex = itemData.armor_class?.dex_bonus ?? null;

        return {
          index: item.index,
          name: item.name,
          price: price,
          url: item.url,
          type: type,
          category: category,
          status: itemStatus,
          bonusDex: bonusDex,
        };
      })
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsWithDetails));
    return itemsWithDetails;
  } catch (error) {
    console.error("Erro ao buscar itens da API:", error);
    return [];
  }
};
