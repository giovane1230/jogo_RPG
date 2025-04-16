import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dataBase.css";

function dataBase() {
  return (
    <div className="dataBase">
      <ul>
        <Link to="/classes"><li>Classes</li></Link>
        <Link to="/equipmentsCategories"><li>Equipamentos</li></Link>
      </ul>
    </div>
  );
}

export default dataBase;
