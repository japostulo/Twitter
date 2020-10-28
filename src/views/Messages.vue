<template>
  <div class="col-4">

    <div v-if="chatData ==''">
        <!-- Criar tela informativo -->
        You don’t have a message selected
    </div>

    <div class="bg-white d-flex align-items-end flex-column" style="height:100vh" v-else>
      <div class="w-100 d-flex flex-column-reverse" style="overflow-y:scroll" v-scrollChat id="messageContainer">
        
        <div class="w-100">
          <Message v-for="(message,index) in messages" :key="index" :currentUser="dataUser" :message="message"/>
          <div v-if="this.newMessages!=0" class="position-absolute text-center" style="margin-top:-3rem;width:100%;">

            <button type="button" class="btn btn-primary text-white rounded-pill" @click="scrollBottom('messageContainer')">
              Nova mensagem <span class="badge badge-success"> {{newMessages}} </span>
            </button>

            </div>
          
        </div>
        </div>

      <div class="bg-white w-100 d-flex align-items-center p-3 mt-auto" style="min-height:3rem"> 
          <div class="w-100 p-2 mr-2 rounded" style="outline:none;max-height:7rem;overflow-y:scroll; border: 1px solid #1da1f2; font-weight: normal;" id="message" @keyup.enter="sendMessage" contenteditable="true"> </div>
            <i class="fa fa-2x fa-paper-plane" style="color:#1da1f2"  @click="sendMessage"></i>
          </div>
    </div>

  </div>
</template>

<script>
import Message from '../components/Mensagem.vue'
import axios from 'axios'
var cont = 0
export default {
    props:['dataUser','chatData'],
    components:{
    Message,
    },
    data(){
        return{
        messages:[],
        message:'',
        userReceived:'',
        newMessages: 0,
        }
    },
    watch:{
      chatData(){
        this.chatData != null ? this.getMessage(): false
      }
    },
    methods:{
      
      async getMessage(){
        this.userReceived = this.chatData

        await axios(`http://localhost:8000/chats/${this.chatData.chat_id}/messages`)
          .then(resp =>{
            this.messages = resp.data.messages;
          });
        },
        async sendMessage(){
          await axios.post(`http://localhost:8000/chats/${this.chatData.chat_id}/messages/?message=${document.getElementById('message').innerText}&userId=${this.dataUser.id}`)
          .then(() =>{
            document.getElementById('message').innerText = ''
          });
        },
        renderMessage(data){
          let message 
          if(data.user_id == this.chatData.user_id){
              message = {
                id: data.id,
                message: data.message,
                userId: data.user_id,
                userName: this.chatData.user_name,
                userImage: this.chatData.user_image
              }
              this.messages.push(message)
              return message
          }
          message = {
            id: data.id,
            userId: data.user_id,
            message: data.message,
            userName: this.dataUser.name,
            userImage: this.dataUser.image
          }
          this.messages.push(message)
          return message
          
        },
        scrollBottom(element){
          document.getElementById(element).scrollTo(0,0)
        },
        sendNotification(){
          cont ++
          console.log(cont)
        }
    },
    mounted(){
      /*
        eslint-disable
      */

      

      var channelMessages = pusher.subscribe('Messages');

      channelMessages.bind('sendMessage', (data) => {
          
          this.renderMessage(data.message);
          this.sendNotification()

          let scrollChat = document.getElementById("messageContainer")
          scrollChat.scrollTop == 0 ? this.newMessages = 0 : this.newMessages++
      });
      

    },
}
</script>

<style>
::-webkit-scrollbar {
  width: 1rem;
}
::-webkit-scrollbar-thumb {
  background: white;
  border:1px solid black;
  border-radius:50px
}
</style>