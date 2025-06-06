import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import personagemPronto from "../api/injetarChar";
import AllMonsterActions from "../components/monsterComponents/AllMonsterActions";
import MonsterDetail from "../components/monsterComponents/MonsterDetail";
import LegendaryActionsList from "../api/LegendaryActionsList";

const Home = () => {
  const salvarNoLocalStorage = () => {
    localStorage.removeItem("characterData");
    window.location.reload();
    localStorage.setItem("characterData", JSON.stringify(personagemPronto));
    alert("Personagem salvo com sucesso!");
  };

  const monsterId = "ankheg";

  const removeLocalstorage = () => {
    localStorage.removeItem("characterData");
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
      <LegendaryActionsList />
      <AllMonsterActions />
    </>
  );
};

export default Home;
