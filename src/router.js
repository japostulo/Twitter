import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'
import WhatsHappening from './views/WhatsHappening'
import Chat from './views/Chat.vue'
import Navbar from './components/Navbar'

import Feed from './views/Feed.vue'
import Explore from './views/Explore'
import Notifications from './views/Notifications'
import Messages from './views/Messages'
import Bookmarks from './views/Bookmarks'
import Lists from './views/Lists'
import Profile from './views/Profile'


// import Message from './views/Message.vue'

// import Container from './components/Container.vue'


Vue.use(Router)

const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path: '/home',
            name: 'Home',
            // component: Home,
            components:{
                default:Feed,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            },
            
            // meta: {
            //     requeresAuth: true
            // },

            // beforeEnter:(to, from, next) =>{
            //     var logado = true
            //     logado ? next() : next('/login')
            // }
        },

        {
            path: '/explore',
            name: 'Explore',
            components:{
                default:Explore,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            }
        },

        {
            path: '/notifications',
            name: 'Notifications',
            components:{
                default:Notifications,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            }
        },

        {
            path: '/messages',
            name: 'Messages',
            components:{
                default:Chat,
                nav:Navbar,
                whatsHappening: Messages,
            }
        },

        {
            path: '/bookmarks',
            name: 'Bookmarks',
            components:{
                default:Bookmarks,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            }
        },

        {
            path: '/lists',
            name: 'Lists',
            components:{
                default:Lists,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            }
        },

        {
            path: '/profile',
            name: 'Profile',
            components:{
                default:Profile,
                nav:Navbar,
                whatsHappening: WhatsHappening,
            }
        },

        {
            path:'/login',
            components: {
                default: Login,
            }
        }
        // {
        //     path:'/',
        //     name:'Container',
        //     component:Container
        // }
    ]
})

export default router