export const fetchItems = async () => {
  const STORAGE_KEY = "sellerItems";

  const storedItems = localStorage.getItem(STORAGE_KEY);
  if (storedItems) {
    return JSON.parse(storedItems);
  }

  try {
    const response = await fetch("https://www.dnd5eapi.co/api/equipment");
    const data = await response.json();

    // Sorteia 20 itens aleatórios
    const shuffledItems = data.results.sort(() => Math.random() - 0.5).slice(0, 20);

    const itemsWithDetails = await Promise.all(
      shuffledItems.map(async (item) => {
        const itemResponse = await fetch(`https://www.dnd5eapi.co${item.url}`);
        const itemData = await itemResponse.json();

        return {
          index: item.index,
          name: item.name,
          price: itemData.cost?.quantity || 0,
          url: item.url,
          type: itemData.equipment_category?.name?.toLowerCase() || "unknown",
          category: itemData.weapon_category || itemData.armor_category || "Misc",
          status: itemData?.damage || itemData.armor_class?.base || "Misc",
          bonusDex: itemData.armor_class?.dex_bonus ?? null,
          properties: itemData.properties || null,
          twoHandedDamage: itemData.two_handed_damage || null,
          strengthRequirement: itemData.str_minimum || null,
          stealthDisadvantage: itemData.stealth_disadvantage ? "Yes" : "No",
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
