import React, { useEffect, useState } from "react";
import "../../styles/components/topBar.css";
import Sidebar from "./SideBar";
import { useCharacter } from "../context/CharacterContext";

function Topbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { character } = useCharacter();

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <>
      <div className="topbar">
        <div className="menu" onClick={toggleMenu}>☰</div>
        {character && (
          <>
            <span>👤 {character?.name} - {character?.class?.name} - {character?.race?.name}</span>
            <span>❤️ {character?.vidaInicial}</span>
            <span>💰 {character?.gold ?? 0}</span>
            <span>⭐ {character?.exp ?? 0}</span>
          </>
        )}
      </div>

      {menuAberto && <Sidebar fecharMenu={() => setMenuAberto(false)} />}
    </>
  );
}


export default Topbar;
