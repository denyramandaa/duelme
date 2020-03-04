<template>
    <div class="container">
        <!-- <div v-if="!start" class="start">
            <div class="start-container">
                <div class="startTitle">Duel Me!</div>
                <div>
                    <p>Cara Main</p>
                    <ul>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>
                </div>
                <div class="startButton" @click="start = true">Start</div>
            </div>
        </div> -->
        <div class="turnOn" v-if="!playerTurn"></div>
        <div class="enemyNotif" :class="{ active : enemyTurn }">Enemy Turn</div>
        <div class="yourNotif"  :class="{ active : playerTurn }">Your Turn</div>
        <transition name="fade">
            <div v-if="start">
                <enemy></enemy>
                <main-stage></main-stage>
                <your></your>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Enemy from './components/Enemy.vue';
    import MainStage from './components/MainStage.vue';
    import Your from './components/Your.vue';

    export default {
        components: {
            Enemy,
            MainStage,
            Your
        },
        data(){
            return{
                start: true,
            }
        },
        computed: {
            ...mapGetters({
                allCard: 'allCard',
                enemyTurn: 'enemyTurn',
                playerTurn: 'playerTurn',
            }),
        },
        methods:{
            ...mapActions({
                fetchAllCards: 'fetchAllCards',
                addEnemyStarterCard: 'addEnemyStarterCard',
                addPlayerStarterCard: 'addPlayerStarterCard'
            })
        },
        created(){
            this.fetchAllCards();
            this.addEnemyStarterCard();
            this.addPlayerStarterCard();
        }
    }

</script>


