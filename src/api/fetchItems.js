export const fetchItems = async () => {
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/2014/equipment");
      const data = await response.json();
  
      // Embaralhar a lista de itens e pegar os 10 primeiros
      const shuffledItems = data.results.sort(() => Math.random() - 0.5).slice(0, 10);
  
      // Mapear os itens e pegar o custo de cada um
      const itemsWithPrices = await Promise.all(
        shuffledItems.map(async (item) => {
          const itemResponse = await fetch(`https://www.dnd5eapi.co${item.url}`);
          const itemData = await itemResponse.json();
          
          const cost = itemData.cost ? itemData.cost.quantity : 0; // Verificar se existe o preço
          
          return {
            ...item,
            price: cost,  // Usando o preço direto da API
          };
        })
      );
  
      return itemsWithPrices;
    } catch (error) {
      console.error("Erro ao buscar itens da API:", error);
      return [];
    }
  };
  