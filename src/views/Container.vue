<template>
<div>
    <Navbar :dataUser="data"/>

    <keep-alive>
        <router-view :dataUser="data" :chatData="chatData"  name="whatsHappening"/>
    </keep-alive>   

</div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
    components:{
        Navbar,

    },
    props:['data', connection: null,
      chatData:'']


}
</script>

<style>

</style>