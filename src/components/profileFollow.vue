<template>
    <td class="d-flex col d-flex align-items-start justify-content-start " :id="profileData.followId">

        <!-- Image -->
        <div class="col-md-auto p-0 m-0 mr-1">
            <img :src="profileData.image" style="border-radius:50rem; max-width:55px; min-width:55px; min-height:55px; max-height:55px;" alt="profile photo">
        </div>

        <!-- Info -->
        <div class="col p-0">
            <div class="row">
                <div class="col-md-auto p-0 ml-3">
                    <span style="font-weight:bold; font-size:0.9rem">
                        {{profileData.name}}
                    </span>
                    <br/>
                    <div class="span text-muted">
                        @{{profileData.username}}
                    </div>
                </div>

            </div>
        </div>

        <!-- Follow Button -->
        <div class="col d-flex align-items-center justify-content-end mt-3">
            <input type="button" class="btn-sm pl-3 pr-3 btn-light border-primary font-weight-bold rounded-pill text-primary" @click="follow" value="Follow">
        </div>
    </td>
</template>

<script>
import axios from 'axios'
export default {
    props:['profileData', 'dataUser'],
    methods:{
        follow(){
            axios.post(`http://localhost:8000/follows/?user_id=${this.dataUser.id}}&follow_id=${this.profileData.id}`)
            .then(
                this.$emit('successFollow', this.profileData.id)
            )
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>