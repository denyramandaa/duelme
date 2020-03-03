<template>
  <div class="your-area">
      <div class="area-inner fix-height open">
        <!-- <transition-group name="slide" mode="out-in">
        </transition-group> -->
        <div class="card" v-for="(item, key) in drawStarterCard" :key="key" @click="sendToMain(item, key);">
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
        <div class="avatar">Player<br>{{ health }}</div>
      </div>
      <div class="draw-card"></div>
      <div class="bottom-lep">
        <div class="point-step"> <span>StepCount</span> {{ stepCount }}</div>
        <div class="skip-button" @click="doneProcess()" v-if="turn">DONE</div>
      </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return{
      cardInDesk: [],
      stepCount: 0
    }
  },
  watch:{

  },
  computed: {
    ...mapGetters({
      allCard: 'allCard',
    }),
    drawStarterCard(){
      var temp = []
      for(var i=0;i<4;i++){
        temp.push(this.randomPick());
      }
      return temp
    }
  },
  methods:{
    ...mapActions({
      fetchAllCards: 'fetchAllCards'
    }),
    randomPick(){
        return this.allCard[Math.floor(Math.random()*this.allCard.length)]
    },
    // drawStarterCard(){
    //   for(var i=0;i<4;i++){
    //     this.cardInDesk.push(this.randomPick());
    //   }
    // }
  },
  mounted(){
    
  },
  created(){
    this.fetchAllCards();
  },
}
</script>