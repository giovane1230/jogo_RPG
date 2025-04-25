import React from "react";
import CharInfoTopBar from "../../components/charComponents/CharInfoTopBar";
import CharActions from "../../components/charComponents/CharActions";
import CharBag from "../../components/charComponents/CharBag";
import "../../../styles/charCss/CharPage.css"

function CharPage() {
  return (
    <div className="character-page">
      <div className="top-section">
      <div className="left-panel">
        <CharInfoTopBar />
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
