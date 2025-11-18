module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components',
          '@screens': './screens',
          '@utils': './utils',
          '@assets': './assets',
          '@customs': './customs',
          '@constants': './components/Matrix',
          '@redux': './redux',
        },
      },
    ],
    // must always be last
    'react-native-reanimated/plugin',
  ],
};
