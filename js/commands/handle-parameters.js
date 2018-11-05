const createApp = require('./create-app');
const createComponent = require('./create-new-component');
const update = require('./update');
const {getCurVersion, getAllVersionNumbers} = require('../utilities/version-helper');
const {componentsPath, layoutsPath, pagesPath} = require('../../paths');

module.exports = function(parameters) {
  switch(parameters._[0]) {
    case "create": {
      const appName = parameters._[1];
      if(!appName) {
        console.log("Error, you must specify a file name");
        return;
      }

      const pkm = parameters._[2] ? parameters._[2] : "yarn";

      if(pkm !== "yarn" && pkm !== "npm") {
        console.log("Error, only yarn and npm are available as package manager")
        return;
      }

      createApp(pkm, appName, parameters.version);
      break;
    }
    case "update": {
      update("yarn", parameters.version);
      break;
    }
    case "version": {
      console.log(getCurVersion());
      break;
    }
    case "versions": {
      console.log(getAllVersionNumbers());
      break;
    }
    case "new": {
      switch(parameters._[1]) {
        case "component": {
          createComponent(parameters, componentsPath);
          break;
        }
        case "page": {
          createComponent(parameters, pagesPath);
          break;
        }
        case "layout": {
          createComponent(parameters, layoutsPath);
          break;
        }
        default: {
          console.log("Error, invalid new type");
          break;
        }
        
      }
      return;
    }
    default: {
      console.log("Error, the specified command does not exits");
    }

  }
}