var path=require('path');
const fs = require('fs');

module.exports = {
  cliPath: path.dirname(fs.realpathSync(__filename)),
  curDirPath: process.cwd(),
  versionsPath: `${path.dirname(fs.realpathSync(__filename))}\\versions`,
  pagesPath: process.cwd() + '\\src\\views\\pages',
  layoutsPath: process.cwd() + '\\src\\views\\layouts',
  componentsPath: process.cwd() + '\\src\\views\\components',
  templatesPath: path.dirname(fs.realpathSync(__filename)) + "\\js\\templates"
}