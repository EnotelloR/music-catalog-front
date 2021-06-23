import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import store from '../store/store.js'
import Login from '../components/Login.vue'
import AboutCard from '../components/AboutCard.vue'
import Register from '../components/Register.vue'
import CardHolder from '../components/CardHolder.vue'
import PlaylistHolder from '../components/PlaylistHolder.vue'
import AdminPlace from '../components/AdminPlace.vue'
import AdminRows from '../components/AdminRows.vue'
import AdminAdd from '../components/AdminAdd.vue'
import AdminEdit from '../components/AdminEdit.vue'

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
      path: '/playlist',
      username: 'playlist',
      component: PlaylistHolder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/card-holder',
      username: 'card-holder',
      component: CardHolder,
    },
    {
      path: '/admin-place',
      username: 'admin-place',
      component: AdminPlace,
      meta: {
        requiresAdminRole: true
      }
    },
    {
      path: '/admin-rows',
      username: 'admin-rows',
      component: AdminRows,
      meta: {
        requiresAdminRole: true
      }
    },
    {
      path: '/admin-add',
      username: 'admin-add',
      component: AdminAdd,
      meta: {
        requiresAdminRole: true
      }
    },
    {
      path: '/admin-edit',
      username: 'admin-edit',
      component: AdminEdit,
      meta: {
        requiresAdminRole: true
      }
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
  }
  else if(to.matched.some(record => record.meta.requiresAdminRole)){
    let role = localStorage.getItem("role");
    if (role === 'Admin') {
      next()
      return
    }
    next('/login')
  }
  else {
    next() 
  }
})

export default router
