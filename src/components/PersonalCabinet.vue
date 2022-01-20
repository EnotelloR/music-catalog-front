<template>
<div class="personal-cabinet">
  <div class="change-password">
    <form class="password-change" @submit.prevent="changePassword">
      <h1 class="password-change__title">Смена пароля</h1>
      <p class="password-change__desc"><label>Старый пароль</label></p>
      <input
          class="password-change__input"
          required
          v-model="oldPassword"
          type="password"
          placeholder="Введите старый пароль"
      />
      <p class="password-change__desc"><label>Новый пароль</label></p>
      <input
          class="password-change__input"
          required
          v-model="newPassword"
          type="password"
          placeholder="Введите новый пароль"
      />
      <div>
        <button class="typical-button" type="submit">Сменить пароль</button>
      </div>
    </form>
  </div>
  <div class="playlist">
    <div class="admin-holder__element"><button class="typical-button"><router-link class="nav__item" to="/playlist"> Мой Плейлист </router-link></button></div>
  </div>
  <div v-show="userRole === 'MainAdmin' || userRole === 'Admin'" class="admin-place">
    <div class="admin-holder__element">
      <button class="typical-button">    <router-link class="nav__item" v-if="userRole === 'Admin' || userRole === 'MainAdmin'" to="/admin-place"> Админка </router-link>
    </button></div>
  </div>
  <div v-show="userRole === 'MainAdmin'" class="main-admin-place">
    <div class="admin-holder__element"><button class="typical-button" @click="openEditor('admins')">Редактировать список администраторов</button></div>
  </div>
</div>
</template>

<script>
export default {
name: "PersonalCabinet",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    changePassword() {
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;
      this.$store
          .dispatch("changePassword", { oldPassword, newPassword })
          .then(() => this.$swal({icon: 'success', titleText: "Пароль успешно изменён!"}))
          .catch(() => this.$swal({icon: 'error', titleText: "Неверный пароль!"}));
    },
    openEditor(type) {
      this.$store.commit("defineAdminType", type)
      this.$router.push("/admin-rows")
    },
  },
  computed: {
    userRole(){
      return this.$store.getters.userRole || localStorage.getItem("role");
    },
  }
}
</script>

<style scoped>
.password-change__input{
  font-size: 16px;
  padding: 10px;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.password-change__title, .password-change__desc{
  color: white;
}
.password-change__input::placeholder{
  color: grey;
}
.typical-button {
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
.nav__item{
  text-decoration: none;
}
</style>