<template>
    <div>
        <div class="row">
            <!-- Image -->
            <div class="col-md-auto p-0 m-0 post-img">
                <img :src="postData.image" alt="profile photo">

            </div>

            <!-- Info -->
            <div class="col p-0 mt-3">
                <div class="row">
                    <div class="col-md-auto">
                        <span style="font-weight:bold">
                            {{postData.name}}
                        </span>
                         @{{postData.username}}. {{postData.created_at}}
                    </div>
                    <!-- COLLAPSE -->
                    <div class="col d-flex justify-content-end mr-4" v-if="dataUser.username == postData.username">
                        <span class="fa fa-angle-down" data-toggle="collapse" :data-target="`#collapse${postData.id}`" aria-expanded="false" aria-controls="collapseExample"></span>
                        <div class="collapse mt-3 position-absolute bg-white" :id="`collapse${postData.id}`">
                            <div class="row">
                                <div class="col">
                                    <table>
                                        <tr>
                                            <td>
                                                <button class="btn"> <span class="fa fa-edit"></span> Editar </button>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                
                                                <button class="btn text-danger" @click="deletePost"> <span class="fa fa-trash text-danger"></span> Excluir </button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col ">
                        <p>
                            {{postData.post}}
                        </p>
                            
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-auto">
                        <span class="fa fa-comment"></span>
                    </div>
                    <div class="col-md-auto">
                        <span class="fa fa-thumbs-up" :class="{'text-primary' :  like.likeCurrentUser != 0}" @click="validateLike"> <small> {{like.length}} </small> </span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['postData', 'userImage', 'dataUser'],
    data(){
        return{
            selected:true,
            connection: null,
            like: {
                likeCurrentUser:false,
                data:null,
                length:'',
                connection: null
            },

        }
    },
    methods:{
        deletePost(){
            axios.delete(`http://localhost:8000/tweet/${this.postData.id}`)
            .catch(err =>{console.log(err)})
        },

        async getLikes(){
            this.like.data = await axios.get(`http://localhost:8000/likes/${this.postData.id}`)
            this.like.data = this.like.data.data

            if(this.like.data.user != ''){
                this.like.likeCurrentUser = this.like.data.user.filter((post)=> {
                    return post.user_id == this.dataUser.id
                })
                this.like.length = this.like.data.user.length
            }   
        },

        async removeLike(){
            await axios.delete(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${this.postData.id}&username=${this.dataUser.username}`)
            .then(this.like.likeCurrentUser = 0, this.like.length--)
            .catch(err =>{console.log(err)})
        },

        async addLike(){
            await axios.post(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${this.postData.id}&username=${this.dataUser.username}`)
            .then(this.like.likeCurrentUser = 1,
                    this.like.length++    )
            .catch(err =>{console.log(err)})
        },

        validateLike(){
            this.like.likeCurrentUser != 0 ? this.removeLike() : this.addLike()
        },
        getHour(){

        }

    },
    watch:{
        selected(){
            console.log(this.selected)
        }
    },
    mounted(){
        this.getLikes();
    }

}
</script>

<style>
    .post-img{
            margin-right:1rem;
        }
        
    .post-img img{
        border-radius:50rem;
        max-width:60px;
        min-width:60px;
        min-height:60px;
        max-height:60px;
        margin:1rem;
    }
    .unselected{
        box-shadow: 0 0 0 0; 
        border: 0 none; 
        outline: 0;
    }
</style>