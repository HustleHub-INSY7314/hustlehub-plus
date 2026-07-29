// ============================================================
//  ESLint configuration
// ------------------------------------------------------------
//  Enforces consistent code quality across the whole team so
//  pull requests show real logic changes, not style noise.
//  Supports the module's Linting/Code Quality learning unit and
//  helps Part 3 static analysis (SonarQube) pass cleanly.
//
//  Run:  npm run lint       (report issues)
//        npm run lint:fix   (auto-fix what it can)
// ============================================================

module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true, // for Part 2 tests
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script", // CommonJS (require/module.exports)
  },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "next|req|res" }],
    "no-console": "off", // logger uses console; allowed
    eqeqeq: ["error", "always"], // require === over ==
    "no-var": "error", // use let/const
    "prefer-const": "warn",
  },
};
