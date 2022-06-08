const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new copyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ],
    }),
  ],
};
