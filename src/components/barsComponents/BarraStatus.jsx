import React from "react";

const BarraStatus = ({ label, valorAtual, valorMaximo, cor = "green" }) => {
  const largura = (valorAtual / valorMaximo) * 100;

  return (
    <div style={{ marginBottom: "8px" }}>
      <strong>{label}:</strong>
      <div style={{
        backgroundColor: "#ddd",
        borderRadius: "5px",
        overflow: "hidden",
        height: "15px",
        width: "40%"
      }}>
        <div style={{
          width: `${largura}%`,
          backgroundColor: cor,
          height: "100%"
        }} />
      </div>
      <small>{valorAtual} / {valorMaximo}</small>
    </div>
  );
};

export default BarraStatus;
