const fs = require('fs');
var {versionsPath} = require('../../paths');

function getAllVersionNumbers() {
    

  var dirs = fs.readdirSync(versionsPath);
  
  dirs = dirs.filter(name => {
    const stats = fs.lstatSync(`${versionsPath}\\${name}`);
    return stats.isDirectory();
  });
  
  dirs = dirs.sort((a, b) => {
    a = a.split('.');
    b = b.split('.');
  
    a[0] = parseInt(a[0]);
    a[1] = parseInt(a[1]);
    a[2]= parseInt(a[2]);
  
    b[0]= parseInt(b[0]);
    b[1] = parseInt(b[1]);
    b[2] = parseInt(b[2]);  
  
    if(a[0] > b[0]) {
      return true;
    } else if(a[0] < b[0]) {
      return false
    } else {
      if(a[1] > b[1]) {
        return true;
      } else if(a[1] < b[1]) {
        return false
      } else {
        if(a[2] > b[2]) {
          return true
        }
      }
    }
    return false;
  });

  return dirs;
}

module.exports = {
  getAllVersionNumbers,
  getLatestVersionAvailable() {
  
    const versions = getAllVersionNumbers();
    return versions[versions.length - 1];
  },
  getCurVersion() {
    return fs.readFileSync(`version.txt`,'utf-8');
  }
}