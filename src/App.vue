<template>
  <div class="container-fluid">
    <div class="row">

        <router-view :dataUser="data" name="nav"/>
        

     
        <router-view @autenticado="autenticado = $event" @data="data = $event" :dataUser="data"/>

        <router-view name="whatsHappening"/>

    </div>
  </div>
    

</template>
<script>

export default {

  data(){
    return{
      autenticado: false,
      data:'',
      connection: null
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
  mounted(){
      
  }
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
