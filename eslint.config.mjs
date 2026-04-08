import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
