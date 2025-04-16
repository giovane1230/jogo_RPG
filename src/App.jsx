import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import Home from "./pages/Home";
import CharPage from "./pages/CharPage";
import ClassesPage from "./pages/ClassesPage";
import DataBasePage from "./pages/DataBasePage";
import EquipmentsCategoriesPage from "./pages/EquipmentsCategoriesPage";

function App() {
  const [menuAberto, setMenuAberto] = useState(false);

  const abrirMenu = () => setMenuAberto(true);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      <Topbar abrirMenu={abrirMenu} />
      {menuAberto && <Sidebar fecharMenu={fecharMenu} />}
      
      <div className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/char" element={<CharPage />} />
          <Route path="/database" element={<DataBasePage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/equipmentsCategories" element={<EquipmentsCategoriesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
