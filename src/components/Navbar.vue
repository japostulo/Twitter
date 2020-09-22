<template>
        <div class="col-auto col-md-2 col-lg-2 col-xl-3 col-sm-auto d-flex justify-content-end p-0"> 

            <nav class="p-0 m-0 navbar navbar-expand-xl d-flex align-items-start">

                <span class="navbar-toggler p-0" aria-expanded="false" aria-label="Toggle navigation">
                    
                    <router-link tag="a" :to="{path: '/'}" style="width:4rem; font-size: 2.0rem" class="text-center fa fa-twitter fa-2x mt-2"></router-link>

                    <router-link tag="li" to='/home' active-class="active" exact class="nav-item d-flex mt-3">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-home"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Explore"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-hashtag"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Notifications"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-bell"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Messages"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-envelope"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Bookmarks"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-bookmark"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Lists"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-list-alt"> </span>
                    </router-link>

                    <router-link tag="li" :to='{path:"Profile"}' active-class="active" exact class="nav-item d-flex mt-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-user"> </span>
                    </router-link>
                    
                    <router-link tag="li" to='/more' active-class="active" exact class="nav-item d-flex mt-4 mb-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-span-circle"> </span>
                    </router-link>

                    <router-link tag="li" to='/more' active-class="active" exact class="nav-item d-flex mt-4 mb-4">
                        <span style="width:4rem; font-size:2.0rem" class="text-center fa fa-info fa-2x"> </span>
                    </router-link>
                    
                    
                    <div class="d-flex align-items-end" style="height:28vh">
                        <div class="col-md-auto p-0 m-0 mr-1 d-flex align-items-center">
                            <img :src="dataUser.image" style="border-radius:50rem; max-width:55px; min-width:55px; min-height:55px; max-height:55px;" alt="profile photo">
                        </div>
                    </div>
                    

                    <!-- 
                    <button class="rounded-circle" style="background-color:#1da1f2; border:2px solid #1da1f2;" data-toggle="modal" data-target="#tweetModal">
                        <span style="width:4rem; font-size:2rem" class="text-center fa fa-user"> </span>    
                    </button> -->
                </span>

                <div class="col justify-content-end collapse navbar-collapse" id="navbarTogglerDemo01">
                
                    <ul class="nav flex-column" style="width:14rem"> 
                        
                        <router-link tag="a" :to="{path: '/'}" style="width:4rem" class="text-center fa fa-twitter fa-2x mt-2"></router-link>

                        <router-link tag="li" to='/home' active-class="active" exact class="nav-item d-flex mt-3">
                            <span style="width:4rem" class="text-center fa fa-home fa-2x"> </span>
                            <span> Home </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Explore"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-hashtag fa-2x"> </span>
                            <span> Explore </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Notifications"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-bell fa-2x"> </span>
                            <span> Notifications </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Messages"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-envelope fa-2x"> </span>
                            <span> Messages </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Bookmarks"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-bookmark fa-2x"> </span>
                            <span> Bookmarks </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Lists"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-list-alt fa-2x"> </span>
                            <span> Lists </span>
                        </router-link>

                        <router-link tag="li" :to='{path:"Profile"}' active-class="active" exact class="nav-item d-flex mt-4">
                            <span style="width:4rem" class="text-center fa fa-user fa-2x"> </span>
                            <span> Profile </span>
                        </router-link>
                        
                        <router-link tag="li" to='/more' active-class="active" exact class="nav-item d-flex mt-4 mb-4">
                            <span style="width:4rem" class="text-center fa fa-info fa-2x"> </span>
                            <span> More </span>
                        </router-link>

                        <button class="col p-0 m-0 btn btn-primary rounded-pill pt-2 pb-2" style="background-color:#1da1f2; border:2px solid #1da1f2; font-weight:bold" data-toggle="modal" data-target="#tweetModal">Tweet</button>
                        
                        <!-- Content -->
                        <div class="d-flex align-items-end" style="height:28vh">

                            <!-- Image -->
                            <div class="col-md-auto p-0 m-0 mr-1 d-flex align-items-center">
                                <img :src="dataUser.image" style="border-radius:50rem; max-width:55px; min-width:55px; min-height:55px; max-height:55px;" alt="profile photo">
                            </div>

                            <!-- Info -->
                            <div class="col p-0 mt-3">
                                <div class="row">
                                    <div class="col-md-auto p-0 ml-3">
                                        <span style="font-weight:bold; font-size:0.9rem">
                                            {{name}}
                                        </span>
                                    </div>
                                    <div class="col">
                                        <!-- Collapse -->
                                        <div>
                                            <span class="fa fa-angle-down" data-toggle="collapse" :data-target="`#collapse`" aria-expanded="false" aria-controls="collapseExample"></span>
                                            <div class="collapse mt-3 position-absolute bg-white" :id="`collapse`">
                                                <span class="text-danger" style="cursor:pointer" @click="$router.push('/login')"> <span class="fa fa-logout text-danger"></span> Sair </span>  
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="span ml-3">
                                                @{{username}}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </ul>

                    <!-- <div class="col bg-warning">
                        <div class="row">
                        
                            <div class="col-md-auto p-0 m-0 mr-1 d-flex align-items-center">
                                <img :src="dataUser.image" style="border-radius:50rem; max-width:55px; min-width:55px; min-height:55px; max-height:55px;" alt="profile photo">
                            </div>

                            <div class="col p-0 mt-3">
                                <div class="row">
                                    <div class="col-md-auto p-0 ml-3">
                                        <span style="font-weight:bold; font-size:0.9rem">
                                            {{name}}
                                        </span>
                                    </div>
                                    <div class="col">
                                        
                                        <div>
                                            <span class="fa fa-angle-down" data-toggle="collapse" :data-target="`#collapse`" aria-expanded="false" aria-controls="collapseExample"></span>
                                            <div class="collapse mt-3 position-absolute bg-white" :id="`collapse`">
                                                <span class="text-danger" style="cursor:pointer" @click="$router.push('/login')"> <span class="fa fa-logout text-danger"></span> Sair </span>  
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="span ml-3">
                                                @{{username}}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                </div>
            </nav>
        </div>
        
   
</template>

<script>
// import axios from 'axios'
export default {
    props:['dataUser'],

    data(){
        return{
            name:'',
            username:'',
            userImage:'https://novatopnet.com.br/wp-content/uploads/2012/10/anime.jpg',
        }
    },
    methods:{
        getData(){

        }
    },

    watch:{
        dataUser(){
            console.log('caraio')
            console.log(this.dataUser)
        }
    },

    mounted(){
        this.name = this.dataUser.name
        this.username = this.dataUser.username
    }

    // async mounted(){
    //     let req = await axios.get(`http://localhost:8000/users/1`)
    //     this.name = req.data.user[0].name
    //     this.username = `@${req.data.user[0].username}`
    // }
}
</script>

<style>

span{
    font-weight:bold;
    color:black;
    cursor:pointer
}

.active{
   color:#1da1f2
; 
}

.active span{
    color:#1da1f2;
    
}

</style>