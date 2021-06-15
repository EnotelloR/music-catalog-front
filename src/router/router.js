import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import store from '../store/store.js'
import Login from '../components/Login.vue'
import AboutCard from '../components/AboutCard.vue'
import Register from '../components/Register.vue'
import CardHolder from '../components/CardHolder.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      username: 'home',
      component: Main
    },
    {
      path: '/login',
      username: 'login',
      component: Login
    },
    {
      path: '/register',
      username: 'register',
      component: Register
    },
    {
      path: '/about-card',
      username: 'about-card',
      component: AboutCard,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/card-holder',
      username: 'card-holder',
      component: CardHolder,

    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
