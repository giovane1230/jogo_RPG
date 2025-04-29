import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { fetchItems } from "../../api/fetchItems"; // Função que busca os itens do vendedor

function SellerPage() {
  const { character, updateCharacter } = useCharacter();
  const [sellerItems, setSellerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // Para armazenar o item selecionado para detalhes
  const [itemDetails, setItemDetails] = useState(null); // Para armazenar os detalhes do item

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

    const updatedEquipments = [...character.equipments, item];
    const currentGold = character.gold - item.price;

    updateCharacter({
      equipments: updatedEquipments,
      gold: currentGold,
    });

    // Remover o item comprado da lista de itens do vendedor
    const updatedItems = sellerItems.filter((sellerItem) => sellerItem.index !== item.index);
    setSellerItems(updatedItems);
  };

  const limpar = () => {
    updateCharacter({
      equipments: [],
    });
  };

  if (loading) {
    return <div>Carregando itens...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loja do Vendedor</h1>

      <div style={{ marginBottom: "20px" }}>
        <strong>Ouro atual:</strong> {character.gold} 🪙
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Sua Mochila:</h2>
        {character.equipments.length > 0 ? (
          <ul>
            {character.equipments.map((equip) => (
              <li key={equip.index}>
                {equip.name} (Preço: {equip.price} 🪙)
              </li>
            ))}
          </ul>
        ) : (
          <p>Mochila vazia.</p>
        )}
      </div>

      <button onClick={limpar}>LIMPAR BOLSA</button>

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
