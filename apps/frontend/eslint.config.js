import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,jsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    overrides: [
      {
        files: ["components/ui/**/*.{js,jsx,ts,tsx}"],
        rules: {
          "react-refresh/only-export-components": "off",
        },
      },
    ],
  },

  // ----------------------------
  // 🚨 ARCHITECTURE ENFORCEMENT
  // ----------------------------

  // 1. ROUTES → only pages
  {
    files: ["src/routing/**"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "@/pages/*",
            "@/features/*",
            "@/components/*",
            "@/hooks/*",
          ],
        },
      ],
    },
  },

  // 2. PAGES → can use features & components
  {
    files: ["src/pages/**"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "@/routing/*", // ❌ prevent reverse dependency
          ],
        },
      ],
    },
  },

  // 3. FEATURES → cannot depend on pages/routing
  {
    files: ["src/features/**"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/pages", "@/pages/*", "@/routing/*"],
        },
      ],
    },
  },

  // 4. COMPONENTS → pure UI only
  {
    files: ["src/components/**"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/features/*", "@/pages", "@/pages/*", "@/routing/*"],
        },
      ],
    },
  },
]);
