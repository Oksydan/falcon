const inquirer = require('inquirer');
const { errorLog } = require('./log');

exports.prompt = async (promptArray) => {
  try {
    return inquirer.prompt(promptArray)
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }
}
