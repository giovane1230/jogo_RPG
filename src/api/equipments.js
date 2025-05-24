const API_BASE = "https://www.dnd5eapi.co/api";

export async function fetchEquipmentsByCategory(category = "weapon") {
  try {
    const response = await fetch(`${API_BASE}/equipment-categories/${category}`);
    const data = await response.json();
    return data.equipment; // [{ index, name, url }, ...]
  } catch (error) {
    console.error("Erro ao buscar equipamentos da categoria:", error);
    return [];
  }
}

export async function fetchRandomEquipmentsByCategory(category, quantidade = 10) {
  try {
    const equipamentos = await fetchEquipmentsByCategory(category);
    
    const sorteados = equipamentos
      .sort(() => Math.random() - 0.5)
      .slice(0, quantidade);

    const detalhes = await Promise.all(
      sorteados.map(async (item) => {
        const res = await fetch(`https://www.dnd5eapi.co${item.url}`);
        return await res.json();
      })
    );

    return detalhes;
  } catch (error) {
    console.error("Erro ao buscar equipamentos aleatórios:", error);
    return [];
  }
}
