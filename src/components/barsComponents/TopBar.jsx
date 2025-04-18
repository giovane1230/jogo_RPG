import React, { useState } from "react";
import "../../../styles/components/topBar.css";
import Sidebar from "./SideBar";

function Topbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <div className="topbar">
        <div className="menu" onClick={toggleMenu}>☰</div>
        <span>👤 Jogador1</span>
        <span>⚔️ Guerreiro</span>
        <span>❤️ 120/120</span>
        <span>💰 150</span>
        <span>⭐ 340/1000</span>
      </div>

      {menuAberto && <Sidebar fecharMenu={() => setMenuAberto(false)} />}
    </>
  );
}

export default Topbar;
