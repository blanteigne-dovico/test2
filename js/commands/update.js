const {getLatestVersionAvailable} = require('../utilities/version-helper');
const fs = require('fs');
const {curDirPath, cliPath, versionsPath} = require('../../paths');
var diff = require('json-patch-gen');
const { applyPatch } = require('fast-json-patch');
const filterOut = ['webpack.common.js', 'webpack.dev.js', 'webpack.prod.js'];
module.exports = (pkg, targetVersion) => {
  if(!targetVersion) {
    targetVersion = getLatestVersionAvailable();
  }

  const currentVersion = fs.readFileSync(`version.txt`,'utf-8');


  const rootFiles = fs.readdirSync(`${versionsPath}\\${targetVersion}`).filter(
    (name) => {
      const stats = fs.lstatSync(`${versionsPath}\\${targetVersion}\\${name}`);
      return !stats.isDirectory() && !filterOut.includes(name);
    }
  )

  rootFiles.map(file => {
    const content = fs.readFileSync(file,'utf-8');

    try {
      if(!file.endsWith("json")) {
        JSON.parse(content);
      }
      
      const curVersionFile = fs.readFileSync(`${versionsPath}\\${currentVersion}\\${file}`,'utf-8');
      const targetedVersionFile = fs.readFileSync(`${versionsPath}\\${targetVersion}\\${file}`, `utf-8`);
      
      const patch = diff(JSON.parse(curVersionFile), JSON.parse(targetedVersionFile));
      applyPatch(patch);

    } catch(ex) {

     
      fs.copyFileSync(`${versionsPath}\\${targetVersion}\\${file}`, `${curDirPath}\\${file}`)
    }
  });

  function traverseDirectory(dirName, callbackDirectory, callbackFile) {

    callbackDirectory(dirName);
    fs.readdirSync(dirName).forEach(name => {
      const stats = fs.lstatSync(`${dirName}\\${name}`);
      if(stats.isDirectory()) {
        
        traverseDirectory(`${dirName}\\${name}`, callbackDirectory, callbackFile);
      } else {

        if(name.startsWith('_')) {
          callbackFile(`${dirName}\\${name}`);
        }
        
      }
    });


  }

  function logDirectory(dir, ver) {
    let data = {};

    traverseDirectory(dir, callbackDirectory, callbackFile);

    function callbackDirectory(dirPath) {
      data[dirPath.split(ver)[1]] = dirPath;
    }

    function callbackFile(filePath) {
      data[filePath.split(ver)[1]] = filePath;
    }

    return data;
  }

  let currentFileStruct = logDirectory(`${versionsPath}\\${currentVersion}\\src`, currentVersion);
  let targetFileStruct = logDirectory(`${versionsPath}\\${targetVersion}\\src`, targetVersion);
  let fileDiff = diff(currentFileStruct, targetFileStruct);

  let addFile = fileDiff.filter(action => action.op === 'add');
  let removeFile = fileDiff.filter(action => action.op === 'remove').reverse();
  let replaceFile = fileDiff.filter(action => action.op === 'replace');

  addFile.forEach((file) => {
    currentFile = `${curDirPath}${file.path.slice(1)}`;
    targetFile = `${versionsPath}\\${targetVersion}${file.path.slice(1)}`;
    
    let stats = fs.lstatSync(targetFile);
    if(stats.isDirectory()) {
      fs.mkdirSync(currentFile);
    } else {
      fs.copyFileSync(targetFile, currentFile);
    }

  });

  removeFile.forEach((file) => {

    let stats = fs.lstatSync(`${curDirPath}${file.path.slice(1)}`);
    if(stats.isDirectory()) {
      fs.rmdirSync(`${curDirPath}${file.path.slice(1)}`);
    } else {
      fs.unlinkSync(`${curDirPath}${file.path.slice(1)}`);
    }
  });

  replaceFile.forEach(file => {
    let currentFile = `${curDirPath}${file.path.slice(1)}`;
    let targetFile = `${versionsPath}\\${targetVersion}${file.path.slice(1)}`;


    let stats = fs.statSync(targetFile);
    if(stats.isFile()) {
      let tmp = targetFile.split('\\');
      let checkFile = tmp.pop().slice(1);
      checkFile = tmp.join('\\') + '\\' + checkFile;
      tmp = checkFile.split(targetVersion)[1];
      
      let speciale = `${curDirPath}${tmp}`;

      if(!fs.existsSync(speciale)) {
        fs.copyFileSync(targetFile, currentFile);
      }
      
      
    }
  });
}