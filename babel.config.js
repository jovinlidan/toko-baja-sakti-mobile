module.exports = function (api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../src/app";
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ".",
          alias: {
            "@assets": "./src/assets",
            "@api-hooks": "./src/api-hooks",
            "@common": "./src/common",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@models": "./src/models",
            "@modules": "./src/modules",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
