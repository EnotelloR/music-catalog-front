<template>
  <div id="AdminPlace">
    <div class="admin-holder">
      <h1 class="admin-description">Администраторская</h1>
      <h2 class="admin-description">Выберите раздел:</h2>
      <div class="admin-holder__element"><button class="typical-button" @click="openEditor('compositions')">Композиции</button></div>
      <div class="admin-holder__element"><button class="typical-button" @click="openEditor('compositors')">Композиторы</button></div>
      <div class="admin-holder__element"><button class="typical-button" @click="openEditor('genres')">Жанры</button></div>
      <div class="admin-holder__element"><button class="typical-button" @click="openEditor('performers')">Исполнители</button></div>
      <div class="admin-holder__element"><button class="typical-button" @click="openEditor('recordCompanies')">Звукозаписывающие компании</button></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminPlace",
  methods:{
    openEditor(type){
      this.$store.commit("defineAdminType", type)
      this.$router.push("/admin-rows")
    }
  },
  mounted() {

  },
};
</script>
<style>
.admin-description{
  color: white;
}
.admin-holder{
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 30%;
  min-width: 400px;
  margin: 0 auto;
  padding: 1%;
  display: flex;
  flex-direction: column;
}
</style>
