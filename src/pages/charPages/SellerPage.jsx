import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { fetchItems } from "../../api/fetchItems"; // Função que busca os itens do vendedor

function SellerPage() {
  const { character, updateCharacter } = useCharacter();
  const [sellerItems, setSellerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");
  
    if (lastUpdate) {
      const interval = setInterval(() => {
        const timePassed = Date.now() - parseInt(lastUpdate, 10);
        const timeRemaining = 3600000 - timePassed;
        setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, []);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    // Verificar se os itens já estão armazenados no localStorage
    const storedItems = JSON.parse(localStorage.getItem("sellerItems"));
    const lastUpdate = localStorage.getItem("lastUpdate");

    // Se não houver itens ou se a hora for diferente da última atualização (1 hora atrás) = 3600000
    if (!storedItems || !lastUpdate || Date.now() - lastUpdate > 3600000) {
      setLoading(true);
      fetchItems()
        .then((items) => {
          setSellerItems(items);
          localStorage.setItem("sellerItems", JSON.stringify(items));
          localStorage.setItem("lastUpdate", Date.now());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao carregar os itens:", error);
          setLoading(false);
        });
    } else {
      setSellerItems(storedItems);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Se não houver item selecionado, não fazer nada
    if (!selectedItem) return;

    async function fetchItemDetails() {
      try {
        const res = await fetch(`https://www.dnd5eapi.co/api/equipment/${selectedItem.index}`);
        const data = await res.json();
        setItemDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    }

    fetchItemDetails();
  }, [selectedItem]);

  const handleBuy = (item) => {
    if (character.equipments.find((equip) => equip.index === item.index)) {
      alert("Você já possui esse item");
      return;
    }
    if (character.gold < item.price) {
      alert("Ouro insuficiente!");
      return;
    }

    const updatedEquipments = [...character.selectedEquipments, item];
    const currentGold = character.gold - item.price;

    updateCharacter({
      selectedEquipments: updatedEquipments,
      gold: currentGold,
    });

    // Remover o item comprado da lista de itens do vendedor
    const updatedItems = sellerItems.filter((sellerItem) => sellerItem.index !== item.index);
    setSellerItems(updatedItems);
  };

  const handleSell = (item) => {
    const updatedEquipments = character.selectedEquipments.filter(
      (equip) => equip.index !== item.index
    );
    const goldEarned = Math.floor(item.price / 1.3); // Arredonda para baixo
    const updatedGold = character.gold + goldEarned;
  
    updateCharacter({
      selectedEquipments: updatedEquipments,
      gold: updatedGold,
    });
  
    // Adiciona o item de volta na loja
    setSellerItems([...sellerItems, item]);
  };
  

  if (loading) {
    return <div>Carregando itens...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loja do Vendedor</h1>

      <div style={{ marginBottom: "10px" }}>
  <strong>Última atualização:</strong>{" "}
  {new Date(parseInt(localStorage.getItem("lastUpdate"))).toLocaleTimeString()}
</div>

<div style={{ marginBottom: "20px" }}>
  <strong>Próxima atualização dos itens em:</strong>{" "}
  {timeLeft > 0 ? formatTime(timeLeft) : "Atualizando..."}
</div>


      <div style={{ marginBottom: "20px" }}>
        <strong>Ouro atual:</strong> {character.gold} 🪙
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Sua Mochila:</h2>
        {character.selectedEquipments.length > 0 ? (
          <ul>
          {character.selectedEquipments.map((equip) => (
            <li key={equip.index}>
              {equip.name} (Preço: {equip.price} 🪙)
              <button onClick={() => handleSell(equip)}>Vender por {Math.floor(equip.price / 1.3)} 🪙</button>
              <button onClick={() => setSelectedItem(equip)}>Ver Detalhes</button>
        
              {/* Detalhes do item comprado */}
              {selectedItem?.index === equip.index && itemDetails && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                  <h3>Detalhes do Item:</h3>
                  <p><strong>Nome:</strong> {itemDetails.name}</p>
                  <p><strong>Preço:</strong> {itemDetails.cost?.quantity} {itemDetails.cost?.unit}</p>
                  <p><strong>Descrição:</strong> {itemDetails.desc}</p>
                  {itemDetails.weight && <p><strong>Peso:</strong> {itemDetails.weight}</p>}
                  {itemDetails.rarity && <p><strong>Raridade:</strong> {itemDetails.rarity}</p>}
                  {itemDetails.armor_class && (
                    <>
                      <p><strong>Classe de Armadura:</strong> {itemDetails.armor_class.base}</p>
                      <p><strong>Bônus de Destreza:</strong> {itemDetails.armor_class.dex_bonus ? "Sim" : "Não"}</p>
                    </>
                  )}
                  {itemDetails.damage && (
                    <>
                      <p><strong>Dano:</strong> {itemDetails.damage.damage_dice}</p>
                      <p><strong>Tipo de Dano:</strong> {itemDetails.damage.damage_type.name}</p>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>        
        ) : (
          <p>Mochila vazia.</p>
        )}
      </div>

      <h2>Itens à Venda:</h2>
      {Array.isArray(sellerItems) && (
        <ul>
          {sellerItems.map((item) => (
            <li key={item.index}>
              <span>{item.name} | Preço: {item.price} 🪙</span>
              <button onClick={() => handleBuy(item)}>Comprar</button>
              <button onClick={() => setSelectedItem(item)}>Ver Detalhes</button>

              {/* Mostrar detalhes do item selecionado */}
              {selectedItem?.index === item.index && itemDetails && (
                <div style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}>
                  <h3>Detalhes do Item:</h3>
                  <p><strong>Nome:</strong> {itemDetails.name}</p>
                  <p><strong>Preço:</strong> {itemDetails.cost?.quantity} {itemDetails.cost?.unit}</p>
                  <p><strong>Descrição:</strong> {itemDetails.desc}</p>
                  {itemDetails.weight && <p><strong>Peso:</strong> {itemDetails.weight}</p>}
                  {itemDetails.rarity && <p><strong>Raridade:</strong> {itemDetails.rarity}</p>}
                  {itemDetails.armor_class && (
                    <>
                      <p><strong>Classe de Armadura:</strong> {itemDetails.armor_class.base}</p>
                      <p><strong>Bônus de Destreza:</strong> {itemDetails.armor_class.dex_bonus ? "Sim" : "Não"}</p>
                    </>
                  )}
                  {itemDetails.damage && (
                    <>
                      <p><strong>Dano:</strong> {itemDetails.damage.damage_dice}</p>
                      <p><strong>Tipo de Dano:</strong> {itemDetails.damage.damage_type.name}</p>
                    </>
                  )}
                  {/* Aqui você pode adicionar mais campos conforme necessário */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SellerPage;
