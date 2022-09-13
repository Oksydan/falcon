const clear = require('clear');
const figlet = require('figlet');
const ora = require('ora');
const execa = require('execa');
const { detectPnpm, detectYarn } = require('../helpers/node');
const EnvCreator = require('../EnvCreator');
const { log, successLog , breakLine } = require('../helpers/log');
const { prompt } = require('../helpers/prompt');
const { checkAddress } = require('../helpers/host');

const init = async () => {
  clear();

  log(
    figlet.textSync('FALCON CLI', {
      horizontalLayout: 'universal smushing'
    }),
    true
  );

  if (EnvCreator.detectIfEnvAlreadyExists()) {
    await processPromptFileEnvAlreadyExists();
  } else {
    await processPromptEnvConfiguration();
  }
}

const processPromptEnvConfiguration = async () => {
  const envCreator = new EnvCreator();

  let { serverAddress } = await serverPrompt('What is your server address (ex. domain.test)?');

  const hostReachable = await checkAddress(serverAddress);

  if (!hostReachable) {
    let { changeHost } = await prompt([
      {
        type: 'confirm',
        name: 'changeHost',
        message: `Looks like ${serverAddress} is unreachable. Do you want to change server address?`,
      },
    ]);

    if (changeHost) {
      let res = await serverPrompt();
      serverAddress = res.serverAddress;
    }
  }

  const { serverPort, physicalUri, buildAssets } = await basicPrompt();

  envCreator.serverAddress = serverAddress;
  envCreator.serverPort = serverPort;
  envCreator.physicalUri = physicalUri;

  envCreator.buildEnvFile();

  if (buildAssets) {
    const { packageManager } = await packageManagerPrompt();
    let args = [];

    const assetsBuildSpinner = ora({
      text: 'Building assets',
      spinner: {
        frames: ['🐧', '💻', '🚀'],
        interval: 300,
      },
    })

    assetsBuildSpinner.start();

    if (packageManager === 'npm') {
      args.push('run');
    }

    args.push('build');

    try {
      await execa(packageManager, args);
    }  catch (error) {
      error(error);
      process.exit(1);
    }

    assetsBuildSpinner.stop();
    successMessage();
  } else {
    successMessage();
  }
}

const serverPrompt = async () => {
  return prompt([
    {
      type: 'text',
      name: 'serverAddress',
      message: 'What is your server address (ex. domain.test)?',
      default: '',
    },
  ]);
}

const basicPrompt = async () => {
  return prompt([
    {
      type: 'text',
      name: 'physicalUri',
      message: 'What is you physical uri?',
      default: '/',
    },
    {
      type: 'text',
      name: 'serverPort',
      message: 'Port for webpack dev server (press enter use default)?',
      default: '3505',
    },
    {
      type: 'confirm',
      name: 'buildAssets',
      message: 'Would you like to build theme assets?',
    },
  ]);
}

const packageManagerPrompt = async () => {
  return prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'What package manager would you like to use?',
      choices: getPackageManagerChoices(),
    },
  ]);
}

const processPromptFileEnvAlreadyExists = async () => {
  const { envOverride } = await prompt([
    {
      type: 'list',
      name: 'envOverride',
      message: 'Your env file already exists. Would you like to override it?',
      choices: ['yes', 'no'],
    },
  ]);

  envOverride == 'yes' && await processPromptEnvConfiguration();
}

const successMessage = () => {
  breakLine();
  successLog('🎉 You are ready to use Falcon theme 🎉');
  breakLine();
  process.exit(0);
}

const getPackageManagerChoices = () => {
  const packageManagerChoices = ['npm'];

  if (detectYarn()) {
    packageManagerChoices.push('yarn')
  }

  if (detectPnpm()) {
    packageManagerChoices.push('pnpm')
  }

  return packageManagerChoices;
}

module.exports = init;
