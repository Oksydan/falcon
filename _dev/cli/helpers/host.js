const ping = require('ping');

exports.checkAddress = async (address) => {
  try {
    const { alive } = await ping.promise.probe(address);
    return alive;
  } catch (error) {
    error(error);
    process.exit(1);
  }
}
