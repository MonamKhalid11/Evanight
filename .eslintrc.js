module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      { usePrettierrc: true },
    ],
    "react/prop-types": "off",
    "require-yield": "off",
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
};
