var knex = require('../connection')
var pusher = require('../connectionPusher')

exports.get = (req, res) =>{
    knex.select()
        .table('likes')
        .then((likes) =>{
            res.json({
              likes
            })
        })
}


exports.getUserLike = (req, res) =>{

  knex.select()
      .table('likes')
      .where('user_id', req.params.id)
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
          var like = {
            user_id:req.query.user_id,
            post_id: req.query.post_id,
          }

          pusher.trigger('Home', 'like', {
            like
          })
          
          res.json({
            success: `Like adicionado com sucesso`
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

