const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const { execSync } = require('child_process');
const ncp = require('ncp').ncp;
const deepMerge = require('deepmerge');
const installPackage = require('../utilities/install-package');
const { cliPath, curDirPath, versionsPath} = require('../../paths');
const {getLatestVersionAvailable} = require('../utilities/version-helper');

module.exports = function(pkm, appName, version) {

  console.log(
    chalk.yellow(
      figlet.textSync('Creating a new app!', { horizontalLayout: 'full' })
    )
  );

  if(!version) {
    version = getLatestVersionAvailable();
  } 

  var newAppPath = `${curDirPath}\\${appName}`;

  ncp(`${versionsPath}\\${version}`, `${newAppPath}`, (err) => {
    fs.unlinkSync(`${newAppPath}\\package.json`);

    console.log(`${pkm}  init --cwd ${newAppPath}`);
    execSync(`${pkm}  init --cwd "${newAppPath}"`, {stdio:[0,1,2]});

    const versionPkgJson = fs.readFileSync(`${versionsPath}\\${version}\\package.json`, `utf-8`);
    const userPkgJson = fs.readFileSync(`${newAppPath}\\package.json`, `utf-8`);


    const emptyTarget = value => Array.isArray(value) ? [] : {}
    const clone = (value, options) => merge(emptyTarget(value), value, options)
     
    function combineMerge(target, source, options) {
        const destination = target.slice()
     
        source.forEach(function(e, i) {
            if (typeof destination[i] === 'undefined') {
                const cloneRequested = options.clone !== false
                const shouldClone = cloneRequested && options.isMergeableObject(e)
                destination[i] = shouldClone ? clone(e, options) : e
            } else if (options.isMergeableObject(e)) {
                destination[i] = merge(target[i], e, options)
            } else if (target.indexOf(e) === -1) {
                destination.push(e)
            }
        })
        return destination
    }
    const finalPkg = deepMerge(JSON.parse(versionPkgJson), JSON.parse(userPkgJson), {
      arrayMerge: combineMerge
    });

    fs.unlinkSync(`${newAppPath}\\package.json`);
    fs.writeFileSync(`${newAppPath}\\package.json`, JSON.stringify(finalPkg, null, 2));

    execSync(`${pkm}  install --cwd "${newAppPath}"`, {stdio:[0,1,2]});

  })

}
