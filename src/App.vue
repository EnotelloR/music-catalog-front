<template>
  <div class="main-body" id="app">
    <div class="nav">
      <router-link class="nav__item" to="/">Главная</router-link>
      <router-link class="nav__item" to="/card-holder"> Каталог </router-link>
      <router-link class="nav__item" v-if="isLoggedIn" to="/playlist"> Мой Плейлист </router-link>
      <router-link class="nav__item" v-if="userRole === 'Admin'" to="/admin-place"> Админка </router-link>
      <div class="nav__item auth">
        <router-link class="auth__item" v-if="!isLoggedIn" to="/login"> Войти </router-link>
        <router-link class="auth__item" v-if="!isLoggedIn" to="/register"> Регистрация </router-link>
        <p class="auth__item" v-if="isLoggedIn" @click="logout"> Выйти </p>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  created: function () {
    this.$http.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      let error_json = JSON.stringify(error.response)
      if (error_json.status === 401) {
        this.$store.dispatch("logout");
      }
      return Promise.reject(error)
    })
    this.$store.dispatch("loadCompositions");
    if (this.isLoggedIn){
      this.$store.dispatch("loadMyPlaylist");
    }
    if (this.userRole === "Admin"){
      this.$store.dispatch("loadCompositors");
      this.$store.dispatch("loadGenres");
      this.$store.dispatch("loadPerformers");
      this.$store.dispatch("loadRecordCompanies");
    }
    if (!this.isTokenValid){
      this.$store.dispatch("logout");
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    userRole(){
      return this.$store.getters.userRole || localStorage.getItem("role");
    },
    isTokenValid() {
      let timePasted = new Date().getTime() - new Date(parseInt(localStorage.getItem('loginTime'))).getTime();
      if (parseInt(Math.floor(timePasted / 1000)) > parseInt(localStorage.getItem('expiresIn'))){
        return false;
      }
      else{
        return true;
      }
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },

};
</script>
<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body{
  background: linear-gradient(54.83deg, #6E00E0 8.27%, #FFB461 98.62%);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 75px;
  height: max-content;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 2%;
}

.nav__item, .auth__item{
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  min-width: max-content;
}

.nav__item.router-link-exact-active, .auth__item.router-link-exact-active{
  color: #42b983;
}

.nav__item{
  width: 15%;
}

.auth__item{
  margin-right: 10px;
}

.auth{
  display: flex;
  justify-content: space-around;
}
@media (max-width: 500px) {
  .nav{
    padding-top: 5%;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
