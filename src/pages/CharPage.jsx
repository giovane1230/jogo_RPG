import React from "react";
import CharInfo from "../components/CharInfo";
import CharStats from "../components/CharStatus";
import CharActions from "../components/CharActions";
import "../../styles/CharPage.css";
import CharBag from "../components/CharBag";

function CharPage() {
  return (
    <div className="character-page">
      <div className="top-section">
      <div className="left-panel">
        <CharInfo />
        <CharStats />
        <CharActions />
      </div>
      <div className="right-panel">
        <CharBag />
      </div>
    </div>
    <div className="bottom-panel">
      <h3> AQUI VAI SER ALGUMA COISA PROVAVELEMTEN MAGIA</h3>
    </div>
</div>
  );
}

export default CharPage;
