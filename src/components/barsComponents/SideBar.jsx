import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Bars/SideBar.css";

function Sidebar({ fecharMenu, aberto }) {
  const menu = [
    { label: "NOVO", to: "/" },
    { label: "Personagem", to: "/char" },
    { label: "Treino", to: "/treino" },
    { label: "Ferreiro" },
    { label: "Mercador", to: "/mercador" },
    { label: "Alquimista", to: "/alquimista" },
    { label: "Magicos", to: "/magicos" },
    { label: "Teste Proeficiencia", to: "/teste" },
    { label: "Saída da Cidade" },
    { label: "Histórico de Combate" },
    { label: "Sandbox" },
    { label: "Database", to: "/database" },
    { label: "Configurações" },
  ];

  return (
    <div className={`sidebar ${aberto ? "aberto" : "fechado"}`}>
      <ul>
        {menu.map((item, i) =>
          item.to ? (
            <Link to={item.to} key={i}>
              <li>{item.label}</li>
            </Link>
          ) : (
            <li key={i}>{item.label}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
