import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import "../../../styles/Bars/Layout.css";

function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="layout">
      <Topbar abrirMenu={() => setMenuAberto(true)} />
      <Sidebar
        aberto={menuAberto}
        fecharMenu={() => setMenuAberto(false)}
        className={menuAberto ? "sidebar" : "sidebar fechado"}
      />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
