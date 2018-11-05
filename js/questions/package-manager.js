module.exports =  [
  {
    'name': 'pkm',
    type: 'number',

    validate(value) {

      if(isNaN(value) || value < 1 || value > 2) {
        return "Please enter a valid number"
      }

      return true;
    },    
    message: `Which package manager do you wish to use?
      1-Yarn (recommended)
      2-Npm
    `,

  }
]