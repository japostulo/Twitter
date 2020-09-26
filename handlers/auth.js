var knex = require("./connection")

exports.get = (req, res) =>{
    // Trocar para método POST (req.body.id)
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
        res.json({
          success:auth
        })
      }) 
      .catch(err =>{res.status(400).json({err})})
  }