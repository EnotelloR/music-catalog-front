<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1 class="login-title">Поле входа</h1>
      <p class="login__desc"><label>Логин</label></p>
      <input class="login__input" required v-model="username" placeholder="Введите логин" />
      <p class="login__desc"><label>Пароль</label></p>
      <input
          class="login__input"
          required
        v-model="password"
        type="password"
        placeholder="Введите пароль"
      />
      <div>
        <button class="typical-button" type="submit">Войти</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let username = this.username;
      let password = this.password;
      let grant_type = "password";
      this.$store
        .dispatch("login", { username, password, grant_type })
          .then(() => this.$store.dispatch("loadMyPlaylist"))
          .then(() => this.$router.push("/"))
          .catch(() => this.$swal({icon: 'error', titleText: "Данный пользователь не найден!"}));
    },
  },
};
</script>
<style>
.login__input{
  font-size: 16px;
  padding: 10px;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.login-title, .login__desc{
  color: white;
}
.login__input::placeholder{
  color: grey;
}
.typical-button{
  border: none;
  text-decoration: none;
  outline: none;
  display: inline-block;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 15px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #f137a6 inset, 0 0 0 0 #f137a6;
  transition: 150ms ease-in-out;
  cursor: pointer;
}
</style>