const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const safeList = require('./purge-safelist');
const glob = require('glob-all');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const { cleanDistFolders } = require('./webpack.parts');
const { merge } = require("webpack-merge");

const plugins = (purge) => ([
  new BundleAnalyzerPlugin(),
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

exports.productionConfig = ({ purge }) => (
  merge(
    {
      devtool: '(none)',
      optimization: {
        minimize: true,
        minimizer: [
          // ESBuildMinifyPlugin replaced with TeaserPlugin due to bug with dynamic import. https://github.com/privatenumber/esbuild-loader/issues/139
          // new ESBuildMinifyPlugin({
          //   target: 'es2015'
          // }),
          new TerserPlugin({
            extractComments: true,
          }),
          new CssMinimizerPlugin()
        ],
      },
      plugins: plugins(purge)
    },
    cleanDistFolders()
  )
);
