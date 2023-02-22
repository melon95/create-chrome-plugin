const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    popup: path.resolve(__dirname, '../src/popup/index.tsx'),
    background: path.resolve(__dirname, '../src/background/index.ts'),
    contentScript: path.resolve(__dirname, '../src/contentScript/index.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /.ts(x)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/popup.html'),
      chunks: ['popup'],
      filename: 'popup.html'

    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '', filter: (resourcePath) => !resourcePath.endsWith('.html') }
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx']
  }
}
