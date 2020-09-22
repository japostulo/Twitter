var knex = require('../connection')

exports.get = (req, res) =>{
    knex.select()
        .table('users')
        .then((users) =>{
            res.json({
              users
            })
        })
}

exports.getOne = (req, res) =>{
    knex.select()
        .table('users')
        .where("id", req.params.id)
        .then((user) =>{
          res.json({
            user
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

exports.store = (req, res) => {
    knex("users")
        .insert({
          name:req.body.name,
          email: req.body.email,
          password: req.body.password,
          image:req.body.image,
        })
        .then((user) =>{
          res.json({
            success: `Usuário ${req.body.name} criado com sucesso`
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

exports.delete = (req, res) => {
    knex('users')
        .where("id", req.params.id)
        .delete()
        .then((user) =>{
          res.json({
            success: `Usuário ${req.params.id} foi deletado com sucesso`
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

