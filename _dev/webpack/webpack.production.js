const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const safeList = require('./purge-safelist');
const glob = require('glob-all');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

exports.productionConfig = ({ purge }) => ({
  devtool: '(none)',
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015' // Syntax to compile to (see options below for possible values)
      }),
      new CssMinimizerPlugin()
    ],
  },
  plugins: plugins(purge)
});
