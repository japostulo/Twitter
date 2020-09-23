<template>


    <div class="row">
        <!-- Navbar -->
        <div class="col-md-3 bg-danger d-flex justify-content-end p-0">
            <Navbar :dataUser="dataUser"/>
        </div>

        <!-- <router-view name="content"/> -->
        <div class="col">
            <div class="content p-2">
                <h5 style="font-weight:bold">Home</h5>
                <hr class="m-0">
                <tweet-message :dataUser="dataUser"/>
                <hr>
                <tweet :dataUser="dataUser" v-for="(post, index) in tweets" :key="index" :postData="post" userImage="https://novatopnet.com.br/wp-content/uploads/2012/10/anime.jpg"/>
            </div>  
        </div>
        
        <div class="col-4">
            <!-- What's Happening -->
            O que estas acontecendo? 
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
                    </div>t
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'
import pusher from 'pusher'

export default {
    components:{
        Navbar,
    },
    props:['dataUser'],
    data(){
        return{
            tweets:'',
        }
    },
    methods:{
        async loadPost(){
            let posts = await axios.get("http://localhost:8000/tweet")
            this.tweets = posts.data.post
        },

        deletePost(data){
            console.log("Post deletado")
            this.tweets = this.tweets.filter(tweet =>{
                return tweet.id != data.id
            })
        },
        addPost(data){
            this.tweets.unshift(data)
        }
    },
    mounted(){

        console.log(this.dataUser)
        this.loadPost()
        this.connection  = new WebSocket('ws://localhost:8001/tweet')

        this.connection.onopen = () =>{
            console.log("Estabelecido conexão com a rota tweet");
        }

        this.connection.onmessage = ({data}) =>{
            data = JSON.parse(data)

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
    }
}
</script>

<style>
.content{
    border:1px solid black
}

</style>