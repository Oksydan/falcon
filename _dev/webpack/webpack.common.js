const { extractScss, extractJs, extractImages, extractFonts, externals, extractVendorsChunks, preloadFonts } = require('./webpack.parts');
const { merge } = require("webpack-merge");

exports.commonConfig = ({ mode, port, publicPath, siteURL, getOutput, getEntry, entriesArray }) => (
  merge(
    {
      mode,
      entry: getEntry(entriesArray),
      output: getOutput({ mode, publicPath, siteURL, port }),
      target: 'web',
    },
    preloadFonts(),
    externals(),
    extractScss({ mode }),
    extractJs(),
    extractImages({ publicPath }),
    extractFonts({ publicPath }),
    extractVendorsChunks(),
  )
);
