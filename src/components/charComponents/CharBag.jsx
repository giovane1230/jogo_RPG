import React, { useEffect } from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useNavigate } from "react-router-dom";
import SellerPage from "../../pages/charPages/SellerPage";

function CharBag() {
  const { character } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    if (!character) {
      navigate("/");
    }
  }, [character, navigate]);

  return (
    <>
      {/* Bloco de vendedor */}
      <div style={{ marginBottom: "2rem" }}>
        <SellerPage />
      </div>

      {/* Bloco da bolsa */}
      {character && (
        <section>
          <h3>BOLSA</h3>
          <ul>
            {Object.values(character.selectedEquipments ?? {})
              .flat()
              .map((item, index) => (
                <li key={item?.index || item?.name || index}>
                  {item?.name || item}
                </li>
              ))}
          </ul>
          <h3>FIM DA BOLSA</h3>
        </section>
      )}
    </>
  );
}

export default CharBag;
