import React, { useState } from "react";
import "./DiceRoller.css"; // certifique-se de importar o CSS

function DiceRollerMedium({ sides = 20, onRoll }) {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);

  function handleRoll() {
    const result = Math.floor(Math.random() * sides) + 1;
    onRoll(result); // Passa o resultado para o componente pai
  }

  const rollDice = () => {
    setRolling(true);
    let temp = 0;

    const interval = setInterval(() => {
      temp = Math.floor(Math.random() * sides) + 1;
      setResult(temp);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
      setResult(temp);
      if (onRoll) onRoll(temp); // <- avisa o pai
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2 style={{ color: "#fff" }}>Rolagem de Dado D{sides}</h2>
      <div className={`dice-box ${rolling ? "rolling" : ""}`}>
        {rolling ? "🎲" : result ?? "-"}
      </div>
      <br />
      <button onClick={handleRoll}>Rolar D{ sides }</button>
      <button
        onClick={rollDice}
        disabled={rolling}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#333",
          color: "#0f0",
          border: "2px solid #0f0",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Rolar Dado
      </button>
    </div>
  );
}

export default DiceRollerMedium;
