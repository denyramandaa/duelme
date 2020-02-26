<template>
  <div class="your-area">
      <div class="area-inner fix-height open">
        <!-- <transition-group name="slide" mode="out-in">
        </transition-group> -->
        <div class="card" v-for="(item, key) in cards" :key="key" @click="sendToMain(item, key);">
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
export default {
  props:{
    cards: Array,
    health: Number,
    newCard: Object,
    turn: Boolean,
    step: Number
  },
  data(){
    return{
      stepCount: 0
    }
  },
  watch:{
    turn(){
      if(this.turn == true){
        console.log('my turn');
        this.getNewCard();
        this.stepCount=this.stepCount+this.step;
      } 
    }
  },
  methods:{
    sendToMain(a, b){
      if(this.stepCount>0 && this.stepCount-1 >= 0){
        this.stepCount=this.stepCount-1;
        this.$emit('choosen', a);
        this.cards.splice(b, 1);
      }
    },
    doneProcess(){
      this.$emit('done', false);
      this.$emit('firstfinish', false);
    },
    getNewCard(){
      this.cards.push(this.newCard);
    },
  },
  mounted(){
    // console.log(this.cards);
  }
}
</script>