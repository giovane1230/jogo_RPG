import React, { useEffect, useState } from "react";
import "../../styles/components/topBar.css";
import Sidebar from "./SideBar";
import { useCharacter } from "../context/CharacterContext";
import xpLevels from "../api/regras";

function Topbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { character } = useCharacter();

  const xpMax = (charLv) => xpLevels[charLv+1].xp;
  
  const toggleMenu = () => setMenuAberto(!menuAberto);

    useEffect(() => {
      if (character.exp === xpMax(character.nivel)) {
        alert("Você subiu de nivel, vá para o Personagem upar");
      }
      return
    }, [character]);

  return (
    <>
      <div className="topbar">
        <div className="menu" onClick={toggleMenu}>☰</div>
        {character && (
          <>

            <span>👤 {character?.name} - {character?.class?.name} - {character?.race?.name} - {character?.nivel} </span>
            <span>❤️ {character?.vidaInicial}</span>
            <span>💰 {character?.gold ?? 0}</span>
            <span>⭐ {character?.exp ?? 0} / {xpMax(character.nivel)}</span>
          </>
        )}
      </div>

      {menuAberto && <Sidebar fecharMenu={() => setMenuAberto(false)} />}
    </>
  );
}


export default Topbar;
