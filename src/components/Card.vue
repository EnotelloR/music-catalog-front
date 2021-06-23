<template>
  <div id="Card" class="card" @click="openCard">
      <div class="card__image-holder">
        <img class="card_image" :src="card.ImgUrl" alt="лого картинки" draggable="false">
      </div>
      <div class="card__text">
        <p class="card__text__element">{{card.Performer.PerformerName}} :<br> {{card.CompositionName}}</p>
        <p class="card__text__element">Жанр: {{card.Genre.GenreName}}</p>
        <p class="card__text__element">Длительность: {{card.Duration}}</p>
        <p class="card__text__element">Дата выпуска: {{new Date(card.RecordDate).toLocaleDateString()}}</p>
        <p class="card__text__element">Просмотры: {{card.Views}}</p>
      </div>
    </div>
</template>
<script>

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    openCard(){
      this.$store.commit("defineCurrentCard", this.card)
      if (!this.isLoggedIn){
        this.$swal({icon: 'warning', titleText: "Для данного действия необходимо авторизоваться в системе!"});
      }
      this.$router.push("/about-card")
    },
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  }
};
</script>
<style>
.card{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #9e43b5;
  height: 200px;
  width: 400px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  filter: drop-shadow(0px 3px 2px rgba(96, 96, 96, 0.35));
  cursor: pointer;
  margin: 0.5%;
  box-shadow: 8px 8px 7px 3px rgba(34, 60, 80, 0.2);
}
.card__text__element{
  color: white;
  text-align: left;
  margin-left: 10px;
}
.card_image{
  border-radius: 7px;
  width: 190px;
}
</style>
