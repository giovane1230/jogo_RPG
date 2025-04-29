import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/SideBar.css";
import PropTypes from "prop-types";

function Sidebar({ fecharMenu }) {
  return (
    <div className="sidebar">
      <button className="fechar" onClick={fecharMenu}>×</button>
      <ul>
        <Link to="/"><li>NOVO</li></Link>
        <Link to="/char"><li>Personagem</li></Link>
        <li>Treinamento</li>
        <li>Ferreiro</li>
        <Link to="/mercador"><li>Mercador</li></Link>
        <li>Alquimista</li>
        <li>Saída da Cidade</li>
        <li>Histórico de Combate</li>
        <li>Sandbox</li>
        <Link to="/database"><li>Database</li></Link>
        <li>Configurações</li>
      </ul>
    </div>
  );
}
Sidebar.propTypes = {
  fecharMenu: PropTypes.func.isRequired,
};

export default Sidebar;
