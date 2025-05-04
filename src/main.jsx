import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { CharEquipProvider } from "./context/charEquipContext";
import { CombatProvider } from "./context/CombateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CharacterProvider>
        <CharEquipProvider>
          <CombatProvider>
            <App /> {/* App é passado como children */}
          </CombatProvider>
        </CharEquipProvider>
      </CharacterProvider>
    </Router>
  </React.StrictMode>
);
