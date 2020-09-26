<template>
    <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <!-- Content -->

        <div class="content p-2">
            <h5 style="font-weight:bold">Home</h5>
            <hr class="m-0">
            <tweet-message :dataUser="dataUser"/>
            <hr>
            <tweet :dataUser="dataUser" :likes="likes" v-for="(post, index) in tweets" :key="index" :postData="post" userImage="https://novatopnet.com.br/wp-content/uploads/2012/10/anime.jpg"/>
        </div>  

        <div class="modal fade" id="tweetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex d-flex justify-content-start">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true" style="color:#1da1f2">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <tweet-message :dataUser="dataUser"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import TweetMessage from '../components/TweetMessage'
import Tweet from '../components/Tweet'
import axios from 'axios'

export default {
    components:{
        TweetMessage,
        Tweet,
    },
    props:['dataUser'],
    data(){
        return{
            tweets:'',
            teste:'',
            likes:[],
        }
    },
    methods:{
        async loadPost(){
            let posts = await axios.get("http://localhost:8000/tweet")
            // console.log(this.likes.likes)
            posts.data.post = posts.data.post.map((post) => {
                console.log("Entrou")
                let likes = this.likes.forEach((like)=>{
                                console.log(like)
                                console.log(post.id)
                            })

                // console.log(likes)
                return {
                    comments: post.comment,
                    likes: likes,
                    id: post.id,
                    post: post.post,
                    created_at: post.created_at,
                    updated_at: post.updated_at,
                    user:{
                        id: post.user_id,
                        name: post.name,
                        username: post.username,
                        email: post.email,
                        image: post.image,
                    },
                    image_post: post.image_post,
                    }
            })
            this.tweets = posts.data.post
        },

        deletePost(data){
            this.tweets = this.tweets.filter(tweet =>{
                return tweet.id != data.id
            })

        },
        editPost(data){
            this.tweets.map(tweet =>{
                tweet.id == data.id ? tweet.post = data.post:false
            })
        },
        addPost(data){
            this.tweets.unshift(data)
        },

        async getLikes(){
            this.likes = await axios.get(`http://localhost:8000/likes/`)
            this.likes = this.likes.data.likes
            // console.log(this.like)
            this.loadPost()
        },



        // async removeLike(){
        //     await axios.delete(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${this.postData.id}`)
        //     .then()
        //     .catch(err =>{console.log(err)})
        // },

        // async addLike(){
        //     await axios.post(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${this.postData.id}`)
        //     .then()
        //     .catch(err =>{console.log(err)})
        // },

    },

    mounted(){
        /*
        eslint-disable
        */
        try{
    
            var channelHome = pusher.subscribe('Home');

            channelHome.bind('createPost', (data) => {
                this.addPost(data.post)
            });

            channelHome.bind('deletePost', (data) => {
                this.deletePost(data.post)
            });

            channelHome.bind('editPost', (data) =>{
                this.editPost(data.post)
            })

            channelHome.bind('like', (data) =>{
                console.log(data)
            })


            this.getLikes()
        }

        catch(err){
            console.log(`Erro capturado durante a conexão com o Pusher \n\n${err}`)
        }

    }

}
</script>

<style>

</style>