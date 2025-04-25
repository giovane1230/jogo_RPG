import React, { useEffect, useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useNavigate } from "react-router-dom";
import sellerMok from "../../api/sellerMok";

function SellerPage() {
    const { character, updateCharacter } = useCharacter(); // <-- Aqui!
    const navigate = useNavigate();
    const [sellerMokInt, setSellerMokInt] = useState([...sellerMok]);

    useEffect(() => {
        if (!character) {
            navigate("/");
        }
    }, [character, navigate]);

    const handleBuy = (item) => {
        if (character.gold < item.price) {
            alert("Ouro insuficiente!");
            return;
        }

        const updatedSeller = sellerMokInt.filter((i) => i.index !== item.index);
        setSellerMokInt(updatedSeller);

        const updatedselectedEquipments = [...character.selectedEquipments, item];
        const currentGold = character.gold - item.price;

        updateCharacter({
            gold: currentGold,
            selectedEquipments: updatedselectedEquipments,
        });
    };

    return (
        <>
            {Array.isArray(sellerMokInt) && (
                <ul>
                    {sellerMokInt.map((item) => (
                        <li key={item.id || item.name}>
                            <span>{item.name} | preço: {item.price}</span>
                            <br />
                            <button onClick={() => handleBuy(item)}>Comprar</button>
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default SellerPage;
