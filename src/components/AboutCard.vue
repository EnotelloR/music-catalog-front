<template>
  <div class="about-card" id="AboutCard">
    <div class="about-card__element">
      <img class="about-card__element__img" :src="card.ImgUrl" alt="Лого картинки" draggable="false">
    </div>
    <div class="about-card__element">
      <p>Название композиции:</p>
      <p>{{this.card.CompositionName}}</p>
    </div>
    <div class="about-card__element">
      <p>Жанр:</p>
      <p>{{this.card.Genre.GenreName}}</p>
      <p>{{this.card.Genre.GenreDescription}}</p>
    </div>
    <div class="about-card__element">
      <p>Исполнитель:</p>
      <p>{{this.card.Performer.PerformerName}}</p>
      <p>Состав:</p>
      <p>{{this.card.Performer.PerformerMembers}}</p>
    </div>
    <div class="about-card__element">
      <p>Звукозаписывающая компания:</p>
      <p>{{this.card.RecordCompany.RecordCompanyName}} : {{this.card.RecordCompany.RecordCompanyAdress}}</p>
    </div>
    <div class="about-card__element">
      <p>Композитор:</p>
      <p>{{this.card.Compositor.CompositorName}} : {{this.card.Compositor.CompositorCountry}}</p>
    </div>
    <button class="about-card__button" @click="backwards">Назад</button>
  </div>
</template>
<script>

export default {
  name: "AboutCard",
  methods: {
    backwards(){
      this.$router.push("/card-holder")
    },
  },
  data() {
    return {
      card: this.$store.state.currentCard
    };
  },
};
</script>
<style>
.about-card{
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 50%;
  margin: auto;
  padding: 1%;
}
.about-card__element{
  border: 1px solid black;
  border-radius: 10px;
}
.about-card__button{
  border: none;
  text-decoration: none;
  outline: none;
  display: inline-block;
  color: white;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 15px 30px;
  margin: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0 40px 40px #f137a6 inset, 0 0 0 0 #f137a6;
  transition: 150ms ease-in-out;
  cursor: pointer;
}
.about-card__element__img{
  width: 190px;
  border-radius: 7px;
}
</style>
