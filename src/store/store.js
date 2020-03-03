import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


// import enemy from './store/modules/enemy'
// import player from './store/modules/player'
// import stage from './store/modules/stage'

Vue.use(Vuex);

export const store = new Vuex.Store({
  // modules: {
  //   enemy,
  //   player,
  //   stage,
  // },
  state:{
    allCard: [],

    enemyCard: [],
    enemyHealth: 100,
    enemyTurn: false,
    enemyTurnCounter: 0,

    playerCard: [],
    playerHealth: 100,
    playerTurn: false,
    playerTurnCounter: 0,

    newCardDrawed: [],

  },
  getters:{
    allCard(state){
      return state.allCard
    },
    enemyCard(state){
      return state.enemyCard
    },
    enemyHealth(state){
      return state.enemyHealth
    },
    enemyTurn(state){
      return state.enemyTurn
    },
    enemyTurnCounter(state){
      return state.enemyTurnCounter
    },
    playerCard(state){
      return state.playerCard
    },
    playerHealth(state){
      return state.playerHealth
    },
    playerTurn(state){
      return state.playerTurn
    },
    playerTurnCounter(state){
      return state.playerTurnCounter
    },
    newCardDrawed(state){
      return state.newCardDrawed
    }
  },
  actions: {
    fetchAllCards({commit}){
      axios
        .get('http://localhost:3000/cards')
        .then(({ data }) => {
          commit('fetchAllCards', data)
        })
        .catch( error => console.log(error))
    },
  },
  mutations: {
    fetchAllCards(state, payload){
      state.allCard = payload;
    },
  }
});