import React, { useEffect, useState } from "react";
import "../../styles/components/topBar.css";
import Sidebar from "./SideBar";
import { useCharacter } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { character } = useCharacter();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(!menuAberto);

    useEffect(() => {
      if (!character) {
        navigate("/");
      }
    }, [character, navigate]);

  return (
    <>
      <div className="topbar">
        <div className="menu" onClick={toggleMenu}>☰</div>
        {character && (
          <>
            <span>👤 {character?.name} - {character?.class?.name} - {character?.race?.name}</span>
            <span>❤️ {character?.vidaInicial}</span>
            <span> Força: {character?.attributes.str}</span>
            <span>💰 {character?.gold ?? 0}</span>
          </>
        )}
        <span>⭐ 340/1000</span>
      </div>

      {menuAberto && <Sidebar fecharMenu={() => setMenuAberto(false)} />}
    </>
  );
}


export default Topbar;
