<template>
    <div class="d-flex align-items-center m-2" :class="this.currentUser.id == message.userId ? 'flex-row-reverse':false"> 
        <img :src="message.userImage" class="rounded-circle m-2" style="max-width:3rem;min-width:3rem;max-height:3rem;min-height:3rem; background-color: #1da1f2"/>
        <div>
            <span class="rounded text-justify p-1 d-inline-block text-light" style="word-break: break-all; background-color: #1da1f2; font-weight: normal;"> {{message.message}} </span>
        </div>
    </div>
</template>

<script>
export default {
    props:['message', 'currentUser'],
}

</script>

<style>

</style>