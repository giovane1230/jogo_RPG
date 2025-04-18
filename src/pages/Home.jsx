import React from "react";
import "../../styles/MainContent.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="main-content">
      <h1>Bem-vindo ao Coliseu!</h1>
      <p>VAMOS CRIAR SEU NOVO PERSONAGEM</p>
      <Link to="/charcreate">
      <button id="charCreat">
        NOVO PERSONAGEM
      </button>
      </Link>
      
    </div>
  );
}

export default Home;