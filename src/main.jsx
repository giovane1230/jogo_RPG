import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { CharEquipProvider } from "./context/charEquipContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CharacterProvider>
        <CharEquipProvider>
        <App /> {/* App é passado como children */}
        </CharEquipProvider>
      </CharacterProvider>
    </Router>
  </React.StrictMode>
);
