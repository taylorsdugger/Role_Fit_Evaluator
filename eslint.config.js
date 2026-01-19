import nextPlugin from "eslint-config-next";

const config = [
  {
    ignores: [".next", "node_modules", "out", "build", ".git"],
  },
  ...nextPlugin,
];

export default config;
