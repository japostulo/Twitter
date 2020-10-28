import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'axios'

Vue.config.productionTip = false
Vue.directive('scrollChat',{
  inserted: (el, binding, vnode) =>{

      el.addEventListener("scroll",()=>{

          el.scrollTop ==0 ? vnode.context.newMessages=0:false

          let endScroll = el.scrollHeight - el.clientHeight;
          console.log(el.scrollTop)
          console.log(endScroll)

          Math.abs(Math.round(el.scrollTop)) == endScroll ? alert("fim da scroll"):false;
        })
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.prototype.$currentUser = ''

