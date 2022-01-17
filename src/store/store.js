import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    access_token: localStorage.getItem('token') || '',
    compositions: [],
    compositors: [],
    genres: [],
    performers: [],
    recordCompanies: [],
    myPlaylist: [],
    currentCard: Object,
    backTo: "",
    userRole: localStorage.getItem("role"),
    chosenAdminType: "",
    editingObject: Object,
    mostPopularTracks: [],
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, userRole){
      state.status = 'success'
      state.access_token = token
      state.userRole = userRole
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.access_token = ''
      state.userRole = ''
      state.myPlaylist = []
      state.compositors = []
      state.genres = []
      state.performers = []
      state.recordCompanies = []
    },
    add_compositions(state, compositions){
      state.compositions = compositions
    },
    add_compositors(state, compositors){
      state.compositors = compositors
    },
    add_genres(state, genres){
      state.genres = genres
    },
    add_performers(state, performers){
      state.performers = performers
    },
    add_recordCompanies(state, recordCompanies){
      state.recordCompanies = recordCompanies
    },
    add_my_playlist(state, myPlaylist){
      state.myPlaylist = myPlaylist
    },
    defineCurrentCard(state, card){
      state.currentCard = card
    },
    defineBackTo(state, backTo){
      state.backTo = backTo
    },
    defineAdminType(state, type){
      state.chosenAdminType = type
    },
    defineEditingObject(state, object){
      state.editingObject = object
    },
    defineMostPopularTracks(state, object){
      state.mostPopularTracks = object
    },
  },
  actions: {
    login({commit}, query_data){
      let qs = require('qs');
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log(qs.stringify(query_data))
        axios.post(process.env.VUE_APP_API_URL+'/token', qs.stringify(query_data))
        .then(resp => {
          const token = "Bearer " + resp.data.access_token
          const expiresIn = resp.data.expires_in
          const role = resp.data.role
          const ID = resp.data.ID
          localStorage.setItem('token', token)
          localStorage.setItem('expiresIn', expiresIn)
          localStorage.setItem('role', role)
          localStorage.setItem('ID', ID)
          localStorage.setItem('loginTime', new Date().getTime().toString())
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, role)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    // eslint-disable-next-line no-unused-vars
    register({commit}, query_data){
      let qs = require('qs');
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL+'/api/UserAsAPI', qs.stringify(query_data)).then(resp =>{
          resolve(resp)
        })
            .catch(err => {
              reject(err)
            })
      })
    },
    async addToMyPlaylist({getters}){
      let data = {
        UserID: localStorage.getItem("ID"),
        CompositionID: getters.currentCard.ID,
      }
      let qs = require('qs');
      await axios.post(process.env.VUE_APP_API_URL+'/api/PlaylistsAPI', qs.stringify(data))
    },
    async addRow({getters}, object){
      let qs = require('qs');
      switch (getters.chosenAdminType) {
        case "compositions":
          await axios.post(process.env.VUE_APP_API_URL + '/api/CompositionsAPI', qs.stringify(object))
          break;
        case "compositors":
          await axios.post(process.env.VUE_APP_API_URL + '/api/CompositorsAPI', qs.stringify(object))
          break;
        case "genres":
          await axios.post(process.env.VUE_APP_API_URL + '/api/GenresAPI', qs.stringify(object))
          break;
        case "performers":
          await axios.post(process.env.VUE_APP_API_URL + '/api/PerformersAPI', qs.stringify(object))
          break
        case "recordCompanies":
          await axios.post(process.env.VUE_APP_API_URL + '/api/RecordCompaniesAPI', qs.stringify(object))
          break;
        default:
      }
    },
    async editRow({getters}, {id, object}){
      let qs = require('qs');
      switch (getters.chosenAdminType) {
        case "compositions":
          await axios.put(process.env.VUE_APP_API_URL + '/api/CompositionsAPI/'+id, qs.stringify(object))
          break;
        case "compositors":
          await axios.put(process.env.VUE_APP_API_URL + '/api/CompositorsAPI/'+id, qs.stringify(object))
          break;
        case "genres":
          await axios.put(process.env.VUE_APP_API_URL + '/api/GenresAPI/'+id, qs.stringify(object))
          break;
        case "performers":
          await axios.put(process.env.VUE_APP_API_URL + '/api/PerformersAPI/'+id, qs.stringify(object))
          break
        case "recordCompanies":
          await axios.put(process.env.VUE_APP_API_URL + '/api/RecordCompaniesAPI/'+id, qs.stringify(object))
          break;
        default:
      }
    },
    async deleteRow({getters}, object){
      let requestString = "";
      switch (getters.chosenAdminType) {
        case "compositions":
          requestString = '/api/CompositionsAPI/'+object.ID;
          break;
        case "compositors":
          requestString = '/api/CompositorsAPI/'+object.ID
          break;
        case "genres":
          requestString = '/api/GenresAPI/'+object.ID
          break;
        case "performers":
          requestString = '/api/PerformersAPI/'+object.ID
          break
        case "recordCompanies":
          requestString = '/api/RecordCompaniesAPI/'+object.ID
          break;
        default:
      }
      if (requestString !== ""){
        let returnValue;
        await axios.delete(process.env.VUE_APP_API_URL+requestString).then(() => returnValue = true).catch(function (error) {
          if (error.response.status === 400) {
            returnValue = false;
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });
        return returnValue;
      }
    },
    // eslint-disable-next-line no-unused-vars
    async deleteFromMyPlaylist({commit, getters}, playlistID){
      await axios.delete(process.env.VUE_APP_API_URL+'/api/PlaylistsAPI/'+playlistID)
    },
    logout({commit}){
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('role')
        localStorage.removeItem('ID')
        localStorage.removeItem('loginTime')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    async loadCompositions({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/CompositionsAPI')
          .then(resp => {
            commit('add_compositions', resp)
          })
    },
    async loadCompositors({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/CompositorsAPI')
          .then(resp => {
            commit('add_compositors', resp)
          })
    },
    async loadGenres({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/GenresAPI')
          .then(resp => {
            commit('add_genres', resp)
          })
    },
    async loadPerformers({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/PerformersAPI')
          .then(resp => {
            commit('add_performers', resp)
          })
    },
    async loadRecordCompanies({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/RecordCompaniesAPI')
          .then(resp => {
            commit('add_recordCompanies', resp)
          })
    },
    async loadMyPlaylist({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/GetMyPlaylist')
          .then(async resp => {
            await commit('add_my_playlist', resp)
          })
    },
    async loadMostPopularTracks({commit}){
      await axios.get(process.env.VUE_APP_API_URL+'/api/GetTopPlaylist')
          .then(async resp => {
            await commit('defineMostPopularTracks', resp)
          })
    },
  },
  getters : {
    isLoggedIn: state => !!state.access_token,
    authStatus: state => state.status,
    currentCard: state => state.currentCard,
    chosenAdminType: state => state.chosenAdminType,
    userRole: state => state.userRole,
  }
})