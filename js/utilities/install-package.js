const { execSync } = require('child_process');

module.exports = function(pkm, package, isDev) {
  let command = ''
  switch(pkm) {
    case "yarn": {
      command = `yarn add ${package}`;

      if(isDev) {
        command += ` --dev`;
      }
      break;
    }
    case "npm": {
      command = `npm install ${package} `

      if(isDev) {
        command += ` --save-dev`;
      } else {
        command += ` --save`;
      } 

      break;
    }
    default: {
      throw "Non existing package manager";
    }

    command += ` ${flags}`
  }

  execSync(command, {stdio:[0,1,2]});

}