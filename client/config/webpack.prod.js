const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path');
const common = require('./webpack.common.js')
const Dotenv = require('dotenv-webpack')

// Splitchunks configuration.
const splitChunks = {
  cacheGroups: {
    default: false,
    commons: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor_app',
      chunks: 'all',
      minChunks: 2,
    },
  },
}

module.exports = merge(common, {
   devtool: '',
   mode: 'production',
   optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      }),
       new Dotenv({
        path: path.resolve(process.cwd(), 'config/.env'),
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: false,
    splitChunks,
  },
})
