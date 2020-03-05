<template>
  <div class="duel-area">
      <div class="duel-area-enemy">
          <div class="area-inner open">
            <div class="card" v-for="(item, key) in enemyCardsOnStage" :key="key" @click="selectEnemyCard(item)">
                <div class="card__inner">
                    <div class="card--title">{{ item.name }}</div>
                    <div class="card--photo" :style="{ 'background-image': 'url(' + item.img + ')'}"></div>
                    <div class="card--action" v-if="item.type == 0">
                        <div class="card--action-icon">
                            <span><img src="src/assets/target.png" alt="attack"></span>
                        </div>
                    </div>
                    <div class="card--value" v-if="item.type == 0">
                        <span>ATK: {{ item.atk }}</span> | <span>DEF: {{ item.def }}</span>
                    </div>
                    <div class="card--value" v-else>
                        <span> +{{ item.type }} ATK/DEF </span>
                    </div>
                </div>
            </div>
          </div>
      </div>
      <div class="duel-area-yours">
          <div class="area-inner open">
            <div class="card" v-for="(item, key) in playerCardsOnStage" :key="key" :class="{ clicked : item.clicked }" @click="selectPlayerCard(item)">
                <div class="card__inner">
                    <div class="card--title">{{ item.name }}</div>
                    <div class="card--photo" :style="{ 'background-image': 'url(' + item.img + ')'}"></div>
                    <div class="card--action" v-if="item.type == 0">
                        <div class="card--action-icon">
                            <span><img src="src/assets/attack.png" alt="attack"></span>
                        </div>
                    </div>
                    <div class="card--value" v-if="item.type == 0">
                        <span>ATK: {{ item.atk }}</span> | <span>DEF: {{ item.def }}</span>
                    </div>
                    <div class="card--value" v-else>
                        <span> +{{ item.type }} ATK/DEF </span>
                    </div>
                </div>
            </div>
          </div>
      </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
      return{
        selectedCardEnemy: null,
        selectedCardPlayer: null,
        readyToBattle: false,
      }
  },
  computed: {
    ...mapGetters({
      enemyCardsOnStage: 'enemyCardsOnStage',
      playerCardsOnStage: 'playerCardsOnStage',
      playerTurnCounter: 'playerTurnCounter',
      enemyTurnCounter: 'enemyTurnCounter',
    }),
  },
  watch:{
      readyToBattle(){
          if(this.readyToBattle){
                var res = this.selectedCardPlayer.atk - this.selectedCardEnemy.def;
                var againres = this.selectedCardEnemy.def - this.selectedCardPlayer.atk;
                if(res>0){ //player card win
                    this.destroyEnemyCard(this.selectedCardEnemy);
                    var up = {
                        item: this.selectedCardPlayer,
                        res: res
                    }
                    this.updatePlayerCard(up);
                    this.changeStatusAttack(this.selectedCardPlayer);
                }
                else if(res==0){
                    this.destroyPlayerCard(this.selectedCardPlayer);
                    this.destroyEnemyCard(this.selectedCardEnemy);
                }
                else{ //enemy card win
                    this.destroyPlayerCard(this.selectedCardPlayer);
                    var up = {
                        item: this.selectedCardEnemy,
                        res: againres
                    }
                    this.updateEnemyCard(up);
                }
                this.$store.state.playerTurnCounter -= 2;
                this.selectedCardPlayer = null;
                this.selectedCardEnemy = null;
          }
          
            this.readyToBattle = false;
      }
  },
  methods:{
      ...mapActions({
          destroyPlayerCard : 'destroyPlayerCard',
          destroyEnemyCard : 'destroyEnemyCard',
          updatePlayerCard : 'updatePlayerCard',
          updateEnemyCard : 'updateEnemyCard',
          changeStatusAttack: 'changeStatusAttack'
      }),
      selectPlayerCard(a){
          if(!a.attacking && this.playerTurnCounter-2 >= 0){
            a.clicked = true;
            this.selectedCardPlayer = a;
            if(this.selectedCardEnemy) this.readyToBattle = true;
          }
      },
      selectEnemyCard(a){
            if(this.selectedCardPlayer){
                a.clicked = true;
                this.selectedCardEnemy = a;
                this.readyToBattle = true
            }
      },
  }
}
</script>