const ping = require('ping');
const { errorLog } = require('./log');

exports.checkAddress = async (address) => {
  try {
    const { alive } = await ping.promise.probe(address);
    return alive;
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }
}
