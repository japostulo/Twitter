var knex = require('../connection')
var pusher = require('../connectionPusher')

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
            var post = {
                type:'Tweet',
                method:'GET',
                id: post,
                post:req.post, 
                user_id:req.user_id,
                likes: [],
                image_post:null,
                comments:0,
                created_at:req.created_at,
                user:{
                    id:req.user_id,
                    name: req.name,
                    username: req.username,
                    image: req.image
                }
                
            }

            pusher.trigger('createPost', 'App\\Events\\Post\\UserCreatedPost', {
                post
            });

            // app.sendAll(JSON.stringify(tweet))
            res.json({
                message: 'Post inserido com sucesso'
            })
        })
        .catch(error => res.status(404).json({error}))
}


exports.get = (req, res) =>{
    console.log('Entrou')
        knex('posts')
            .select('posts.*','name', 'username','email','image',{
                comments: function() {
                    this.count('*').from('comments').where('posts.id', 'comments.post_id')
                    },
                likes: function() {
                    this.count('*').from('likes').where('posts.id', 'likes.post_id') 
                    },
            })
            .innerJoin('users', 'users.id', 'posts.user_id')
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

            var post = {
                id: req.params.id
            }

            pusher.trigger('deletePost', 'App\\Events\\Post\\UserDeletePost', {
                post
            });

            // app.sendAll(JSON.stringify(tweet))
            
            res.json({
                success: `Post ${req.params.id} deletado com sucesso`
            })
        })
        .catch(error =>{res.status(404).json({error})})
}