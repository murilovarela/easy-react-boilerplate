const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const workboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: '',
  plugins: [
    new workboxPlugin.InjectManifest({
      swSrc: './src/serviceWorker/sw.js',
      mode: 'production',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ cache: true })],
  },
});
