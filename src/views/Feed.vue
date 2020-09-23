<template>
    <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <!-- Content -->

        <div class="content p-2">
            <h5 style="font-weight:bold">Home</h5>
            <hr class="m-0">
            <tweet-message :dataUser="dataUser"/>
            <hr>
            <tweet :dataUser="dataUser" v-for="(post, index) in tweets" :key="index" :postData="post" userImage="https://novatopnet.com.br/wp-content/uploads/2012/10/anime.jpg"/>
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
        }
    },
    methods:{
        async loadPost(){
            let posts = await axios.get("http://localhost:8000/tweet")
            
            // var response = {
            //     comments: post.comment,
            //     likes: post.like,
            //     id: post.id,
            //     post: post.post,
            //     created_at: post.created_at,
            //     updated_at: post.updated_at,
            //     user:{
            //         id: post.user_id,
            //         name: post.name,
            //         username: post.username,
            //         email: post.email,
            //         image: post.image,
            //     },
            //     image_post: post.image_post,
            // }
            /*
                eslint-disable
            */
           console.log(posts.data.post)
           posts.data.post = posts.data.post.map((post) => {
                return {
                    comments: post.comment,
                    likes: post.like,
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
            console.log(posts.data.post)
            // console.log(posts.data.post)
            this.tweets = posts.data.post
        },

        deletePost(data){
            this.tweets = this.tweets.filter(tweet =>{
                return tweet.id != data.id
            })
        },
        addPost(data){
            this.tweets.unshift(data)
        },

    },


    mounted(){
        /*
        eslint-disable
        */
        Pusher.logToConsole = true;

        var pusher = new Pusher('1274225ed523873978b3', {
        cluster: 'mt1'
        });

        var channel = pusher.subscribe('createPost');
        channel.bind('App\\Events\\Post\\UserCreatedPost', (data) => {
            console.log(data)
            this.addPost(data.post)
        });

        var channel = pusher.subscribe('deletePost');
        channel.bind('App\\Events\\Post\\UserDeletePost', (data) => {
            this.deletePost(data.post)
        });

        
        
        console.log(this.dataUser)
        this.loadPost()
        this.connection  = new WebSocket('ws://localhost:8001/tweet')

        this.connection.onopen = () =>{
            console.log("Estabelecido conexão com a rota tweet");
        }

        this.connection.onmessage = ({data}) =>{
            data = JSON.parse(data)

            if(data.type == 'Tweet'){

                if(data.method == 'GET'){
                    this.addPost(data)
                }

                else if(data.method == 'DELETE'){
                    this.deletePost(data)
                }

                else{
                    console.log("Não existe o método")
                }
            }

            if(data.type == 'Like'){

                if(data.method == 'GET'){
                    this.tweet = this.tweets.map((tweet) => {
                        if(tweet.id == data.post_id){
                            return tweet.name = 'João Lindo'
                        }
                        return tweet
                    })
                }

            }

            else{
                console.log("Type não encontrado")
            }
            
        }
    }

}
</script>

<style>

</style>