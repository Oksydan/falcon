const chalk = require('chalk');

const log = (message, newLine = false) => {
  console.log(message);
  newLine && breakLine();
}

const warning = (message, newLine = false) => {
  log(chalk.yellow(message), newLine);
}

const info = (message, newLine = false) => {
  log(chalk.blue(message), newLine);
}

const success = (message, newLine = false) => {
  log(chalk.green(message), newLine);
}

const error = (message, newLine = false) => {
  log(chalk.red(message), newLine);
}

const breakLine = () => {
  console.log('\n');
}

exports.log = log;
exports.warning = warning;
exports.info = info;
exports.success = success;
exports.error = error;
exports.breakLine = breakLine;
