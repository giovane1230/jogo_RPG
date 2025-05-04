// src/api/alquimistaApi.js
export async function fetchItems() {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/equipment-categories/potion');
      const data = await response.json();
  
      if (!data || !data.equipment) {
        console.error('Dados inesperados da API:', data);
        return []; // Retorna array vazio se a estrutura estiver errada
      }
  
      // Ordena os itens por nome
      const itensOrdenados = data.equipment.sort((a, b) => a.name.localeCompare(b.name));
  
      // Busca detalhes de cada item individual
      const detalhes = await Promise.all(itensOrdenados.map(async (item) => {
        const itemResponse = await fetch(`https://www.dnd5eapi.co${item.url}`);
        return await itemResponse.json();
      }));
  
      return detalhes;
    } catch (error) {
      console.error('Erro ao buscar poções da API:', error);
      return []; // Evita que o erro quebre a aplicação
    }
  }
  