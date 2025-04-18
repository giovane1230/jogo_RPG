import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/SideBar";
import Topbar from "./components/TopBar";
import Home from "./pages/Home";
import CharPage from "./pages/charPages/CharPage";
import ClassesPage from "./pages/dataBasePages/ClassesPage";
import DataBasePage from "./pages/dataBasePages/DataBasePage";
import EquipmentsCategoriesPage from "./pages/dataBasePages/EquipmentsCategoriesPage";
import RacesPage from "./pages/dataBasePages/RacesPage";
import MonstersPage from "./pages/dataBasePages/MonstersPage";
import SpellsPage from "./pages/dataBasePages/SpellPage";
import SkillsPage from "./pages/dataBasePages/SkillsPage";
import CharCreate from "./pages/charPages/CharCreate";
import CharCreatePtns from "./pages/charPages/CharCreatePtns";
import ResumoPage from "./pages/createCharPages/ResumoPage";

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
          <Route path="/races" element={<RacesPage />} />
          <Route path="/monsters" element={<MonstersPage />} />
          <Route path="/spells" element={<SpellsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/charcreate" element={<CharCreate />} />
          <Route path="/charcreateptns" element={<CharCreatePtns />} />
          <Route path="/resumo" element={<ResumoPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
