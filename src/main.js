import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

const swalOptions = {
  confirmButtonColor: "#9227c2",
  iconColor: "#9227c2",
};

Vue.use(VueSweetalert2, swalOptions)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
