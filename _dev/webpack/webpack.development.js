const { configureDevServer } = require('./webpack.parts');
const { HotAcceptPlugin } = require('hot-accept-webpack-plugin');
const webpack = require('webpack');
const { merge } = require("webpack-merge");

const devServerConfig = (serverAddress, publicPath, port, siteURL, entriesArray) => {
  return {
    devServer: configureDevServer(serverAddress, publicPath, port, siteURL),
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HotAcceptPlugin({
        test: [
          ...entriesArray.map(el => `${el}.js`)
        ]
      })
    ],
    optimization: {
      runtimeChunk: 'single',
    }
  }
}

exports.developmentConfig = ({ port, publicPath, serverAddress, siteURL, entriesArray, devServer }) => merge(
  {
    devtool: "cheap-source-map",
  },
  devServer ? devServerConfig(serverAddress, publicPath, port, siteURL, entriesArray) : {},
);
