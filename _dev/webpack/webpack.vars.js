const path = require('path');
const themeDev = path.resolve(__dirname, '../../_dev');
const packageJson = require('../package.json');
const glob = require('glob-all');
const getWorkspacesFromPackageJson = (packageJson) => packageJson.workspaces ?? [];
let entriesArray = null;


const getEntriesArray = () => {
  if (!entriesArray) {
    entriesArray = require('../webpack/entries.json').entries
  }

  return entriesArray;
}

exports.getEnvData = ({env, options, webpackVars}, initConfig) => {
  const envFileName = typeof env.envFile != 'undefined' ? env.envFile : '.env';
  const envResult = require('dotenv').config({ path: `./webpack/${envFileName}` });

  const {
    PORT: port,
    PUBLIC_PATH: publicPath,
    SERVER_ADDRESS: serverAddress,
    SITE_URL: siteURL
  } = process.env;

  if (envResult.error) {
    console.error('\x1b[41m\x1b[37m%s\x1b[0m', envResult.error + ' Your .env file not exits. Read installation documentation for more info https://github.com/Oksydan/modern-prestashop-starter-theme#installation.');
    process.exit(1);
  }

  return initConfig({
    mode: options.mode,
    purge: env.purge ? env.purge : false,
    analyze: env.analyze ? env.analyze : false,
    devServer: env.devServer ? env.devServer : false,
    stats: env.stats ? env.stats : false,
    port,
    publicPath,
    serverAddress,
    siteURL,
    ...webpackVars
  })
}


exports.webpackVars = {
  themeDev,
  entriesArray: getEntriesArray(),
  getEntry: (entries) => {
    const resultEntries = {};
    const workspaces = getWorkspacesFromPackageJson(packageJson);

    for (const entry of entries) {
      const extraEntries = [];

      for (const workspace of workspaces) {
        extraEntries.push(...glob.sync(`${workspace}/src/js/${entry}/index.js`));
        extraEntries.push(...glob.sync(`${workspace}/src/css/${entry}/index.scss`));
      }

      resultEntries[entry] = [
        path.resolve(themeDev, `./js/${entry}.js`),
        path.resolve(themeDev, `./css/${entry}.scss`),
        ...extraEntries,
      ]
    }

    return resultEntries;
  },
  getOutput: ({ mode, publicPath, siteURL, port, devServer }) => ({
    filename: 'js/[name].js',
    chunkFilename: mode === 'production' ? 'js/[chunkhash].js' : 'js/[id].js',
    path: path.resolve(themeDev, '../assets'),
    publicPath: !devServer ? publicPath : siteURL + ':' + port + publicPath,
    pathinfo: false,
  }),
}
