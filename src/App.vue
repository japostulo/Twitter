<template>
  <div class="container-fluid">
    <div class="row">

        <router-view :dataUser="data" name="nav"/>

        <router-view @autenticado="autenticado = $event" @data="data = $event" @chatData="chatData = $event" :dataUser="data"/>

        <keep-alive>
          <router-view :dataUser="data" :chatData="chatData"  name="whatsHappening"/>
        </keep-alive>
    </div>
  </div>
    

</template>
<script>

export default {

  data(){
    return{
      autenticado: false,
      data:'',
      connection: null,
      chatData:''
    }
  },
  watch:{
    data(){
      this.data != '' ? this.autenticado = true : this.autenticado = false
    },
  },
  methods:{
    sendMessage(message){
      this.connection.send(message)    
  },

  },
}
</script>
<style>
    .post-img img{
        border-radius:50rem;
        max-width:60px;
        min-width:60px;
        min-height:60px;
        max-height:60px;
        margin:1rem;
    }
</style>
