#!/usr/bin/env node

// import chalk from 'chalk';
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const execa = require('execa');
const ora = require('ora');


// import { getCurrentDirectoryBase, directoryExists } from './helpers/files';

clear();

console.log(
  figlet.textSync('Modern Prestashop Starter Theme', {
    horizontalLayout: 'full'
  })
);

const run = () => {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'themeName',
        message: 'What is your theme name?',
        default: 'starter'
      },
      {
        type: 'text',
        name: 'serverAddress',
        message: 'What is your server address (ex. domain.test)?',
        default: ''
      },
      {
        type: 'text',
        name: 'serverPort',
        message: 'Port for webpack dev server (press enter use default)?',
        default: '3505'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'What package manager would you like to use?',
        choices: [
          'yarn',
          'npm',
        ],
      },
      {
        type: 'confirm',
        name: 'buildAssets',
        message: 'Would you like to build theme assets?',
        default: ''
      },
    ])
    .then((answers) => {
      const { themeName, serverAddress, serverPort, packageManager, buildAssets } = answers;
      let command = packageManager;

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

        const child = execa(command, args);

        child.stdout.on('data', function (data) {
        });
        child.stderr.on('data', function (data) {
        });

        child.on('close', code => {
          assetsBuildSpinner.stop();
          if (code !== 0) {
            new Error(`command failed: ${command} ${args.join(' ')}`)
            return
          }
          console.log('You are ready to use Modern Prestashop Starter Theme')
          process.exit(0);
        });
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
};

run();
