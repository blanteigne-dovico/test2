const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');


module.exports = function() {

  console.log(
    chalk.magenta(
      figlet.textSync('Goodbye!', { horizontalLayout: 'full' })
    )
    
  );

}