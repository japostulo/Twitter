<template>
    <div class="d-flex align-items-start justify-content-start mt-3" :id="profileData.followId">   
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
                    <div class="span">
                            @{{profileData.username}}
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['profileData'],
    created(){

    }
}
</script>

<style>

</style>