<template>
  <div class="col col-3">
      <!-- Message -->
      <div class="row mt-3">
        <div class="col-md-auto d-flex align-items-center">
          <h5>Messages</h5>
        </div>
        <div class="col d-flex justify-content-end align-items-center">
          <span class="fa fa-envelope text-primary" data-toggle="modal" data-target="#exampleModalCenter" style="font-size:1.5rem;"></span>
        </div>
      </div>

      <hr class="mt-2"/>
      <!-- Search -->
      <div class="row">
        <div class="col">
          <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text rounded-pill"><span class="fa fa-search"></span></div>
            </div>
            <input type="text" class="form-control rounded-pill" placeholder="Procure por pessoas ou grupos">
          </div>
        </div>
      </div>

      <hr/>
      <chat v-for="(chat, index) in chats" :key="index" :chatData="chat" @chatData="chatData = $event"/>

    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">New Message</h5> 
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>


          <div class="modal-body">
            <profile v-for="(prof, index) in profiles" :key="index" :profileData="prof" />
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chat from '../components/chat.vue'
import axios from 'axios'
import profile from '../components/profile.vue'

export default {
  props:['dataUser'],
  components:{
    chat,
    profile,
  },
  data(){
    return{
      chats:'',
      profiles:'',
      chatData:''
    }
  },
  watch:{
    chatData(){
      this.$emit('chatData', this.chatData)
    }
  },

  async mounted(){
    let profiles = await axios (`http://localhost:8000/follow/${this.dataUser.id}`)
    this.profiles = profiles.data.follows 

    await axios(`http://localhost:8000/chats/user/${this.dataUser.id}`)
    .then((resp)=>{
        this.chats = resp.data.chats
    })



  }
}
</script>

<style>

</style>
