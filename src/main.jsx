import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <CharacterProvider>
        <App /> {/* App é passado como children */}
      </CharacterProvider>
    </Router>
  </React.StrictMode>
);
