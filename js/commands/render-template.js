const fs = require('fs');

module.exports = function(inputPath, variables = {}) {

  let template = fs.readFileSync(inputPath, `utf-8`);
  Object.keys(variables).forEach(variable => {
    template = template.replace(new RegExp (variable, 'g'), variables[variable]);
  });

  return template;
}