<template>
  <div class="enemy-area">
      <div class="area-inner">
        <div class="avatar">Player<br>{{ health }}</div>
      </div>
      <div class="area-inner close">
          <div class="card" v-for="(item, key) in cards" :key="key"></div>
      </div>
      <div class="draw-card"></div>
      <div class="bottom-reg">
        <div class="point-step"> <span>StepCount</span> {{ stepCount }}</div>
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
      if(this.turn == true) {
        // ai proses here;
        console.log('enemy turn');
        var self = this;
        this.stepCount=this.stepCount+this.step;
        setTimeout(function(){
          self.cards.push(self.newCard);
        },1000);
        setTimeout(function(){
          if(self.stepCount>0 && self.stepCount-1 >= 0){
            self.stepCount=self.stepCount-1;
            var rad = self.cards[Math.floor((Math.random()*self.cards.length))];
            var ind = self.cards.indexOf(rad);
            self.$emit('choosen', rad);
            self.cards.splice(ind, 1);
          }
        },2000);
        setTimeout(function(){
          self.doneProcess();
        },10000);
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
      console.log('done enemy turn');
    },
  },
  mounted(){
    this.$nextTick(function(){

    });
  }
}
</script>