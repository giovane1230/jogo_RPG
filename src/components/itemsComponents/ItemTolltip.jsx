import React, { useEffect, useState } from "react";

const ItemTooltip = ({ item, isMagic = false, children }) => {
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show || !item) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.dnd5eapi.co/api/${
            isMagic ? "magic-items" : "equipment"
          }/${item.index}`
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do item:", err);
      }
    };

    fetchDetails();
  }, [item, isMagic, show]);

  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: "relative", cursor: "help" }}
    >
      {children}
      {show && details && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: "0",
            zIndex: "999",
            backgroundColor: "#222",
            color: "#fff",
            padding: "10px",
            border: "1px solid #aaa",
            borderRadius: "6px",
            width: "300px",
          }}
        >
          <strong>{details.name}</strong>
          <br />
          {details.equipment_category && (
            <p>Categoria: {details.equipment_category.name}</p>
          )}
          {details.cost && (
            <p>
              Preço: {details.cost.quantity} {details.cost.unit}
            </p>
          )}
          {details.quantity && <p>Quantidade: {details.quantity} Un</p>}
          {details.desc && <p>{details.desc}</p>}
          {details.weight && <p>Peso: {details.weight} kg</p>}
          {details.rarity && <p>Raridade: {details.rarity.name}</p>}
          {details.damage && (
            <>
              <p>Dano: {details.damage.damage_dice}</p>
              <p>Tipo: {details.damage.damage_type.name}</p>
            </>
          )}{" "}
          {details.properties != "" && (
            <>
              <p>Propriedades: </p>
              <ul>
                {details.properties?.map((prop) => (
                  <li key={prop.index}>{prop.name}</li>
                ))}
              </ul>
            </>
          )}
          {details.two_handed_damage && (
            <>
              <p>Duas Mãos: {details.two_handed_damage.damage_dice}</p>
            </>
          )}
          {details.range && (
            <>
              <p>
                Distancia: {details.range.normal} - {details.range.long}{" "}
              </p>
            </>
          )}
          {details.str_minimum > 0 && (
            <>
              <p>Força Minima: {details.str_minimum}</p>
            </>
          )}
          {details.stealth_disadvantage && (
            <>
              <p>
                Desvantagem Furtiva :{" "}
                {details.stealth_disadvantage ? "Sim" : "Não"}
              </p>
            </>
          )}
          {details.armor_class && (
            <>
              <p>AC: {details.armor_class.base}</p>
              <p>
                Bônus de Destreza:{" "}
                {details.armor_class.dex_bonus ? "Sim" : "Não"}
                {details.armor_category === "Medium" && (
                  <>
                    <p>
                      Bônus de Destreza Maximo:{" (+"}
                      {details.armor_class.max_bonus}
                      {")"}
                    </p>
                  </>
                )}
              </p>
              <p>Tipo: {details.armor_category}</p>
            </>
          )}
          {details.desc.lenght > 0 &&
            details.desc?.map((prop) => <li key={prop.index}>{prop.name}</li>)}
          {details.special?.lenght > 0 &&
            details.special?.map((prop) => (
              <li key={prop.index}>{prop.name}</li>
            ))}
        </div>
      )}
    </span>
  );
};

export default ItemTooltip;
