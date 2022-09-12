const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const ora = require('ora');
const execa = require('execa');
const { detectPnpm, detectYarn } = require('../helpers/node');
const EnvCreator = require('../EnvCreator');

const init = async () => {
  clear();

  console.log(
    figlet.textSync('FALCON CLI', {
      horizontalLayout: 'universal smushing'
    })
  );

  if (EnvCreator.detectIfEnvAlreadyExists()) {
    await processPromptFileEnvAlreadyExists();
  } else {
    await processPromptEnvConfiguration();
  }
}

const processPromptEnvConfiguration = async () => {
  const envCreator = new EnvCreator();

  inquirer
    .prompt([
      {
        type: 'text',
        name: 'serverAddress',
        message: 'What is your server address (ex. domain.test)?',
        default: '',
      },
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
      {
        type: 'list',
        name: 'packageManager',
        message: 'What package manager would you like to use?',
        choices: getPackageManagerChoices(),
      },
    ])
    .then(async (answers) => {
      const { serverAddress, serverPort, physicalUri, packageManager, buildAssets } = answers;
      let command = packageManager;

      envCreator.serverAddress = serverAddress;
      envCreator.serverPort = serverPort;
      envCreator.physicalUri = physicalUri;

      envCreator.buildEnvFile();

      if (buildAssets) {
        const assetsBuildSpinner = ora({
          text: 'Building assets',
          spinner: {
            frames: ['🐧', '💻', '🚀'],
            interval: 300,
          },
        })
        let args = [];

        assetsBuildSpinner.start();

        if (packageManager === 'npm') {
          args.push('run');
        }

        args.push('build');

        try {
          await execa(command, args);
        }  catch (error) {
          console.log(error);
          process.exit(1);
        }

        assetsBuildSpinner.stop();
        console.log('You are ready to use Modern Prestashop Starter Theme')
        process.exit(0);
      } else {
        console.log('You are ready to use Modern Prestashop Starter Theme')
        process.exit(0);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

const processPromptFileEnvAlreadyExists = async () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'envOverride',
        message: 'Your env file already exists. Would you like to override it?',
        choices: ['yes', 'no'],
      },
    ])
    .then(async (answers) => {
      const { envOverride } = answers;

      envOverride == 'yes' && await processPromptEnvConfiguration();
    })
    .catch((error) => {

    })
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
