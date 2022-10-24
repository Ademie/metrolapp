// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],

//   plugins: [
//     'react-native-reanimated/plugin',
//   ]
// };

// 'react-native-reanimated/plugin',

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    // ['@babel/plugin-proposal-export-namespace-from'],

    ['react-native-reanimated/plugin'],
    
  ],
};

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [
//       [
//         "module:react-native-dotenv",
//         {
//           moduleName: "@env",
//           path: ".env",
//         }
//       ]
//     ]
//   };
// };
