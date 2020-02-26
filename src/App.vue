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
        <div class="turnOn" v-if="!yourTurn"></div>
        <div class="enemyNotif" :class="{ active : enemyTurn }">Enemy Turn</div>
        <div class="yourNotif"  :class="{ active : yourTurn }">Your Turn</div>
        <transition name="fade">
            <div v-if="start">
                <enemy 
                    :newCard="randomPick()" 
                    :cards="enemyCard" 
                    :health="enemyHealth" 
                    @choosen="enemyPicked.push($event)" 
                    @done="enemyTurn = $event"
                    :turn="enemyTurn" 
                    :step="enemyPointStep"
                    @firstfinish="enemyFirstTurn = $event">
                </enemy>
                <main-stage :yourCard="yourPicked" :enemyCard="enemyPicked"></main-stage>
                <your 
                    :newCard="randomPick()" 
                    :cards="yourCard" 
                    :health="yourHealth" 
                    @choosen="yourPicked.push($event)" 
                    @done="yourTurn = $event"
                    :turn="yourTurn" 
                    :step="yourPointStep"
                    @firstfinish="yourFirstTurn = $event">
                </your>
            </div>
        </transition>
    </div>
</template>

<script>
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
                yourTurn: false,
                enemyTurn: false,
                yourHealth: 50,
                enemyHealth: 50,
                yourPointStep: 1,
                enemyPointStep: 2,
                yourCard: [],
                enemyCard:[],
                yourPicked:[],
                enemyPicked: [],
                yourFirstTurn: true,
                enemyFirstTurn: true,
                allCard:[
                    {name:'distruptor', img:'src/assets/monster/disruptor.png', atk: 2, def: 3, stat: true, type: 0, clicked: false},
                    {name:'doom bringer', img:'src/assets/monster/doom_bringer.png', atk: 3, def: 5, stat: true, type: 0, clicked: false},
                    {name:'dragon knight', img:'src/assets/monster/dragon_knight.png', atk: 4, def: 4, stat: true, type: 0, clicked: false},
                    {name:'drow ranger', img:'src/assets/monster/drow_ranger.png', atk: 6, def: 2, stat: true, type: 0, clicked: false},
                    {name:'earth spirit', img:'src/assets/monster/earth_spirit.png', atk: 3, def: 3, stat: true, type: 0, clicked: false},
                    {name:'earthshaker', img:'src/assets/monster/earthshaker.png', atk: 4, def: 3, stat: true, type: 0, clicked: false},
                    {name:'elder titan', img:'src/assets/monster/elder_titan.png', atk: 4, def: 4, stat: true, type: 0, clicked: false},
                    {name:'ember spirit', img:'src/assets/monster/ember_spirit.png', atk: 5, def: 3, stat: true, type: 0, clicked: false},
                    {name:'enchantress', img:'src/assets/monster/enchantress.png', atk: 4, def: 4, stat: true, type: 0, clicked: false},
                    {name:'enigma', img:'src/assets/monster/enigma.png', atk: 2, def: 5, stat: true, type: 0, clicked: false},
                    {name:'faceless_void', img:'src/assets/monster/faceless_void.png', atk: 6, def: 2, stat: true, type: 0, clicked: false},
                    {name:'furion', img:'src/assets/monster/furion.png', atk: 4, def: 3, stat: true, type: 0, clicked: false},
                    {name:'grimstroke', img:'src/assets/monster/grimstroke.png', atk: 3, def: 2, stat: true, type: 0, clicked: false},
                    {name:'gyrocopter', img:'src/assets/monster/gyrocopter.png', atk: 5, def: 2, stat: true, type: 0, clicked: false},
                    {name:'huskar', img:'src/assets/monster/huskar.png', atk: 5, def: 5, stat: true, type: 0, clicked: false},
                    {name:'invoker', img:'src/assets/monster/invoker.png', atk: 5, def: 4, stat: true, type: 0, clicked: false},
                    {name:'jakiro', img:'src/assets/monster/jakiro.png', atk: 3, def: 3, stat: true, type: 0, clicked: false},
                    {name:'juggernaut', img:'src/assets/monster/juggernaut.png', atk: 6, def: 4, stat: true, type: 0, clicked: false},
                    {name:'kotl', img:'src/assets/monster/keeper_of_the_light.png', atk: 1, def: 5, stat: true, type: 0, clicked: false},
                    {name:'kunkka', img:'src/assets/monster/kunkka.png', atk: 4, def: 4, stat: true, type: 0, clicked: false},
                    {name:'legioncommander', img:'src/assets/monster/legion_commander.png', atk: 4, def: 3, stat: true, type: 0, clicked: false},
                    {name:'+1', img:'src/assets/spell/increase.png', atk: 0, def: 0, stat: true, type: 1, clicked: false},
                    {name:'+2', img:'src/assets/spell/increase.png', atk: 0, def: 0, stat: true, type: 2, clicked: false},
                    {name:'+2', img:'src/assets/spell/increase.png', atk: 0, def: 0, stat: true, type: 2, clicked: false},
                    {name:'+1', img:'src/assets/spell/increase.png', atk: 0, def: 0, stat: true, type: 1, clicked: false},
                ],
            }
        },
        watch:{
            yourTurn(){
                if(this.yourTurn == false){
                    this.enemyTurn = true;
                    this.yourFirstTurn ? this.yourPointStep=1 : this.yourPointStep=2;
                }
            },
            enemyTurn(){
                if(this.enemyTurn == false) {
                    this.yourTurn = true;
                    this.enemyFirstTurn ? this.enemyPointStep=1 : this.enemyPointStep=2;
                }
            }
        },
        methods:{
            startGame(){
                for(var i=0;i<4;i++){
                    this.yourCard.push(this.randomPick());
                    this.enemyCard.push(this.randomPick());
                }
            },
            randomPick(){
                return this.allCard[Math.floor(Math.random()*this.allCard.length)]
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.startGame();
                this.yourTurn = true;
            });
        }
    }

</script>


