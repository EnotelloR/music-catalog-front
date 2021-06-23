<template>
  <div id="AdminRows">
    <h1 class="title">{{this.titleText}}:</h1>
    <div class="list">
      <AdminRow
          v-for="element in getArray"
          :key="element.ID"
          :row = element
      ></AdminRow>
      <div><button class="typical-button" @click="openAdd">{{this.addText}}</button></div>
      <div><button class="typical-button typical-button_back" @click="pushBack">Назад</button></div>
    </div>
  </div>
</template>
<script>
import AdminRow from "./AdminRow";
export default {
  name: "AdminRows",
  components:{
    AdminRow
  },
  data() {
    return {
      titleText: "",
      addText: "",
    };
  },
  methods: {
    setText(titleText, addText){
      this.titleText = titleText;
      this.addText = addText;
    },
    pushBack(){
      this.$router.push("/admin-place")
    },
    openAdd(){
      this.$router.push("/admin-add")
    },
    async load(){
      await this.$store.dispatch("loadCompositors");
      await this.$store.dispatch("loadGenres");
      await this.$store.dispatch("loadPerformers");
      await this.$store.dispatch("loadRecordCompanies");
      await this.$store.dispatch("loadCompositions");
    }
  },
  computed: {
    getType(){
      if (this.$store.state.chosenAdminType === ""){
        this.pushBack();
      }
      return this.$store.state.chosenAdminType;
    },
    getArray(){
      if(this.getType === "compositions"){
        this.setText("Композиции", "Добавить композицию");
        return this.$store.state.compositions.data;
      }
      else if(this.getType === "compositors"){
        this.setText("Композиторы", "Добавить композитора");
        return this.$store.state.compositors.data;
      }
      else if(this.getType === "genres"){
        this.setText("Жанры", "Добавить жанр");
        return this.$store.state.genres.data;
      }
      else if(this.getType === "performers"){
        this.setText("Исполнители", "Добавить исполнителя");
        return this.$store.state.performers.data;
      }
      else if(this.getType === "recordCompanies"){
        this.setText("Звукозаписывающие компании", "Добавить звукозаписывающую компанию");
        return this.$store.state.recordCompanies.data;
      }
      else{
        this.setText("", "");
        return null;
      }
    },
  },
  mounted() {
    this.load();
  }
};
</script>
<style>
.title{
  color: white;
}
.list{
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: auto;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.typical-button_back{
  margin-bottom: 2%;
}
</style>
