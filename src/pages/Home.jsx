import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import personagemPronto from "../api/injetarChar";
import MonsterActionsPage from "./charPages/MonsterActionsPage";
import AllMonsterActions from "../components/monsterComponents/AllMonsterActions";
import MonsterAttacks from "../components/monsterComponents/MonsterAttacks";
import MonsterDetail from "../components/monsterComponents/MonsterDetail";

const Home = () => {
  const salvarNoLocalStorage = () => {
    localStorage.removeItem("charData");
    window.location.reload();
    localStorage.setItem("charData", JSON.stringify(personagemPronto));
    alert("Personagem salvo com sucesso!");
  };
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("allActions.html")
      .then((response) => response.text())
      .then((html) => setHtmlContent(html));
  }, []);

  const monsterId = "aboleth";

  const removeLocalstorage = () => {
    localStorage.removeItem("charData");
    localStorage.removeItem("charEquip");
  };

  return (
    <>
      <div className="App">
        <MonsterDetail monsterId={monsterId} />
      </div>
      <button onClick={salvarNoLocalStorage}>
        Salvar Personagem no LocalStorage
      </button>
      <p>VAMOS CRIAR SEU NOVO PERSONAGEM</p>
      <Link to="/char-create">
        <button id="charCreat" onClick={removeLocalstorage}>
          NOVO PERSONAGEM
        </button>
      </Link>
      <div className="App">
        <h1>Catálogo de Ataques de Monstros</h1>
        {htmlContent ? (
          <MonsterAttacks htmlContent={htmlContent} />
        ) : (
          <p>Carregando dados dos monstros...</p>
        )}
      </div>
      <MonsterActionsPage />
      <AllMonsterActions />
    </>
  );
};

export default Home;
