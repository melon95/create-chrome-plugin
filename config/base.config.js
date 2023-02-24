const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ManifestWebpackPlugin = require('./manifest-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    action: path.resolve(__dirname, '../src/action/index.tsx'),
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
      template: path.resolve(__dirname, '../public/action.html'),
      chunks: ['action'],
      filename: 'action.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          filter: (resourcePath) => !resourcePath.endsWith('.html')
        }
      ]
    }),
    new ManifestWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx']
  }
}
