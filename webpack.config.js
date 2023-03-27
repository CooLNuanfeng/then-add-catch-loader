const path = require('path')

module.exports = {
  mode: 'development',
  entry:{
    'index':  './test/index.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: {
        loader: path.resolve('./lib/index.js')
      }},
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
  }
}