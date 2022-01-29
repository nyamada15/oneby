const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'oneby.min.js',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
        { test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'] // ローダーは後ろから実行される
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env"
              ]
            }
          }
        }
    ],
  }
};