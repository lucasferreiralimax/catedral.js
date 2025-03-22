import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", // Alterado para "module"
      globals: globals.browser, // Inclui as variáveis globais do navegador
      ecmaVersion: "latest", // Garante suporte ao JavaScript moderno
    },
  },
  pluginJs.configs.recommended,
];