<template>

  <div class="container-fluid">
    <div class="row">
        <div class="col-md-3 p-0">
            <!-- Navbar -->
            <Navbar/>
        </div>

        <div class="col p-0">
          <!-- Content -->
          <router-view/>
        </div>

        <div class="modal fade" id="tweetModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header d-flex d-flex justify-content-start">
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                  <span aria-hidden="true" style="color:#1da1f2">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <tweet-message/>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
    

</template>
<script>
import Navbar from './Navbar'
import TweetMessage from './TweetMessage'

export default {
  components:{
    Navbar,
    TweetMessage,
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
