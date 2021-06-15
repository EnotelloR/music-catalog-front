<template>
  <div id="CardHolder">
    <input class="filter-input" v-model="card_text" placeholder="Введите название композиции для поиска" type="text">
    <div class="holder" v-if="this.filteredCompositions">
      <Card
          v-for="composition in filteredCompositions"
          :key="composition.ID"
          :card="composition"
      ></Card>
    </div>
    <Loading v-else></Loading>
  </div>
</template>
<script>
import Card from "./Card";
import Loading from "./Loading";

export default {
  name: "CardHolder",
  components: {
    Card,
    Loading,
  },
  data() {
    return {
      card_text: "",
      compositions: this.$store.state.compositions.data,
      componentLoaded: false,
    };
  },
  computed: {
    filteredCompositions: function(){
      if(! this.componentLoaded)
        return null;
      let card_text = this.card_text;
      return this.compositions.filter(function (elem) {

        if(card_text==='') return true;
        else return elem.CompositionName.toLowerCase().indexOf(card_text.toLowerCase()) > -1;
      })
    }
  },
  methods:{
    async load(){
      await this.$store.dispatch("loadCompositions");
      this.compositions = this.$store.state.compositions.data;
      this.componentLoaded = true;
    }
  },
  mounted() {
    if (this.$store.state.compositions.data != null){
      this.componentLoaded = true;
    }
    else{
      window.onload = this.load;
    }
  },
};
</script>
<style>
.filter-input{
  font-size: 16px;
  padding: 10px;
  width: 350px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  margin-bottom: 1%;
}
.filter-input::placeholder{
  color: grey;
}
.holder{
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  gap: 2%;
  grid-row-end: auto;
  justify-content: space-evenly;
}
</style>
