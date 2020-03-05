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
    enemyCardsOnStage: [],
    enemyHealth: 25,
    enemyTurn: false,
    enemyTurnCounter: 0,

    playerCard: [],
    playerCardsOnStage: [],
    playerHealth: 25,
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
    enemyCardsOnStage(state){
      return state.enemyCardsOnStage
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
    playerCardsOnStage(state){
      return state.playerCardsOnStage
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
    
    addEnemyCard({commit}, payload){
      commit('addEnemyCard', payload)
    },
    addEnemyCardOnStage({commit}, payload ){
      commit('addEnemyCardOnStage', payload)
    },
    addEnemyStarterCard({commit}){
      axios
        .get('http://localhost:3000/cards')
        .then(({ data }) => {
          for(var i=0;i<4;i++){
            var rand = data[Math.floor(Math.random()*data.length)];
            commit('addEnemyCard', rand)
          }
        })
        .catch( error => console.log(error))
    },
    decraseEnemyCard({commit}, payload ){
      commit('decraseEnemyCard', payload)
    },

    addPlayerCard({commit}, payload){
      commit('addPlayerCard', payload)
    },
    addPlayerCardOnStage({commit}, payload ){
      commit('addPlayerCardOnStage', payload)
    },
    addPlayerStarterCard({commit}){
      axios
        .get('http://localhost:3000/cards')
        .then(({ data }) => {
          for(var i=0;i<4;i++){
            var rand = data[Math.floor(Math.random()*data.length)];
            commit('addPlayerCard', rand)
          }
        })
        .catch( error => console.log(error))
    },
    decrasePlayerCard({commit}, payload ){
      commit('decrasePlayerCard', payload)
    },
    fetchAllCards({commit}){
      axios
        .get('http://localhost:3000/cards')
        .then(({ data }) => {
          commit('fetchAllCards', data)
        })
        .catch( error => console.log(error))
    },
    changeStatusAttack({commit, state}, payload){
      const getTheItem = state.playerCardsOnStage.findIndex( ob => ob.id === payload.id && ob.atk === payload.atk )
      if ( getTheItem > -1 ) commit('changeStatusAttack', getTheItem);
    },
    refreshCardStatus({commit}){
      commit('refreshCardStatus');
    },
    destroyPlayerCard({commit, state}, payload){
      const getTheItem = state.playerCardsOnStage.findIndex( ob => ob.id === payload.id && ob.atk === payload.atk )
      if ( getTheItem > -1 ) commit('destroyPlayerCard', getTheItem);
    },
    updatePlayerCard({commit, state}, payload){
      const getTheItem = state.playerCardsOnStage.findIndex( ob => ob.id === payload.item.id && ob.atk === payload.item.atk )
      const up = {
        idx: getTheItem,
        atk: payload.res
      }
      if ( getTheItem > -1 ) commit('updatePlayerCard', up);
    },
    destroyEnemyCard({commit, state}, payload){
      const getTheItem = state.enemyCardsOnStage.findIndex( ob => ob.id === payload.id && ob.atk === payload.atk )
      if ( getTheItem > -1 ) commit('destroyEnemyCard', getTheItem);
    },
    updateEnemyCard({commit, state}, payload){
      const getTheItem = state.enemyCardsOnStage.findIndex( ob => ob.id === payload.item.id && ob.atk === payload.item.atk )
      const up = {
        idx: getTheItem,
        def: payload.res
      }
      if ( getTheItem > -1 ) commit('updateEnemyCard', up);
    }
    
  },
  mutations: {
    addEnemyCard(state, payload){
      state.enemyCard.push(payload);
    },
    addEnemyCardOnStage(state, payload){
      state.enemyCardsOnStage.push(payload);
    },
    decraseEnemyCard(state, payload){
      state.enemyCard.splice(payload, 1);
    },
    addPlayerCard(state, payload){
      state.playerCard.push(payload);
    },
    addPlayerCardOnStage(state, payload){
      state.playerCardsOnStage.push(payload);
    },
    decrasePlayerCard(state, payload){
      state.playerCard.splice(payload, 1);
    },
    fetchAllCards(state, payload){
      state.allCard = payload;
    },
    changeStatusAttack(state, payload){
      state.playerCardsOnStage[payload].attacking = true;
    },
    refreshCardStatus(state){
      for(var i=0;i<state.playerCardsOnStage.length;i++){
        state.playerCardsOnStage[i].clicked = false;
        state.playerCardsOnStage[i].attacking = false;
      }
    },
    destroyPlayerCard(state, payload){
      state.playerCardsOnStage.splice(payload, 1)
    },
    destroyEnemyCard(state, payload){
      state.enemyCardsOnStage.splice(payload, 1)
    },
    updatePlayerCard(state, payload){
      state.playerCardsOnStage[payload.idx].atk = payload.atk
    },
    updateEnemyCard(state, payload){
      state.enemyCardsOnStage[payload.idx].def = payload.def
    },
  }
});