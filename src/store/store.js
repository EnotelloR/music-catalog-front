import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    access_token: localStorage.getItem('token') || '',
    compositions: [],
    currentCard: Object
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success'
      state.access_token = token
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.access_token = ''
    },
    add_compositions(state, compositions){
      state.compositions = compositions
    },
    defineCurrentCard(state, card){
      state.currentCard = card
    }
  },
  actions: {
    login({commit}, query_data){
      let qs = require('qs');
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('https://localhost:44308/token', qs.stringify(query_data))
        .then(resp => {
          const token = "Bearer " + resp.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token)
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
        axios.post('https://localhost:44308/api/UserAsAPI', qs.stringify(query_data))
            .catch(err => {
              reject(err)
            })
      })
    },
    logout({commit}){
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    async loadCompositions({commit}){
      await axios.get('https://localhost:44308/api/CompositionsAPI')
          .then(resp => {
            commit('add_compositions', resp)
          })
    }
  },
  getters : {
    isLoggedIn: state => !!state.access_token,
    authStatus: state => state.status,
  }
})