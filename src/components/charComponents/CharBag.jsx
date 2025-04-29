import React, { useEffect, useState } from "react";
import SellerPage from "../../pages/charPages/SellerPage";

function CharBag() {
  const [character, setCharacter] = useState(() => {
    // Carrega os dados do localStorage na inicialização
    const savedData = localStorage.getItem('charData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    console.log(character)
  }, [character]);

  return (
    <>
      {/* Bloco da bolsa */}
      {character && (
        <section>
          <h3>BOLSA</h3>
          <ul>
            {Object.values(character.selectedEquipments ?? {})
              .flat()
              .map((item, index) => (
                <li key={item?.index || item?.name || index}>
                  {item?.name || item} !!
                </li>
              ))}
              {Object.values(character.equipments ?? {})
              .flat()
              .map((item, index) => (
                <li key={item?.index || item?.name || index}>
                  {item?.name || item} NOVO
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
