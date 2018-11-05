const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const appNameQuestion = require('../questions/app-name');

module.exports = function() {

  return inquirer.prompt(appNameQuestion).then(appName => appName.appName)

}