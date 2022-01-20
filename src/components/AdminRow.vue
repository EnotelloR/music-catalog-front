<template>
  <div id="AdminRow" class="row">
    <p class="row__element row__element_id">ID: {{ row.ID }}</p>
    <p class="row__element row__element_text">Имя: {{ rowText }}</p>
    <div v-show="notAnyAdminType" class="row__element row__element_clickable" @click="editRow">
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 24 24" fill="none" stroke="white"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
      </svg>
    </div>
    <div v-if="type === 'notAdmins'" class="row__element row__element_clickable" @click="makeAdmin">
      Добавить администратора
    </div>
    <div v-show="this.type !== 'notAdmins'" class="row__element row__element_clickable" @click="deleteRow">
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" data-name="Layer 1" viewBox="0 0 64 64">
        <line x1="9.37" x2="54.63" y1="9.37" y2="54.63" fill="none" stroke="white" stroke-miterlimit="10"
              stroke-width="4"/>
        <line x1="9.37" x2="54.63" y1="54.63" y2="9.37" fill="none" stroke="white" stroke-miterlimit="10"
              stroke-width="4"/>
      </svg>
    </div>
  </div>
</template>
<script>

export default {
  name: "AdminRow",
  props: {
    type: String,
    row: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    deleteRow() {
      this.$swal.fire({
        title: 'Вы уверены?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await this.$store.dispatch("deleteRow", this.row)
          if (result) {
            await this.$swal.fire(
                'Удалено!',
                'Запись удалена из базы данных.',
                'success'
            )
            this.updateData();
          } else {
            await this.$swal.fire(
                'Ошибка!',
                'Невозможно удалить запись. Проверьте связи.',
                'error'
            )
          }
        }
      })
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
      } else if (this.type === "notAdmins") {
        this.$store.dispatch("loadNotAdmins");
      }else if (this.getType === "admins") {
        this.$store.dispatch("loadAdmins");
      }
    },
    makeAdmin(){
      this.$swal.fire({
        title: 'Вы уверены, что хотите сделать ' + this.rowText + ' администратором?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
      }).then(async (result) => {
        if (result.isConfirmed) {
          let result = await this.$store.dispatch("addRow", this.row)
          if (result) {
            await this.$swal.fire(
                'Добавлен!',
                'В системе появился новый администратор.',
                'success'
            )
            this.updateData();
          } else {
            await this.$swal.fire(
                'Ошибка!',
                'Невозможно сделать данного пользователя администратором.',
                'error'
            )
          }
        }
      })
    },
    editRow() {
      this.$store.commit("defineEditingObject", this.row);
      this.$router.push("/admin-edit")
    },
    pushBack() {
      if (!this.notAnyAdminType) {
        this.$router.push("/personal-cabinet")
      } else
        this.$router.push("/admin-place")
    },
  },
  computed: {
    getType() {
      if (this.$store.state.chosenAdminType === "") {
        this.pushBack();
      }
      return this.$store.state.chosenAdminType;
    },
    rowText() {
      if (this.getType === "compositions") {
        return this.row.CompositionName;
      } else if (this.getType === "compositors") {
        return this.row.CompositorName;
      } else if (this.getType === "genres") {
        return this.row.GenreName;
      } else if (this.getType === "performers") {
        return this.row.PerformerName;
      } else if (this.getType === "recordCompanies") {
        return this.row.RecordCompanyName;
      } else if (this.getType === "admins" || this.getType === "notAdmins") {
        return this.row.UserName;
      } else {
        return null;
      }
    },
    notAnyAdminType(){
      return this.getType !== "admins" && this.type !== 'notAdmins'
    }
  }
};
</script>
<style>
.row {
  display: flex;
  gap: 1%;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  border: 1px white solid;
  border-radius: 15px;
  margin: 0.25% auto;
}

.row__element {
  font-size: max(1.4vw, 16px);
  color: white;
}

.row__element_clickable {
  cursor: pointer;
}

.row__element_text {
  min-width: 60%;
}

.row__element_id {
  min-width: max-content;
}
</style>
