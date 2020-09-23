module.exports = require('knex')({
    client: 'mysql',
    connection: {
      host : '50.116.112.31',
      user : 'tourvi45_admin',
      password : '123456',
      database : 'tourvi45_Twitter'
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