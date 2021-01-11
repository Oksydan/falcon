const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const safeList = require('./purge-safelist');
const glob = require('glob-all');

exports.productionConfig = ({ purge }) => ({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          keep_classnames: false,
          keep_fnames: false
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: purge ? [
    new PurgeCSSPlugin({
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
  ] : []
});
