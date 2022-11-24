const { webpackVars, getEnvData } = require('./webpack/webpack.vars.js');
const { commonConfig } = require('./webpack/webpack.common.js');
const { productionConfig } = require('./webpack/webpack.production.js');
const { developmentConfig } = require('./webpack/webpack.development.js');
const { merge } = require('webpack-merge');

const getConfig = ({mode, ...vars}) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig({mode, ...vars}), productionConfig({mode, ...vars}));
    case 'development':
      return merge(commonConfig({mode, ...vars}), developmentConfig({mode, ...vars}));
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = (env, options) => getEnvData({env, options, webpackVars}, getConfig);
