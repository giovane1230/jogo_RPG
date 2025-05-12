import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/barsComponents/Layout";
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
import SellerPage from "./pages/Vendedores/SellerPage";
import TreinoPage from "./pages/combatePages/TreinoPage";
import CombatePage from "./pages/combatePages/CombatePage";
import AlquimistaPagina from "./pages/Vendedores/AlquimistaPagina";
import NotFound from "./pages/404";
import TestProeficiencia from "./pages/charPages/TestProeficiencia";
import TraitsPage from "./pages/dataBasePages/TraitsPage";

function App() {
  return (
    <Routes>
      {/* Layout aplica o sidebar/topbar em todas as páginas internas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="char" element={<CharPage />} />
        <Route path="database" element={<DataBasePage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route
          path="equipments-categories"
          element={<EquipmentsCategoriesPage />}
        />
        <Route path="races" element={<RacesPage />} />
        <Route path="monsters" element={<MonstersPage />} />
        <Route path="spells" element={<SpellsPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="char-create" element={<CharCreate />} />
        <Route path="char-create-ptns" element={<CharCreatePtns />} />
        <Route path="resumo" element={<ResumoPage />} />
        <Route path="mercador" element={<SellerPage />} />
        <Route path="treino" element={<TreinoPage />} />
        <Route path="combate" element={<CombatePage />} />
        <Route path="alquimista" element={<AlquimistaPagina />} />
        <Route path="teste" element={<TestProeficiencia />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/tracos" element={<TraitsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
