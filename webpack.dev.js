const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    index: 'index.html',
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [new CopyWebpackPlugin([{ from: 'src/serviceWorker/sw.js', to: '' }])],
});
