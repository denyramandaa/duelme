<template>
  <div class="your-area">
      <div class="area-inner fix-height open">
        <!-- <transition-group name="slide" mode="out-in">
        </transition-group> -->
        <div class="card" v-for="(item, key) in playerCard" :key="key" @click="sendToMainStage(item, key);">
            <div class="card__inner">
                <div class="card--title">{{ item.name }}</div>
                <div class="card--photo" :style="{ 'background-image': 'url(' + item.img + ')'}"></div>
                <div class="card--value" v-if="item.type == 0">
                    <span>ATK: {{ item.atk }}</span> | <span>DEF: {{ item.def }}</span>
                </div>
                <div class="card--value" v-else>
                    <span> +{{ item.type }} ATK/DEF </span>
                </div>
            </div>
        </div>
      </div>
      <div class="area-inner">
        <div class="avatar">Player<br>{{ playerHealth }}</div>
      </div>
      <div class="draw-card"></div>
      <div class="bottom-lep">
        <div class="point-step"> <span>StepCount</span> {{ playerTurnCounter }}</div>
        <div class="skip-button" @click="doneProcess()" v-if="playerTurn">DONE</div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      stepCount: 0,
      firstStep: true
    }
  },
  watch:{
    playerTurn(){
      if(this.playerTurn){
        this.$store.state.playerTurnCounter += 4
        if(!this.firstStep) this.getNewCard();
      }
    }
  },
  computed: {
    ...mapGetters({
      allCard: 'allCard',
      playerHealth: 'playerHealth',
      playerTurn: 'playerTurn',
      playerTurnCounter: 'playerTurnCounter',
      playerCard: 'playerCard'
    }),
    randomPick(){
      return this.allCard[Math.floor(Math.random()*this.allCard.length)]
    },
  },
  methods:{
    doneProcess(){
      this.$store.state.playerTurn = false;
      this.$store.state.enemyTurn = true;
      this.firstStep = false;
    },
    ...mapActions({
        addPlayerCard: 'addPlayerCard',
        addPlayerCardOnStage: 'addPlayerCardOnStage',
        decrasePlayerCard: 'decrasePlayerCard'
    }),
    sendToMainStage(card, index){
      if(this.$store.state.playerTurnCounter-3 >= 0){
        this.addPlayerCardOnStage(card);
        this.decrasePlayerCard(index);
        this.$store.state.playerTurnCounter -= 3;
      }
    },
    getNewCard(){
      this.addPlayerCard(this.randomPick);
    },
  },
  mounted(){

  },
  created(){
    this.$store.state.playerTurn = true;
  }
}
</script>