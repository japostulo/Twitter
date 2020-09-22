<template>
  <div>
      <div class="row">
          <div class="col-md-auto">
            <div class="d-flex align-items-center">
                <div class="post-img">
                    <img :src="dataUser.image" alt="profile photo">
                </div>
            </div>
          </div>
          <div class="col m-0 p-0">
                <div class="row mt-4">
                    <div class="col-10">
                        <textarea type="text" v-model="message" style="border:none" class="form-control teste" placeholder="What's happening?"> </textarea>
                    </div>
                </div>
            
                <div class="row mt-4">
                    <div class="col p-0 d-flex">
                        <span class="fa fa-image m-2" style="color:#1da1f2; font-size:1.4rem"></span>
                        <span class="fa fa-gift m-2" style="color:#1da1f2; font-size:1.4rem"></span>
                        <span class="fa fa-image m-2" style="color:#1da1f2; font-size:1.4rem"></span>
                        <span class="fa fa-image m-2" style="color:#1da1f2; font-size:1.4rem"></span>
                        <span class="fa fa-calendar m-2" style="color:#1da1f2; font-size:1.4rem"></span>

                    </div>
                    <div class="col-md-auto p-0 mr-4 d-flex justify-content-end">
                        <input type="button" value="Tweet" @click="sendTweet" style="background-color:#1da1f2; border:2px solid #1da1f2; font-weight:bold" class="btn btn-primary rounded-pill">
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props:['dataUser'],
    data(){
        return{
            id:'',
            message:''
        }
    },
    methods:{
        sendTweet(){
            this.id = this.dataUser.id
            axios.post(`http://localhost:8000/tweet/?post=${this.message}&user_id=${this.id}&image=${this.dataUser.image}&name=${this.dataUser.name}&username=${this.dataUser.username}&created_at=${this.getDate()}`)
            this.message = ''     
        },
        getDate(){
            //Date on YYYY-MM-DD HH:MI:SS

            let d = new Date()
            let month = d.getMonth()
            let day = d.getDay()
            let hours = d.getHours()
            let minute = d.getMinutes()
            let seconds = d.getSeconds()
            
            if (month <= 9){
                month = `0${d.getMonth()}`
            }

            if (day <= 9){
                day = `0${d.getMonth()}`
            }

            if (hours <= 9){
                hours = `0${d.getHours()}`
            }

            if (minute <= 9){
                minute = `0${d.getMinutes()}`
            }

            if (seconds <= 9){
                seconds = `0${d.getSeconds()}`
            }

            let date = `${d.getFullYear()}-${month}-${day} ${hours}:${minute}:${seconds}`
            return date
        }
    },
}
</script>

<style>
input:focus{
    box-shadow: none;
    border: 0 none;
    outline: 0;
}

input:focus, select:focus {
    outline: 0;
    box-shadow: none;
}
</style>