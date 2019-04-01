<template>
    <section class="workTimeCmp">
    <h3>Choos your working hours</h3>
   <div class="workTimeContiner">
        <div class="day sun">
            <span>Sunday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,0)"/>
        </div>
        <div class="day mun">
            <span>Monday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,1)"/>
        </div>
        <div class="day tue">
            <span>Tuesday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,2)"/>
        </div>
        <div class="day wen">
            <span>Wednesday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,3)"/>
        </div>
        <div class="day thu">
            <span>Thursday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,4)"/>
        </div>
        <div class="day thu">
            <span>Friday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,5)"/>
        </div>
        <div class="day thu">
            <span>Saterday</span>
            <from-to @setWorkTime="setWorkTimeArr($event,6)"/>
        </div>
        </div>
        <button @click="saveWorkTime">Done</button>
    </section>
</template>
<script>
import FromTo from '@/components/FromTo.vue'
export default {
    components:{
        FromTo
    },
    data(){
        return{
            workHour:[
            {
                dayOfTheWeek:0,
                timeRanges:[]
            },
            {
                dayOfTheWeek:1,
                timeRanges:[]
            },
            {
                dayOfTheWeek:2,
                timeRanges:[]
            },
            {
                dayOfTheWeek:3,
                timeRanges:[]
            },
            {
                dayOfTheWeek:4,
                timeRanges:[]
            },
            {
                dayOfTheWeek:5,
                timeRanges:[]
            },
            {
                dayOfTheWeek:6,
                timeRanges:[]
            }
            ]
        }
    },
    methods:{
        setWorkTimeArr(val,num){
            var work={dayOfTheWeek:num, timeRanges:[val]}
            this.workHour.splice(num,1,work)
        },
            saveWorkTime(){
                this.$emit('setWorkTime',this.workHour)
            }
    }
}
</script>
<style scoped lang="scss">
.workTimeCmp{
 display: flex;
 flex-direction: column;
 align-items: center;
 background-color: white;
 border: .3px solid;
box-shadow: 4px 3px 14px 2px rgba(0,0,0,0.75);
border-radius: 5px;
padding: 10px;
button{
    font-size: 1.2rem;
    padding: 0 17px;
    border-radius: 15px;
    border: 0.8px solid #42b983;
    color: white;
    background-color: #42b983;
    }

}

.workTimeContiner{
    display: flex;
    justify-content: center;
    margin: 5px;
   
}
.day{
    display: flex;
    flex-direction: column;
    margin: 20px;

}
</style>


