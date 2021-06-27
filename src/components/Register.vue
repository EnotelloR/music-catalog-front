<template>
  <div class="register">
    <h1 class="register-title">Регистрация</h1>
    <form class="register__holder" @submit.prevent="register">
      <label class="register__holder__label" for="name">Логин *</label>
      <div class="register__holder">
          <input class="register__holder__input" id="name" type="text" v-model="name" required autofocus>
      </div>
      <label class="register__holder__label" for="password">Пароль *</label>
      <div class="register__holder">
          <input class="register__holder__input" id="password" type="password" v-model="password" required>
      </div>
      <label class="register__holder__label" for="password-confirm">Подтвердите Пароль *</label>
      <div class="register__holder">
          <input class="register__holder__input" id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <label class="register__holder__label" for="FullName" >ФИО</label>
      <div class="register__holder">
        <input class="register__holder__input" id="FullName" type="text" v-model="fullName">
      </div>
      <label class="register__holder__label" for="Address" >Адрес</label>
      <div class="register__holder">
        <input class="register__holder__input" id="Address" type="text" v-model="address" >
      </div>
      <label class="register__holder__label" for="PhoneNum" >Номер телефона</label>
      <div class="register__holder">
        <input class="register__holder__input" id="PhoneNum" type="text" v-model="phoneNum">
      </div>
      <p class="register__holder__label">Поля, помеченные `*`, обязательны к заполнению</p>
      <div class="register__holder">
          <button class="typical-button" type="submit">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        name : "",
        password : "",
        password_confirmation : "",
        fullName: "",
        address: "",
        phoneNum: ""
      }
    },
    methods: {
      async register() {
        if (this.password !== this.password_confirmation) {
          this.$swal({icon: 'warning', titleText: "Пароли не совпадают!"});
        } else {
          let data = {
            UserName: this.name,
            UserPassword: this.password,
            UserFullName: this.fullName,
            UserAdress: this.address,
            UserPhoneNumber: this.phoneNum
          }
          await this.$store
              .dispatch('register', data).then(() => this.$swal({icon: 'success', titleText: "Регистрация прошла успешно!"}))
              .catch(() => this.$swal({icon: 'error', titleText: "Логин уже занят!"}))
        }
      }
    }
  }
</script>
<style>
.register__holder__label, .register-title{
  color: white;
}
.register__holder__input{
  font-size: 16px;
  padding: 10px;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.register__holder__input::placeholder{
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