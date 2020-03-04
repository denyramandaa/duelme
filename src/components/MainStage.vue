<template>
  <div class="duel-area">
      <div class="duel-area-enemy">
          <div class="area-inner open">
            <div class="card" v-for="(item, key) in enemyCardsOnStage" :key="key">
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
      <div class="duel-area-yours">
          <div class="area-inner open">
            <div class="card" v-for="(item, key) in playerCardsOnStage" :key="key">
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
  props:{
    yourCard: Array,
    enemyCard: Array
  },
  computed: {
    ...mapGetters({
      enemyCardsOnStage: 'enemyCardsOnStage',
      playerCardsOnStage: 'playerCardsOnStage',
    }),
  }
}
</script>