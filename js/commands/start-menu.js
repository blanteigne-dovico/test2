const inquirer = require('inquirer');
const initQuestionPrompt = require('../questions/init');
const choosePakageManager = require('./choose-package-manager');
const createApp = require('./create-app');
const quit = require('./quit');
const askAppName = require('./ask-app-name');

module.exports = function() {


  return inquirer.prompt(
    initQuestionPrompt
  ).then( answer => {
    switch(answer.choice) {
      case 1: {
        askAppName().then(value => {
          const appName = value;
          console.log(appName + "lala")
          choosePakageManager()
          .then( pkm => {
            createApp(pkm, appName);
            return pkm;
          });
        });

        break;
      }
      case 2: {
        quit();
        break;
      }
    }
  
  })  



}