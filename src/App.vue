<template>
  <div class="main-body" id="app">
    <div class="nav">
      <router-link class="nav__item" to="/">Главная</router-link>
      <router-link class="nav__item" to="/card-holder"> Каталог </router-link>
      <router-link class="nav__item" to="/card-holders"> Мой Плейлист </router-link>
      <div class="nav__item auth">
        <router-link class="auth__item" v-if="!isLoggedIn" to="/login"> Войти </router-link>
        <router-link class="auth__item" v-if="!isLoggedIn" to="/register"> Регистрация </router-link>
        <router-link class="auth__item" v-if="isLoggedIn" @click="logout"> Выйти </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  created: function () {
    this.$store.dispatch("loadCompositions");
    this.$http.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
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
  background: linear-gradient(0deg, rgba(96, 96, 96, 0.35), rgba(96, 96, 96, 0.35)),
  conic-gradient(from 183.48deg at 52.06% 50%, #6E00E0 -31.19deg, #661085 46.27deg, #AC4EBE 118.15deg, #F436C9 189.8deg, #FFB461 231.57deg, #6E00E0 328.81deg, #661085 406.27deg),
  linear-gradient(0deg, #610981, #610981);
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
  height: 75px;
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
</style>
