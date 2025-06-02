import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";
import { CombatProvider } from "./context/CombateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CharacterProvider>
        <CombatProvider>
        <App />
        </CombatProvider>
      </CharacterProvider>
    </Router>
  </React.StrictMode>
);
