module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      files: ["functions/**/*.js"],
      parserOptions: {
        sourceType: "script"
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  }
};
