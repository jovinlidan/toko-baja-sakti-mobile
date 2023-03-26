module.exports = {
  root: true,
  extends: "@react-native-community",
  plugins: ["react", "react-native", "react-hooks"],
  rules: {
    quotes: [2, "double", "avoid-escape"], // specify whether double or single quotes should be used
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-single-element-style-arrays": 2,
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": ["warn"],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    "react/no-unstable-nested-components": 0,

    "import/namespace": 0,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
