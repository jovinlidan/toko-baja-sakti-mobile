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
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
