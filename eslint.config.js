import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import reactPlugin from 'eslint-plugin-react';

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // suas regras personalizadas aqui, se quiser
    },
    settings: {
      react: {
        version: 'detect', // ou 'detect' para deixar automático
      },
    },
  },
]);