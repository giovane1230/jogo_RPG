import React from "react";
import { Link } from "react-router-dom";
import personagemPronto from "../api/injetarChar";

const Home = () => {
  const salvarNoLocalStorage = () => {
    localStorage.setItem("charData", JSON.stringify(personagemPronto));
    alert("Personagem salvo com sucesso!");
  };

  return (
    <>
    <button onClick={salvarNoLocalStorage}>
      Salvar Personagem no LocalStorage
    </button>
      <p>VAMOS CRIAR SEU NOVO PERSONAGEM</p>
      <Link to="/char-create">
        <button id="charCreat">NOVO PERSONAGEM</button>
      </Link>
    </>
  );
};

export default Home;
