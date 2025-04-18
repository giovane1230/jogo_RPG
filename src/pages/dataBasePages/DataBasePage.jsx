import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/dataBaseCss/dataBase.css";

function dataBase() {
  return (
    <div className="dataBase">
      <ul>
        <Link to="/classes"><li>Classes</li></Link>
        <Link to="/equipmentsCategories"><li>Equipamentos</li></Link>
        <Link to="/races"><li>Raças</li></Link>
        <Link to="/monsters"><li>Monstros</li></Link>
        <Link to="/skills"><li>Habilidades</li></Link>
        <Link to="/spells"><li>Magias</li></Link>
      </ul>
    </div>
  );
}

export default dataBase;
