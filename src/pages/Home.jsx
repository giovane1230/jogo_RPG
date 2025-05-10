import React from "react";
import { Link } from "react-router-dom";
import personagemPronto from "../api/injetarChar";

const Home = () => {
  const salvarNoLocalStorage = () => {
    localStorage.removeItem("charData");
    window.location.reload();
    localStorage.setItem("charData", JSON.stringify(personagemPronto));
    alert("Personagem salvo com sucesso!");
  };

  const removeLocalstorage = () => {
    localStorage.removeItem("charData");
        localStorage.removeItem("charEquip");
  };

  return (
    <>
      <button onClick={salvarNoLocalStorage}>
        Salvar Personagem no LocalStorage
      </button>
      <p>VAMOS CRIAR SEU NOVO PERSONAGEM</p>
      <Link to="/char-create">
        <button id="charCreat" onClick={removeLocalstorage}>
          NOVO PERSONAGEM
        </button>
      </Link>
    </>
  );
};

export default Home;
