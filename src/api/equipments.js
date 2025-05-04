// src/api/fetchAllEquipments.js

const API_BASE = "https://www.dnd5eapi.co/api";

export async function fetchAllEquipments() {
  try {
    // 1. Buscar a lista de equipamentos
    const listRes = await fetch(`${API_BASE}/equipment`);
    const listData = await listRes.json();

    const equipmentList = listData.results;

    // 2. Buscar os detalhes de cada equipamento individualmente (em paralelo)
    const detailsPromises = equipmentList.map(async (item) => {
      const res = await fetch(`https://www.dnd5eapi.co${item.url}`);
      return await res.json();
    });

    // 3. Esperar todos os dados serem carregados
    const allEquipments = await Promise.all(detailsPromises);

    return allEquipments;
  } catch (error) {
    console.error("Erro ao buscar equipamentos:", error);
    return [];
  }
}
