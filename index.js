#!/usr/bin/env node

const figlet = require('figlet');
const chalk = require('chalk');
const startMenuCommand = require('./js/commands/start-menu');
const handleParameters = require('./js/commands/handle-parameters');
var {cliPath} = require('./paths');
var argv = require('minimist')(process.argv.slice(2));

if(argv._.length > 0) {
 handleParameters(argv); 
}
else 
{
  console.log(
    chalk.cyan(
      figlet.textSync('Dovico App!', { horizontalLayout: 'full' })
    )
    
  );

  startMenuCommand();
}


