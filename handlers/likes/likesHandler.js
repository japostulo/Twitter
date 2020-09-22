var knex = require('../connection')
var app = require('../app')

exports.get = (req, res) =>{
    knex.select()
        .table('likes')
        .then((likes) =>{
            res.json({
              likes
            })
        })
}

exports.getOne = (req, res) =>{
    knex.select()
        .table('likes')
        .where("post_id", req.params.id)
        .then((user) =>{
          res.json({
            user
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

exports.store = (req, res) => {
    knex("likes")
        .insert({
          user_id: req.query.user_id,
          post_id: req.query.post_id,
        })
        .then((user) =>{
          var response = {
            type:'Like',
            method:'GET',
            username:req.query.username,
            post_id: req.query.post_id,
          }
          app.sendAll(JSON.stringify(response))
          res.json({
            success: `Comentário criado com sucesso`
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

exports.delete = (req, res) => {
    knex('likes')
        .where("user_id", req.query.user_id)
        .andWhere("post_id", req.query.post_id)
        .delete()
        .then((user) =>{
          res.json({
            success: `Like ${req.query.id} foi deletado com sucesso`
          })
        })
        .catch(err =>{res.status(404).json({err})})
}

