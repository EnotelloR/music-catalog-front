<template>
  <div id="AdminPlace" v-if="loaded">
    <div class="admin-room">
      <div class="admin-holder">
        <h1 class="admin-description">Администраторская</h1>
        <h2 class="admin-description">Выберите раздел:</h2>
        <div class="admin-holder__element"><button class="typical-button" @click="openEditor('compositions')">Композиции</button></div>
        <div class="admin-holder__element"><button class="typical-button" @click="openEditor('compositors')">Композиторы</button></div>
        <div class="admin-holder__element"><button class="typical-button" @click="openEditor('genres')">Жанры</button></div>
        <div class="admin-holder__element"><button class="typical-button" @click="openEditor('performers')">Исполнители</button></div>
        <div class="admin-holder__element"><button class="typical-button" @click="openEditor('recordCompanies')">Звукозаписывающие компании</button></div>
      </div>
      <div class="dashboard">
        <h2>Топ 7 популярных композиций на данный момент</h2>
        <vc-donut
            class="diagram"
            background="gray"
            :sections="dataCollection"
            has-legend
            thickness=100
            :total="dataCollectionSum"></vc-donut>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminPlace",
  data() {
    return {
      loaded: false,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    openEditor(type) {
      this.$store.commit("defineAdminType", type)
      this.$router.push("/admin-rows")
    },
    async load() {
      await this.$store.dispatch("loadMostPopularTracks");
      this.loaded = true;
    },
    getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  async mounted () {
    this.loaded = false
    try {
      await this.$store.dispatch("loadMostPopularTracks");
      //this.addDataToChart();
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    mostPopularTracks(){
      return this.$store.state.mostPopularTracks.data;
    },
    dataCollection(){
      let data = [];
      for (let i = 0; i < 7; i++) {
        data.push(
            {
              label: this.mostPopularTracks[i].Key +": "+this.mostPopularTracks[i].Count,
              value: this.mostPopularTracks[i].Count,
              color: this.getRandomColor()
            }
        );
      }
      return data;
    },
    dataCollectionSum(){
      let sum = 0;
      for (let i = 0; i < 7; i++) {
        sum += this.mostPopularTracks[i].Count;
      }
      return sum;
    }
  },
}
</script>
<style>
.admin-room{
  display: flex;
  justify-content: space-evenly;
}
@media (max-width: 700px) {
  .admin-room{
    flex-direction: column;
    align-items: center;
    padding: 2%;
  }
}
.admin-description{
  color: white;
}
.admin-holder{
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 30%;
  min-width: 400px;
  padding: 1%;
  display: flex;
  flex-direction: column;
}
.dashboard{
  width: 30%;
  color: white;
}
</style>
