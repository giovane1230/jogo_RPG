import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EquipmentDetalhes({ dados }) {
  const [selectedEquipmentUrl, setSelectedEquipmentUrl] = useState("");
  const [equipmentDetails, setEquipmentDetails] = useState(null);

  useEffect(() => {
    // Limpa tudo se a categoria mudar
    setSelectedEquipmentUrl("");
    setEquipmentDetails(null);
  }, [dados]);

  useEffect(() => {
    if (!selectedEquipmentUrl) return;

    async function fetchEquipmentDetails() {
      try {
        const baseUrl = "https://www.dnd5eapi.co";
        const res = await fetch(`${baseUrl}${selectedEquipmentUrl}`);
        const data = await res.json();
        setEquipmentDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do equipamento:", err);
      }
    }

    fetchEquipmentDetails();
  }, [selectedEquipmentUrl]);

  if (!dados) return null;

  return (
    <div>
      <label>Equipamentos da Categoria:</label>
      <br />
      <select
        value={selectedEquipmentUrl}
        onChange={(e) => setSelectedEquipmentUrl(e.target.value)}
        style={{ margin: "10px 0" }}
      >
        <option value="">-- Selecione um equipamento --</option>
        {dados.equipment?.map((eq) => (
          <option key={eq.index} value={eq.url}>
            {eq.name}
          </option>
        ))}
      </select>

      {equipmentDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>Detalhes do Equipamento:</h3>
          <p><strong>Nome:</strong> {equipmentDetails.name}</p>
          {equipmentDetails.gearCategory && (
            <p><strong>Categoria:</strong> {equipmentDetails.gearCategory}</p>
          )}
          {equipmentDetails.equipment_category && (
             <p><strong>Categoria:</strong> {equipmentDetails.equipment_category.name}</p>
          )}
          {equipmentDetails.gear_category && (
            <p><strong>Subcategoria:</strong> {equipmentDetails.gear_category.name}</p>
          )}
          {equipmentDetails.weapon_category && (
            <p><strong>Categoria da arma: </strong>{equipmentDetails.weapon_category}</p>
          )}
          {equipmentDetails.damage && (
            <>
            <p><strong>Dado de dano: </strong>{equipmentDetails.damage.damage_dice}</p>
            <p><strong>Tipo de dano: </strong>{equipmentDetails.damage.damage_type.name}</p>
            </>
          )}
          {equipmentDetails.properties && (
            <p>
            <strong>Propriedades: </strong>
              {equipmentDetails.properties.map((e, index) => (
                <span key={index}>
                  {e.name}{index < equipmentDetails.properties.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          {equipmentDetails.range && (
            <p><strong>Distancia: </strong>{equipmentDetails.range.normal}m</p>
          )}
          {equipmentDetails.rarity && (
            <p><strong>Raridade:</strong> {equipmentDetails.rarity.name}</p>
          )}
          {equipmentDetails.variant && (	
            <p><strong>Variante:</strong> {equipmentDetails.variant ? "Sim" : "Não"}</p>
          )}
          {equipmentDetails.armor_category && (
            <>
            <p><strong>Categoria de Armadura:</strong> {equipmentDetails.armor_category}</p>
            <p><strong>Força minima: </strong>{equipmentDetails.str_minimum}</p>
            <p><strong>Desvantagem Furtiva: </strong>{equipmentDetails.stealth_disadvantage ? "Sim" : "Não"}</p>
            </>
          )}
          {equipmentDetails.armor_class && (
            <>
              <p><strong>Classe de Armadura:</strong> {equipmentDetails.armor_class.base}</p>
              <p><strong>Bônus de Destreza:</strong> {equipmentDetails.armor_class.dex_bonus ? "Sim" : "Não"}</p>
            </>
          )}
          {equipmentDetails.quantity && (
            <p><strong>Quantidade:</strong> {equipmentDetails.quantity}</p>
          )}
          {equipmentDetails.cost || 0 ? (
            <p><strong>Preço:</strong> {equipmentDetails.cost.quantity} {equipmentDetails.cost.unit}</p>
          ) : null}
          {equipmentDetails.weight || 0 ? (
            <p><strong>Peso:</strong> {equipmentDetails.weight}</p>
          ) : null}
          {equipmentDetails.desc && (
            <p><strong>Descrição:</strong> {equipmentDetails.desc}</p>
          )}
          {/* Adicione mais campos conforme necessário */}
          <Link to={`https://www.dnd5eapi.co${selectedEquipmentUrl}`} style={{ marginTop: "10px", display: "block" }}>
            Ver mais detalhes do equipamento
          </Link>
        </div>
      )}
    </div>
  );
}
EquipmentDetalhes.propTypes = {
  dados: PropTypes.shape({
    equipment: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default EquipmentDetalhes;
