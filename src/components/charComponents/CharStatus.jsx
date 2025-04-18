import React from "react";
import "../../../styles/charCss/CharStatus.css";

function CharStats() {
  return (
    <div className="stats-grid">
      <div><strong>Força:</strong> <br/>15</div>
      <div><strong>Destreza:</strong> <br/>12</div>
      <div><strong>Constituição:</strong> <br/>14</div>
      <div><strong>Inteligência:</strong> <br/>10</div>
      <div><strong>Sabedoria:</strong> <br/>11</div>
      <div><strong>Carisma:</strong> <br/>8</div><br/>
    </div>
  );
}

export default CharStats;
