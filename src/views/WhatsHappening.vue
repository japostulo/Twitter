<template>
    <!-- What's Happening -->
    <div class="col-4 d-none d-lg-block d-xl-block">
        <div class="col-9">
                <table class="table table-hover" style="background-color: #f5f8fa">
                    <thead class="rounded">
                        <tr class="rounded">
                            <th scope="col" class="rounded-pill p-1 pt-2"><h5 class="font-weight-bold">Who to follow</h5></th>
                        </tr>
                    </thead>
                    <tbody class="rounded-pill">
                        <tr v-for="(profile, index) in profiles" :key="index" class="rounded-pill">
                            <profile-follow :profileData="profile" :dataUser="dataUser" @successFollow="idRemove = $event"/>
                        </tr>
                    </tbody>
                </table>

        </div>
    </div>
</template>

<script>
import profileFollow from '../components/profileFollow'
import axios from 'axios'

export default {
    components:{
        profileFollow,
    },
    props:['dataUser'],
    data(){
        return{
            profiles:'',
            idRemove:''
        }
    },
    async mounted(){
        let profiles = await axios (`http://localhost:8000/Unfollow/1`)
        this.profiles = profiles.data.follows 
    },
    watch:{
        idRemove(){
            this.profiles = this.profiles.filter(profile =>{
                return profile.id != this.idRemove
            })
        }
    }

}
</script>

<style>

</style>