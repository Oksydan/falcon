const { extractScss, extractJs, extractImages, extractFonts, externals, extractVendorsChunks, preloadFonts, resolve } = require('./webpack.parts');
const { merge } = require("webpack-merge");

exports.commonConfig = ({ mode, port, publicPath, siteURL, getOutput, getEntry, entriesArray, stats, devServer }) => (
  merge(
    {
      mode,
      entry: getEntry(entriesArray),
      output: getOutput({ mode, publicPath, siteURL, port, devServer }),
      target: 'web',
    },
    preloadFonts(),
    externals(),
    extractScss({ mode }),
    extractJs(),
    extractImages({ publicPath }),
    extractFonts({ publicPath }),
    extractVendorsChunks(),
    resolve(),
    (stats ? { stats } : {})
  )
);
