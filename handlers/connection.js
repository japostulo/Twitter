module.exports = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'japostulo',
      password : '123456',
      database : 'twitter'
    },
    log:{
      warn(message){
        console.log(message)
      },
      error(message){
        console.log(message)
      }
    }
  });