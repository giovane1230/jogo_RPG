import React, { useState } from "react";

function DiceRoller({ sides = 20 }) {
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    let temp = 0;

    const interval = setInterval(() => {
      temp = Math.floor(Math.random() * sides) + 1;
      setResult(temp);
    }, 60); // muda o número rapidamente

    setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
      setResult(temp); // define resultado final
    }, 1000); // tempo total da animação
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h3>Dado d{sides}</h3>
      <div style={{ fontSize: "40px", fontWeight: "bold" }}>
        🎲 {rolling ? "Rolando..." : result ?? "-"}
      </div>
      <button onClick={rollDice} disabled={rolling}>
        Rolar Dado
      </button>
    </div>
  );
}

export default DiceRoller;
