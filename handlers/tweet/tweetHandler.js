var knex = require('../connection')
var pusher = require('../connectionPusher')

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

            pusher.trigger('Home', 'createPost', {
                post
            });

            res.json({
                message: 'Post inserido com sucesso'
            })
        })
        .catch(error => res.status(404).json({error}))
}

exports.get = (req, res) =>{
        // knex('likes')
        //     .select({postId: 'post.id'}, 'posts.post', 'likes.id', 'likes.post_id', 'likes.user_id')
        //     .innerJoin('posts', postID, 'likes.post_id')
        //     // .where(postId, 'likes.post_id')
        // .then((post)=>{
        //     res.json({
        //         post
        //     })
        // })
        // knex.select().from('likes').innerJoin('posts', 'posts.id', 'likes.post_id').where('likes.post_id', 'posts.id').count('*')
        
        // knex('users')
        // .join('contacts', 'users.id', '=', 'contacts.user_id')
        // .select('users.id', 'contacts.phone')
        // knex('posts')
        //     .select('posts.*','name', 'username','email','image',{
        //         comments: function() {
        //             this.from('comments').count()
        //             },
        //             // .where({
        //             //     'posts.id': 'likes.post_id'
        //             // })
        //         // likes: function(value) {
        //         //     this.select('id').from('likes').where('posts.id', 'likes.post_id')
        //         //     },
        //     })
        //     .innerJoin('users', 'users.id', 'posts.user_id')
        //     .orderBy('posts.id', 'desc')
        knex('posts').select('posts.*', 'name', 'username','email','image',)
        .innerJoin('users', 'users.id', 'posts.user_id')
        .count('likes.id as likes')
        .count('comments.id as comments')
        .leftJoin('likes','posts.id','likes.post_id')
        .leftJoin('comments','posts.id','comments.post_id')
        .orderBy('posts.id','desc')
        .groupBy('posts.id')
        .then((posts)=>{
            console.log(posts)
            res.json({
                posts
            })
        })
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
        .where('posts.id', req.query.id)
        .update({
            post: req.query.post
        })
        .then((post) =>{

            var post = {
                id: req.query.id,
                post: req.query.post,
            }

            pusher.trigger('Home', 'editPost',{
                post
            })

            res.json({
                post
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

            pusher.trigger('Home', 'deletePost', {
                post
            });
            
            res.json({
                success: `Post ${req.params.id} deletado com sucesso`
            })
        })
        .catch(error =>{res.status(404).json({error})})
}