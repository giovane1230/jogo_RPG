import React from "react";
import { useNavigate } from "react-router-dom";
import { useCharacter } from "../../context/CharacterContext";
import sellerMok from "../../api/sellerMok";

function SellerPage() {
  const { character, updateCharacter } = useCharacter();
  const navigate = useNavigate();
  const [sellerMokInt, setSellerMokInt] = React.useState([...sellerMok]);

  React.useEffect(() => {
    if (!character) {
      navigate("/");
    }
    if (character.gold === 0) {
        const updatedCharacter = { ...character, gold: 5 };
        updateCharacter(updatedCharacter);
    }
  }, [character, navigate]);

  const handleBuy = (item) => {
    if (character.equipments.find((equip) => equip.index === item.index)) {
      alert("Você já possui esse item");
      return;
    }
    if (character.gold < item.price) {
      alert("Ouro insuficiente!");
      return;
    }

    const updatedSeller = sellerMokInt.filter((i) => i.index !== item.index);
    setSellerMokInt(updatedSeller);

    const updatedEquipments = [...character.equipments, { ...item, uuid: crypto.randomUUID() }];

    const currentGold = character.gold - item.price;

    updateCharacter({
      equipments: updatedEquipments,
      gold: currentGold,
    });
  };

  const limpar = () => {
    updateCharacter({
      equipments: [],
    });
  };

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
              <li key={equip.uuid}>
                {equip.name} (Preço original: {equip.price})
              </li>
            ))}
          </ul>
        ) : (
          <p>Mochila vazia.</p>
        )}
      </div>

      <button onClick={limpar}>LIMPAR BOLSA</button>

      <h2>Itens à Venda:</h2>
      {Array.isArray(sellerMokInt) && (
        <ul>
          {sellerMokInt.map((item) => (
            <li key={item.index}>
              <span>{item.name} | preço: {item.price}</span>
              <br />
              <button onClick={() => handleBuy(item)}>Comprar</button>
              <br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SellerPage;
