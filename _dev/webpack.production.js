const TerserPlugin = require('terser-webpack-plugin');

exports.productionConfig = () => ({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          keep_classnames: false,
          keep_fnames: false
        },
      })
    ],
  },
});
