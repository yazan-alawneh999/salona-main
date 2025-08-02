module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
    ["module:react-native-dotenv", {
      envName: "APP_ENV",
      moduleName: "@env",
      path: ".env",
    }],
  ],
};
