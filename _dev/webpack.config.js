const { extractScss, extractJs, extractImages, extractFonts, extractExternals } = require('./webpack.parts');
const { developmentConfig } = require('./webpack.development');
const { productionConfig } = require('./webpack.production');
const { merge } = require("webpack-merge");
const path = require('path');
// const StylelintPlugin = require('stylelint-webpack-plugin');


require('dotenv').config()

const {
  PORT: port,
  PUBLIC_PATH: publicPath,
  SERVER_ADDRESS: serverAddress,
  SITE_URL: siteURL
} = process.env;


const getCommonConfig = ({ mode, port, publicPath, siteURL }) => (
  merge(
    {
      context: path.resolve(__dirname, '../_dev'),

      entry: {
        theme: './js/theme.js',
      },

      output: {
        filename: "js/[name].js",
        chunkFilename: mode === 'production' ? "js/[hash][id].js" : "js/[id].js",
        path: path.resolve(__dirname, '../assets'),
        publicPath: mode === 'production' ? publicPath : siteURL + ':' + port + publicPath,
        pathinfo: false,
      },

      optimization: {
        splitChunks: {
          chunks: 'async'
        }
      },

    },
    extractExternals(),
    extractScss({ mode }),
    extractJs(),
    extractImages({ publicPath }),
    extractFonts({ publicPath })
  )
);


const getConfig = ({ mode, purge }) => {
  switch (mode) {
    case "production":
      return merge(getCommonConfig({ mode, port, publicPath, serverAddress, siteURL }), productionConfig({ purge }), { mode });
    case "development":
      return merge(getCommonConfig({ mode, port, publicPath, serverAddress, siteURL }), developmentConfig({ port, publicPath, serverAddress, siteURL }), { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};


module.exports = (env, options) => getConfig({
  mode: options.mode,
  purge: options?.purge ? options.purge : false
});

