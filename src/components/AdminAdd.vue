<template>
  <div id="AdminAdd" class="admin-add">
    <form class="input-holder input-holder_small" v-if="getType !== 'compositions'" @submit.prevent="addRow">
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="name">{{ this.nameLabel }}</label></p>
        <input required class="input-holder__element__input-field" id="name" v-model="name" type="text"
               placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="additionalInfo_c">{{ this.additionalInfoLabel }}</label>
        </p>
        <input required class="input-holder__element__input-field" id="additionalInfo_c" v-model="additionalInfo"
               type="text" placeholder="Введите данные">
      </div>
      <div class="buttons-holder">
        <button type="submit" class="typical-button">Добавить</button>
      </div>
    </form>
    <form class="input-holder" v-else @submit.prevent="addRow">
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="name_c">{{ this.nameLabel }}</label></p>
        <input required class="input-holder__element__input-field" id="name_c" v-model="name" type="text"
               placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="genre_c">Жанр</label></p>
        <select required class="input-holder__element__input-field" id="genre_c" v-model="genreID">
          <option
              v-for="genre in genres"
              :key="genre.ID"
              :value="genre.ID"
          >{{ genre.GenreName }}
          </option>
        </select>
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="performer_c">Исполнитель</label></p>
        <select required class="input-holder__element__input-field" id="performer_c" v-model="performerID">
          <option
              v-for="performer in performers"
              :key="performer.ID"
              :value="performer.ID"
          >{{ performer.PerformerName }}
          </option>
        </select>
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="compositor_c">Композитор</label></p>
        <select required class="input-holder__element__input-field" id="compositor_c" v-model="compositorID">
          <option
              v-for="compositor in compositors"
              :key="compositor.ID"
              :value="compositor.ID"
          >{{ compositor.CompositorName }}
          </option>
        </select>
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="recordCompany_c">Звукозаписывающая компания</label></p>
        <select required class="input-holder__element__input-field" id="recordCompany_c" v-model="recordCompanyID">
          <option
              v-for="recordCompany in recordCompanies"
              :key="recordCompany.ID"
              :value="recordCompany.ID"
          >{{ recordCompany.RecordCompanyName }}
          </option>
        </select>
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="media_type_c">Тип носителя</label></p>
        <input required class="input-holder__element__input-field" id="media_type_c" v-model="media_type"
               type="text" placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="date_c">Дата записи</label></p>
        <input required class="input-holder__element__input-field" id="date_c" v-model="date" type="date"
               placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="duration_c">Продолжительность</label></p>
        <input required class="input-holder__element__input-field" id="duration_c" v-model="duration" type="text"
               placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="views_c">Просмотры</label></p>
        <input required class="input-holder__element__input-field" id="views_c" v-model="views" type="text"
               placeholder="Введите данные">
      </div>
      <div class="input-holder__element">
        <p class="input-holder__element__label"><label for="img_url_c">Ссылка на картинку</label></p>
        <input required class="input-holder__element__input-field" id="img_url_c" v-model="img_url" type="text"
               placeholder="Введите данные">
      </div>
      <div class="buttons-holder">
        <button type="submit" required class="typical-button">Добавить</button>
      </div>
    </form>
    <button class="typical-button" @click="pushBack">Назад</button>
  </div>
</template>
<script>

export default {
  name: "AdminAdd",
  data() {
    return {
      name: "",
      additionalInfo: "",
      media_type: "",
      date: "",
      duration: "",
      views: "",
      img_url: "",
      genreID: 0,
      performerID: 0,
      compositorID: 0,
      recordCompanyID: 0,
    };
  },
  methods: {
    async addRow() {
      let object = this.createObject();
      this.$store.dispatch("addRow", object).
      then(async () => await this.updateData).
      then(() => this.$swal.fire('Успех!', 'Запись успешно добавлена.', 'success')).then(this.pushBack);
    },
    createObject() {
      let object;
      switch (this.getType) {
        case "compositions":
          object = {
            CompositionName: this.name,
            GenreID: this.genreID,
            PerformerID: this.performerID,
            CompositorID: this.compositorID,
            RecordCompanyID: this.recordCompanyID,
            MediaType: this.media_type,
            RecordDate: this.date,
            Duration: this.duration,
            Views: this.views,
            ImgUrl: this.img_url
          }
          break;
        case "compositors":
          object = {
            CompositorName: this.name,
            CompositorCountry: this.additionalInfo
          }
          break;
        case "genres":
          object = {
            GenreName: this.name,
            GenreDescription: this.additionalInfo
          }
          break;
        case "performers":
          object = {
            PerformerName: this.name,
            PerformerMembers: this.additionalInfo
          }
          break
        case "recordCompanies":
          object = {
            RecordCompanyName: this.name,
            RecordCompanyAdress: this.additionalInfo
          }
          break;
        default:
      }
      return object;
    },
    updateData() {
      if (this.getType === "performers") {
        this.$store.dispatch("loadPerformers");
      } else if (this.getType === "compositors") {
        this.$store.dispatch("loadCompositors");
      } else if (this.getType === "genres") {
        this.$store.dispatch("loadGenres");
      } else if (this.getType === "recordCompanies") {
        this.$store.dispatch("loadRecordCompanies");
      } else if (this.getType === "compositions") {
        this.$store.dispatch("loadCompositions");
      }
    },
    pushBack() {
      this.$router.push("/admin-rows")
    },
  },
  computed: {
    getType() {
      return this.$store.state.chosenAdminType;
    },
    nameLabel() {
      if (this.getType === "performers") {
        return "Исполнитель (Группа)";
      } else if (this.getType === "compositors") {
        return "Композитор";
      } else if (this.getType === "genres") {
        return "Жанр";
      } else if (this.getType === "recordCompanies") {
        return "Звукозаписывающая компания";
      } else if (this.getType === "compositions") {
        return "Название композиции";
      } else {
        return "";
      }
    },
    additionalInfoLabel() {
      if (this.getType === "performers") {
        return "Участники";
      } else if (this.getType === "compositors") {
        return "Страна композитора";
      } else if (this.getType === "genres") {
        return "Описание жанра";
      } else if (this.getType === "recordCompanies") {
        return "Адрес";
      } else if (this.getType === "compositions") {
        return "Вид носителя";
      } else {
        this.pushBack();
        return "";
      }
    },
    genres() {
      return this.$store.state.genres.data;
    },
    performers() {
      return this.$store.state.performers.data;
    },
    compositors() {
      return this.$store.state.compositors.data;
    },
    recordCompanies() {
      return this.$store.state.recordCompanies.data;
    },
  }
};
</script>
<style>
.input-holder {
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 50%;
  margin: auto;
  padding: 2%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 260px);
  justify-content: center;
}

.input-holder_small {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.typical-button {
  margin-top: 30px;
  width: max-content;
}

.input-holder__element__input-field {
  font-size: 16px;
  padding: 10px;
  width: 150px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
.input-holder__element__label{
  color: white;
}
</style>
