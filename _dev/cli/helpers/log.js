const chalk = require('chalk');

const log = (message, newLine = false) => {
  console.log(message);
  newLine && breakLine();
}

const warningLog = (message, newLine = false) => {
  log(chalk.yellow(message), newLine);
}

const infoLog = (message, newLine = false) => {
  log(chalk.blue(message), newLine);
}

const successLog = (message, newLine = false) => {
  log(chalk.green(message), newLine);
}

const errorLog = (message, newLine = false) => {
  log(chalk.red(message), newLine);
}

const breakLine = () => {
  console.log('\n');
}

exports.log = log;
exports.warningLog = warningLog;
exports.infoLog = infoLog;
exports.successLog = successLog;
exports.errorLog = errorLog;
exports.breakLine = breakLine;
