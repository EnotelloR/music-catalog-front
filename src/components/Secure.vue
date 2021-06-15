<template>
  <div>
    <h1>This page is protected by auth</h1>
    <input v-bind:value="this.name">
    <input v-bind:value="this.genre">
    <img :src="this.imgSRC">
    <button @click="login"></button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      name: "",
      genre: "",
      imgSRC: "",
    };
  },
  methods: {
    login: function () {
      this.name = this.$store.state.compositions.data[0].CompositionName
      this.genre = this.$store.state.compositions.data[0].Genre.GenreName
      this.imgSRC = this.$store.state.compositions.data[0].ImgUrl
    },
  },
  created() {
    this.$store.dispatch("loadCompositions");
  }
};
</script>