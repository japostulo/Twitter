var knex = require("./connection")


exports.get = (req, res) =>{
  

  knex('users')
    .where({
      username:req.query.id,
      password: req.query.password
    })
    .orWhere({
      email:req.query.id,
      password: req.query.password
    })
    .orWhere({
      id:req.query.id,
      password: req.query.password
    })
    .then(auth =>{
      // req.session.id = req.query.id
      // req.session.password = req.query.password

      res.json({
        success:auth
      })
    }) 
    .catch(err =>{res.status(400).json({err})})
  }