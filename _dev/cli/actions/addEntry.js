const { errorLog , successLog } = require('../helpers/log');
const { prompt } = require('../helpers/prompt');
const EntryCreator = require('../EntryCreator');

const addEntry = async () => {
  const { entryName } = await entryPrompt();
  const entryCreator = new EntryCreator(entryName);

  try {
    entryCreator.setupThemeDirs();
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }

  if (!entryCreator.isEntryNameValid()) {
    errorLog('Provided entry name can\'t be empty');
    process.exit(1);
  } else if (entryCreator.checkIfEntryAlreadyExists()) {
    errorLog(`Entry named \'${entryName}\' already exists, please provide different entry name.`);
    process.exit(1);
  }

  try {
    await entryCreator.generateEntry();
    successLog('Entry added');
    process.exit(0);
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }
}

const entryPrompt = async () => {
  return prompt([
    {
      type: 'text',
      name: 'entryName',
      message: 'Please provide entry name:',
      default: '',
    },
  ]);
}

module.exports = addEntry;
