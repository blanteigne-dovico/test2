module.exports =  [
  {
    'name': 'choice',
    type: 'number',

    validate(value) {

      if(isNaN(value) || value < 1 || value > 2) {
        return "Please enter a valid number"
      }

      return true;
    },    
    message: `What do you want to do?
      1-Create a new application
      2-exit
    `,

  }
]