const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const packageManagerQuestion = require('../questions/package-manager');

module.exports = function() {


  

  return inquirer.prompt(packageManagerQuestion)
    .then(answer =>{
      let pkm = 'yarn';

      if(answer.pkm == 2) {
        pkm = 'npm'
      }

      return pkm;
    });

}