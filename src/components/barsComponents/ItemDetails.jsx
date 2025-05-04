import React from "react";

function ItemDetails({ item }) {
  if (!item) return null;
  return (
    <div
      style={{ marginTop: "10px", border: "1px solid #ccc", padding: "10px" }}
    >
      <h3>Detalhes do Item:</h3>
      <p>
        <strong>Nome:</strong> {item.name}
      </p>
      <p>
        <strong>Preço:</strong> {item.cost?.quantity} {item.cost?.unit}
      </p>
      <p>
        <strong>Descrição:</strong> {item.desc}
      </p>
      {item.weight && (
        <p>
          <strong>Peso:</strong> {item.weight}
        </p>
      )}
      {item.rarity && (
        <p>
          <strong>Raridade:</strong> {item.rarity}
        </p>
      )}
      {item.armor_class && (
        <>
          <p>
            <strong>Classe de Armadura:</strong> {item.armor_class.base}
          </p>
          <p>
            <strong>Bônus de Destreza:</strong>{" "}
            {item.armor_class.dex_bonus ? "Sim" : "Não"}
          </p>
        </>
      )}
      {item.damage && (
        <>
          <p>
            <strong>Dano:</strong> {item.damage.damage_dice}
          </p>
          <p>
            <strong>Tipo de Dano:</strong> {item.damage.damage_type.name}
          </p>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
