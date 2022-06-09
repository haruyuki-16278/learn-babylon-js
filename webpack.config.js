const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    })
  ]
}
