const { configureDevServer } = require('./webpack.parts');
const webpack = require('webpack');

exports.developmentConfig = ({ port, publicPath, serverAddress, siteURL }) => ({
  devtool: "cheap-source-map",
  devServer: configureDevServer(serverAddress, publicPath, port, siteURL),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});
