const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

const config = {
  mode: process.env.NODE_ENV,
  // context: path.resolve('./src/front-end/app.js'),
  entry: path.resolve('./src/front-end/app.js'),
  output: {
    path: path.resolve('./dist/public/js'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production'
          }
        }
      })
    ]
  }
}

if (process.env.NODE_ENV === 'development') {
  config.watch = true
  config.cache = true
  config.plugins = plugins.concat([
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ])
}

module.exports = config
