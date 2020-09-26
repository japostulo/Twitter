<template>
    <div>
        <div class="row">
            <!-- Image -->
            <div class="col-md-auto p-0 m-0 post-img">
                <img :src="postData.user.image" alt="profile photo">

            </div>

            <!-- Info -->
            <div class="col p-0 mt-3">
                <div class="row">
                    <div class="col-md-auto">
                        <span style="font-weight:bold">
                            {{postData.user.name}}
                        </span>
                         @{{postData.user.username}}. {{postData.user.created_at}}
                    </div>
                    <!-- COLLAPSE -->
                    <div class="col d-flex justify-content-end mr-4" v-if="dataUser.username == postData.user.username">
                        <span class="fa fa-angle-down" data-toggle="collapse" :data-target="`#collapse${postData.id}`" aria-expanded="false" aria-controls="collapseExample"></span>
                        
                        <div class="collapse mt-3 position-absolute bg-white" :id="`collapse${postData.id}`">
                            <div class="row">
                                <div class="col d-flex">
                                    <ul class="list-group position-absolute" style="right:1rem;top:0">

                                        <button class="list-group-item list-group-item-action  d-flex p-2 font-size text-light" 
                                            type="button" data-toggle="modal" :data-target="`#modalEdit${postData.id}`">
                                            <span class="fa fa-edit mr-2"></span> 
                                            <span>Editar</span> 
                                        </button>

                                        <button class="list-group-item list-group-item-action d-flex p-2 text-danger" 
                                            type="button" data-toggle="modal" :data-target="`#modalDelete${postData.id}`">
                                            <i class="fa fa-trash mr-2"></i> 
                                            <span>Excluir</span>
                                        </button>

                                    </ul>
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
                        <span class="fa fa-thumbs-up" :class="{'text-primary' :  like.likeCurrentUser != 0}" @click="validateLike(postData.id)"> <small> {{like.length}} </small> </span>
                    </div>
                </div>

                <!-- MODAL EXCLUIR -->
                <div class="modal fade" :id="`modalDelete${postData.id}`"  role="dialog">
                    <div class="modal-dialog modal-dialog-centered modal-sm rounded" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-center">Aviso</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center pb-0">
                                <p>Você está prestes a excluir seu post, se tiver certeza do que está fazendo, clique em confirmar, caso ao contrário, feche esse aviso</p>
                            </div>
                            <div class="modal-footer border-0 m-0 pt-0">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletePost">Deletar o post</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Sair</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" :id="`modalEdit${postData.id}`"  role="dialog">
                    <div class="modal-dialog modal-dialog-centered rounded" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title m-0 p-0">Editar o twitte</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <div class="d-flex bg-white" style="min-height:6rem">
                                    <div class="col col-sm-auto p-0 m-0 pr-2 d-flex justify-content-center align-items-top">
                                        <img :src="this.postData.image" class="rounded-circle" style="max-width:3rem;min-width:3rem;max-height:3rem;min-height:3rem" alt="profile photo">
                                    </div>
                                    <div class="col">
                                        <div class="row">
                                            <textarea class="w-100 border" 
                                                v-model.lazy="postData.post"
                                                rows="5" style="white-space:pre-wrap;outline:none;border:none;resize:none">
                                            </textarea>
                                        </div>
                                        <div class="row d-flex mt-2 justify-content-end">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editPost">Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

        async editPost(){
            await axios.patch(`http://localhost:8000/tweet/?post=${this.postData.post}&id=${this.postData.id}`)

        },

        async removeLike(id){
            await axios.delete(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${id}`)
            .then(this.like.likeCurrentUser = 0, this.like.length--)
            .catch(err =>{console.log(err)})
        },

        async addLike(id){
            await axios.post(`http://localhost:8000/likes/?user_id=${this.dataUser.id}&post_id=${id}`)
            .then(this.like.likeCurrentUser = 1,
                    this.like.length++    )
            .catch(err =>{console.log(err)})
        },

        validateLike(id){
            this.like.likeCurrentUser != 0 ? this.removeLike(id) : this.addLike(id)
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