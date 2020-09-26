<template>
    <div class="container">
        <router-view name="teste"> </router-view>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <div class="flex-column align-items-center col-6">
                    <span class="fa fa-twitter fa-3x d-flex justify-content-center m-4"></span>
                    <h4 class="text-center">Log in Twitter</h4>
                    <small style="color:red" v-for="(error, index) in errors" :key="index">
                        {{error}}
                    </small> <br>
                    <span>
                        <small>Phone, email, or username</small>
                        <input type="email" id="emal" v-model="username" class="form-control">
                    </span>
                    
                    <span>
                        <small>Password</small>
                        <input type="text" id="password" @keyup.enter="login" v-model="password" class="form-control">
                    </span>

                    <input type="button" class="btn btn-primary rounded-pill col mt-3 p-2" @click="login" style="background-color:#1da1f2; border:2px solid #1da1f2; font-weight:bold" value="Log in">

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
export default {
    data(){
        return{
            username:'',
            password:'',
            errors:[],
            data:''
        }
    },
    methods:{
        async login(){
            var user = await axios.get(`http://localhost:8000/auth/?id=${this.username}&password=${this.password}`, {id:this.username, password:this.password})
            this.data = user.data.success[0]
            user.data.success.length != 0 ?  this.autenticado() : this.errors = ['usuário ou senha incorreto']
        },
        autenticado(){
            this.$emit("autenticado", true)
            this.$emit("data", this.data)
            this.$router.push('/home')
        }
    }
}
</script>

<style>

</style>