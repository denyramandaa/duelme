<template>
  <div class="enemy-area">
      <div class="area-inner">
        <div class="avatar">Enemy<br>{{ enemyHealth }}</div>
      </div>
      <div class="area-inner close">
          <div class="card" v-for="(item, key) in enemyCard" :key="key"></div>
      </div>
      <div class="draw-card"></div>
      <div class="bottom-reg">
        <div class="point-step"> <span>StepCount</span> {{ enemyTurnCounter }}</div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      stepCount: 0,
    }
  },
  watch:{
    enemyTurn(){
      if(this.enemyTurn){
        this.$store.state.enemyTurnCounter += 4
        var self = this;
        this.stepCount=this.stepCount+this.step;
        setTimeout(function(){
          self.getNewCard();
        },1000);
        setTimeout(function(){
          if(self.enemyTurnCounter>0 && self.enemyTurnCounter-3 >= 0){
            var rad = self.enemyCard[Math.floor((Math.random()*self.enemyCard.length))];
            var ind = self.enemyCard.indexOf(rad);
            self.sendToMainStage(rad, ind);
          }
        },2000);
        setTimeout(function(){
          self.doneProcess();
        },6000);
      }
    }
  },
  computed: {
    ...mapGetters({
      allCard: 'allCard',
      enemyHealth: 'enemyHealth',
      enemyTurn: 'enemyTurn',
      enemyTurnCounter: 'enemyTurnCounter',
      enemyCard: 'enemyCard'
    }),
    randomPick(){
      return this.allCard[Math.floor(Math.random()*this.allCard.length)]
    },
  },
  methods:{
    doneProcess(){
      this.$store.state.enemyTurn = false;
      this.$store.state.playerTurn = true;
    },
    ...mapActions({
        addEnemyCard: 'addEnemyCard',
        addEnemyCardOnStage: 'addEnemyCardOnStage',
        decraseEnemyCard: 'decraseEnemyCard',
    }),
    sendToMainStage(card, index){
      if(this.$store.state.enemyTurnCounter-3 >= 0){
        this.addEnemyCardOnStage(card);
        this.decraseEnemyCard(index);
        this.$store.state.enemyTurnCounter -= 3;
      }
    },
    getNewCard(){
      this.addEnemyCard(this.randomPick);
    },
  },
  mounted(){

  },
}
</script>