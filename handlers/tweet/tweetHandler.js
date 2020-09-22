var knex = require('../connection')
var app = require('../app')
// const WebSocket = require("ws")

// const wss = new WebSocket.Server({port: 8001})

exports.store = (req, res) =>{
    req = req.query
    knex('posts')
        .insert({
            post:req.post, 
            user_id:req.user_id,
            created_at:req.created_at
        })
        .then((post)=>{
            var tweet = {
                type:'Tweet',
                method:'GET',
                id: post,
                post:req.post, 
                user_id:req.user_id,
                created_at:req.created_at,
                name: req.name,
                username: req.username,
                image: req.image
            }
            app.sendAll(JSON.stringify(tweet))

            res.json({
                message: 'Post inserido com sucesso'
            })
        })
        .catch(error => res.status(404).json({error}))
}


exports.get = (req, res) =>{
    knex.select('posts.id', 'post', 'posts.created_at', 'users.name', 'users.username', 'users.image')
        .table('posts')
        .innerJoin('users', 'users.id', 'user_id')
        .orderBy('posts.id', 'desc')
        .then((post)=>{
            res.json({
                post
            })
        })
        .catch(error => res.status(404).json({error}))
}

exports.getOne = (req, res) =>{
    knex('posts')
        .where({
            id: req.params.id
        })
        .then((post) =>{
            res.json({
                post
            })
        })
        .catch(error =>{res.status(404).json({error})})
}

exports.update = (req, res) =>{
    knex('posts')
        .where('id', req.params.id)
        .update({
            post: req.body.post
        })
        .then((post) =>{
            res.json({
                success: 'Post atualizado com sucesso'
            })
        })
        .catch(error =>{res.status(404).json({error})})
}

exports.delete = (req, res) =>{
    knex('posts')
        .where('id', req.params.id)
        .del()
        .then(() =>{
            var tweet = {
                method: 'DELETE',
                id: req.params.id
            }
            app.sendAll(JSON.stringify(tweet))
            
            res.json({
                success: `Post ${req.params.id} deletado com sucesso`
            })
        })
        .catch(error =>{res.status(404).json({error})})
}