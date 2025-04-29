import React, { useState } from "react";
import "../../../styles/charCss/CharStatus.css";

function CharInfoTopBar() {
  const [character, setCharacter] = useState(() => {
    // Carrega os dados do localStorage na inicialização
    const savedData = localStorage.getItem('charData');
    return savedData ? JSON.parse(savedData) : null;
  });


  return (
    <>
      {character && (
        <>
          <span>Nome</span>
          <span>{character?.name}</span>
          <br />
          <span>Vida</span>
          <p>DEPOIS MUDAR PARA VIDA ATUAL E MAXIMA</p>
          <span>VIDA: {character?.vidaInicial}</span>
          <br />
          <span>{character?.class?.name} - {character?.race?.name} - {character?.nivel} </span>
          <br />
          <span>Força: {character?.attributes.str}</span>
          <span>Destreza: {character?.attributes.dex}</span>
          <span>Constituição: {character?.attributes.con}</span>
          <span>Inteligência: {character?.attributes.int}</span>
          <span>Sabedoria: {character?.attributes.wis}</span>
          <span>Carisma: {character?.attributes.cha}</span>
        </>
      )}
    </>
  );
}

export default CharInfoTopBar;
