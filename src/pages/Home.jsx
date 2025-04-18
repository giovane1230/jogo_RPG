import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <><p>VAMOS CRIAR SEU NOVO PERSONAGEM</p><Link to="/charcreate">
      <button id="charCreat">NOVO PERSONAGEM</button>
    </Link></>
  );
};

export default Home;