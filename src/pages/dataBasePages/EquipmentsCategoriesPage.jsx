import React, { useEffect, useState } from "react";
import EquipmentDetalhes from  "../../components/dataBaseComponents/EquipmentDetalhesDB";
import BtnVoltarDB from "../../components/dataBaseComponents/BtnVoltarDB";

function EquipmentCategoriesPage() {
  const [equipmentCategories, setEquipmentCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    async function fetchEquipmentCategories() {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/2014/equipment-categories/");
        const data = await response.json();
        setEquipmentCategories(data.results);
      } catch (error) {
        console.error("Erro ao buscar equipmentCategories:", error);
      }
    }

    fetchEquipmentCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchCategoryDetails() {
      try {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/equipment-categories/${selectedCategory}`);
        const data = await response.json();
        setCategoryDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da equipmentCategory:", error);
      }
    }

    fetchCategoryDetails();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    setCategoryDetails(null); // limpa os dados antigos enquanto carrega os novos
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={console.log(categoryDetails)}>CONSOLE</button>
      <BtnVoltarDB /><br />
      <h1>Categorias de Equipamento:</h1>
      <select onChange={handleCategoryChange} value={selectedCategory} style={{ marginBottom: "20px" }}>
        <option value="">-- Selecione uma categoria --</option>
        {equipmentCategories.map((category) => (
          <option key={category.index} value={category.index}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <EquipmentDetalhes dados={categoryDetails} />
    </div>
  );
}

export default EquipmentCategoriesPage;
