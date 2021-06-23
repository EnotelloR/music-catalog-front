<template>
  <div id="PlaylistHolder">
    <div class="holder" v-if="this.myPlaylist">
      <Card
          v-for="record in myPlaylist"
          :key="record.Composition.ID"
          :card="record.Composition"
      ></Card>
    </div>
    <Loading v-else></Loading>
  </div>
</template>
<script>
import Card from "./Card";
import Loading from "./Loading";

export default {
  name: "PlaylistHolder",
  components: {
    Card,
    Loading,
  },
  data() {
    return {
      componentLoaded: false,
    };
  },
  computed: {
    myPlaylist(){
      return this.$store.state.myPlaylist.data;
    },
  },
  methods:{
    async load(){
      await this.$store.dispatch("loadMyPlaylist");
      this.$store.commit("defineBackTo", "/playlist")
      this.componentLoaded = true;
    }
  },
  mounted() {
    if (this.$store.state.myPlaylist.data != null){
      this.$store.commit("defineBackTo", "/playlist")
      this.componentLoaded = true;
    }
    else{
      window.onload = this.load;
    }
  },
};
</script>
<style>
.filters-holder{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1%;
}
.filter-input{
  font-size: 16px;
  padding: 10px;
  width: 350px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.filter-select{
  font-size: 16px;
  padding: 10px;
  width: 150px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.filter__name{
  color: white;
}
.filter-input::placeholder{
  color: grey;
}
.holder{
  display: grid;
  grid-template-columns: repeat(auto-fit, 420px);
  gap: 2%;
  grid-row-end: auto;
  justify-content: space-evenly;
}
</style>
