const path = require('path');
const themeDev = path.resolve(__dirname, '../../_dev');

require('dotenv').config({ path: './webpack/.env' });


const {
  PORT: port,
  PUBLIC_PATH: publicPath,
  SERVER_ADDRESS: serverAddress,
  SITE_URL: siteURL
} = process.env;

const entriesArray = ['theme', 'product', 'checkout', 'listing'];

exports.webpackVars = {
  themeDev,
  publicPath,
  serverAddress,
  siteURL,
  port,
  entriesArray,
  getEntry: (entries) => {
    const resultEntries = {};

    for (const entry of entries) {
      resultEntries[entry] = [
        path.resolve(themeDev, `./js/${entry}.js`),
        path.resolve(themeDev, `./css/${entry}.scss`)
      ]
    }

    return resultEntries;
  },
  getOutput: ({ mode, publicPath, siteURL, port }) => ({
    filename: "js/[name].js",
    chunkFilename: mode === 'production' ? "js/[chunkhash].js" : "js/[id].js",
    path: path.resolve(themeDev, '../assets'),
    publicPath: mode === 'production' ? publicPath : siteURL + ':' + port + publicPath,
    pathinfo: false,
  }),
}
