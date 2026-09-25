module.exports = [
  {
    ignores: ["node_modules/**", "eslint.config.js"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
];
