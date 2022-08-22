const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const safeList = require('./purge-safelist');
const glob = require('glob-all');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { cleanDistFolders } = require('./webpack.parts');
const { merge } = require("webpack-merge");

const plugins = (purge, analyze) => ([
  analyze ? new BundleAnalyzerPlugin() : false,
  purge ? new PurgeCSSPlugin({
    paths: glob.sync([
      'js/*.js',
      'js/**/*.js',
      '../templates/**/*.tpl',
      '../modules/**/*.tpl',
      '../modules/**/*.js'
    ]),
    safelist: safeList.list,
    safelistPatterns: safeList.patterns
  })
  : false
].filter(el => el && el));

exports.productionConfig = ({ purge, analyze }) => (
  merge(
    {
      devtool: 'hidden-source-map',
      optimization: {
        minimize: true,
        minimizer: [
          new ESBuildMinifyPlugin({
            target: 'es2015',
            format: 'iife'
          }),
          new CssMinimizerPlugin()
        ],
      },
      plugins: plugins(purge, analyze)
    },
    cleanDistFolders()
  )
);
