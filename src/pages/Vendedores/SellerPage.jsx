import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { fetchItems } from "../../api/fetchItems";
import ItemTooltip from "../../components/itemsComponents/ItemTolltip";
import useConsolidarItens from "../../components/itemsComponents/removeDuplicatas";

function SellerPage() {
  const { character, updateCharacter } = useCharacter();
  const [sellerItems, setSellerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const itensConsolidados = useConsolidarItens(character.bag || []);
  const itensConsolidadosSeller = useConsolidarItens(sellerItems || []);

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
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  useEffect(() => {
    // Verificar se os itens já estão armazenados no localStorage
    const storedItems = JSON.parse(localStorage.getItem("sellerItems"));
    const lastUpdate = localStorage.getItem("MercadorlastUpdate");

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
        const res = await fetch(
          `https://www.dnd5eapi.co/api/equipment/${selectedItem.index}`
        );
        const data = await res.json();
        setItemDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    }

    fetchItemDetails();
  }, [selectedItem]);

  const handleBuy = (item) => {
    // if (character.bag.find((equip) => equip.index === item.index)) {
    //   alert("Você já possui esse item");
    //   return;
    // }

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

    updateCharacter(updatedCharacter);
    localStorage.setItem("charData", JSON.stringify(updatedCharacter)); // <- Aqui

    const updatedItems = sellerItems.filter(
      (sellerItem) => sellerItem.index !== item.index
    );
    setSellerItems(updatedItems);
    localStorage.setItem("sellerItems", JSON.stringify(updatedItems)); // <- Aqui também
  };

  const handleSell = (item) => {
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

    updateCharacter(updatedCharacter);
    localStorage.setItem("charData", JSON.stringify(updatedCharacter)); // <- Aqui

    const updatedItems = [...sellerItems, item];
    setSellerItems(updatedItems);
    localStorage.setItem("sellerItems", JSON.stringify(updatedItems)); // <- Aqui também
  };

  if (loading) {
    return <div>Carregando itens...</div>;
  }

  const testConsole = () => {
    localStorage.removeItem("lastUpdate");
    localStorage.removeItem("sellerItems");
    updateCharacter({
      gold: 1000000,
    });
    window.location.reload();
  };

  const itemInjetado = () => {
    const newItem = {
      index: "shieldInjetado",
      name: "Shield",
      price: 10,
      url: "/api/2014/equipment/shield",
      type: "armor",
      category: "Shield",
      status: 2,
      dex_bonus: false,
    };
    setSellerItems([...sellerItems, newItem]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loja do Mercador</h1>

      <div style={{ marginBottom: "10px" }}>
        <strong>Última atualização:</strong>{" "}
        {new Date(
          parseInt(localStorage.getItem("lastUpdate"))
        ).toLocaleTimeString()}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Próxima atualização dos itens em:</strong>{" "}
        {timeLeft > 0 ? formatTime(timeLeft) : "Atualizando..."}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Ouro atual:</strong> {character.gold} 🪙
      </div>
      <button onClick={itemInjetado}>injetar</button>
      <button onClick={testConsole}>GANHA DINHEIRO</button>
      <button onClick={() => console.log(itensConsolidados)}>
        CONSOLIDADEOSO
      </button>
      <div style={{ marginBottom: "20px" }}>
        <h2>Sua Mochila:</h2>
        {character.bag.length > 0 ? (
          <ul>
            {itensConsolidados.map((equip) => (
              <li key={equip.index}>
                <ItemTooltip item={equip}>
                  <span>
                    {equip.name} x{equip.quantity}
                  </span>
                </ItemTooltip>
                <button onClick={() => handleSell(equip)}>
                  Vender por {Math.floor(equip.price / 1.3)} 🪙
                </button>
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
          {itensConsolidadosSeller.map((equip) => (
            <li key={equip.index}>
              <ItemTooltip item={equip}>
                <span>
                  {equip.name} x{equip.quantity}
                </span>
              </ItemTooltip>
              <button onClick={() => handleBuy(equip)}>
                {" "}
                Comprar por {Math.floor(equip.price)} 🪙
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SellerPage;
