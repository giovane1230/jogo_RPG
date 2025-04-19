import React, { useState } from "react";
import "../../styles/components/topBar.css";
import Sidebar from "./SideBar";
import { useCharacter } from "../context/CharacterContext";

function Topbar() {
  const { character } = useCharacter();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <div className="topbar">
        <div className="menu" onClick={toggleMenu}>☰</div>
        <span>👤 {character.name}</span>
        <span>⚔️ {character.classe}</span>
        <span>❤️ 120/120</span>
        <span>💰 150</span>
        <span>⭐ 340/1000</span>
      </div>

      {menuAberto && <Sidebar fecharMenu={() => setMenuAberto(false)} />}
    </>
  );
}

export default Topbar;
