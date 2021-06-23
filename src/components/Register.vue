<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <label for="name">Логин *</label>
      <div>
          <input class="register-input" id="name" type="text" v-model="name" required autofocus>
      </div>
      <label for="password">Пароль *</label>
      <div>
          <input class="register-input" id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Подтвердите Пароль *</label>
      <div>
          <input class="register-input" id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <label for="FullName" >ФИО</label>
      <div>
        <input class="register-input" id="FullName" type="text" v-model="fullName">
      </div>
      <label for="Address" >Адрес</label>
      <div>
        <input class="register-input" id="Address" type="text" v-model="address" >
      </div>
      <label for="PhoneNum" >Номер телефона</label>
      <div>
        <input class="register-input" id="PhoneNum" type="text" v-model="phoneNum">
      </div>
      <p>Поля, помеченные `*`, обязательны к заполнению</p>
      <div>
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
      register: function () {
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
          this.$store
              .dispatch('register', data)
              .then(() => this.$router.push("/login"))
              .catch(() => this.$swal({icon: 'error', titleText: "Логин уже занят!"}))
        }
      }
    }
  }
</script>
<style>
p, label{
  color: white;
}
.register-input{
  font-size: 16px;
  padding: 10px;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.register-input::placeholder{
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