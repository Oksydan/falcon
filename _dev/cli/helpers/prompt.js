const inquirer = require('inquirer');

exports.prompt = async (promptArray) => {
  try {
    return inquirer.prompt(promptArray)
  } catch (error) {
    error(error);
    process.exit(1);
  }
}
