<template>
  <div id="CardHolder">
    <div class="filters-holder">
      <div class="filter-holder__element">
        <input class="filter-input" v-model="card_text" placeholder="Введите название композиции для поиска"
               type="text">
      </div>
      <div class="filter-holder__element">
        <span class="filter__name">Жанр: </span>
        <select class="filter-select" v-model="card_genre">
          <option value="Не выбран" selected="selected">Не выбран</option>
          <option
              v-for="genre in genres"
              :key="genre.ID"
              :value="genre.GenreName"
          >{{ genre.GenreName }}
          </option>
        </select>
      </div>
      <div class="filter-holder__element filter-holder__element_text" v-if="filteredCompositions">
        Записей: {{this.filteredCompositions.length}}
      </div>
    </div>
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
      card_genre: "Не выбран",
      componentLoaded: false,
    };
  },
  computed: {
    filteredCompositions: function () {
      if (!this.componentLoaded)
        return null;
      let card_text = this.card_text;
      let card_genre = this.card_genre;
      return this.compositions.filter(function (elem) {
        if (card_genre === "Не выбран" && card_text === '') {
          return true;
        } else if (card_text === '' && card_genre !== 'Не выбран') {
          return elem.Genre.GenreName === card_genre;
        } else if (card_genre === 'Не выбран' && card_text !== '') {
          return elem.CompositionName.toLowerCase().indexOf(card_text.toLowerCase()) > -1;
        } else {
          return elem.CompositionName.toLowerCase().indexOf(card_text.toLowerCase()) > -1 && elem.Genre.GenreName === card_genre;
        }
      })
    },
    compositions() {
      return this.$store.state.compositions.data;
    },
    genres() {
      return this.$store.state.genres.data;
    },
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    async load() {
      await this.$store.dispatch("loadCompositions");
      await this.$store.dispatch("loadGenres");
      if (this.isLoggedIn) {
        await this.$store.dispatch("loadMyPlaylist");
      }
      this.$store.commit("defineBackTo", "/card-holder")
      this.componentLoaded = true;
    }
  },
  mounted() {
    if (this.$store.state.compositions.data != null) {
      this.$store.commit("defineBackTo", "/card-holder")
      this.componentLoaded = true;
    } else {
      window.onload = this.load;
    }
  },
};
</script>
<style>
.filters-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1%;
}

.filter-input {
  font-size: 16px;
  padding: 10px;
  width: 350px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.filter-select {
  font-size: 16px;
  padding: 10px;
  width: 150px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.filter-holder__element{
  color: white;
}
.filter-holder__element_text{
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}
.filter__name {
  color: white;
}

.filter-input::placeholder {
  color: grey;
}

.holder {
  display: grid;
  grid-template-columns: repeat(auto-fit, 420px);
  gap: 2%;
  grid-row-end: auto;
  justify-content: space-evenly;
}

@media print {
  @page {
    margin: 2cm 1cm 2cm 3cm;
  }

  *,
  *:before,
  *:after,
  *:first-letter,
  p:first-line,
  div:first-line,
  blockquote:first-line,
  li:first-line {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  .holder{
    display: table !important;
    width: 100%;
  }
  Card{
    display: inline-block !important;
    width: 100%;
    margin: 50px;
  }
  .filters-holder, .nav {
    display: none !important;
  }
}
</style>
