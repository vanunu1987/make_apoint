<template>
    <section>
        <ul class="workTime">
<li
v-for="(hour,idx) in hours "
:key="idx"
:class="{marked: hour.isMarked}"
>
<button @click="setTime(idx)">{{hour.time}}</button>
</li>

        </ul>
    </section>
</template>

<script>
export default {
    data(){
        return {
            hours:[{time:"08:00",isMarked:false},{time:"09:00",isMarked:false},{time:"10:00",isMarked:false},{time:"11:00",isMarked:false},{time:"12:00",isMarked:false},{time:"13:00",isMarked:false},{time:"14:00",isMarked:false},{time:"15:00",isMarked:false},{time:"16:00",isMarked:false},{time:"17:00",isMarked:false},],
            clicks:1
            
        }
    },
    methods:{
       setTime(idx) {
           console.log(idx);
           
           if (this.hours[idx].isMarked) {
               this.hours[idx].isMarked=false
               this.clicks=1
               return
           } 
           else if (this.clicks===1)  {
               this.hours[idx].isMarked=true
               this.clicks=2
               return
           }else {
             
             while (!this.hours[idx].isMarked){
                 console.log(idx);
                 
                 this.hours[idx].isMarke=true
                 console.log(this.hours[idx]);
                 
                 idx--
             }
           }
       }
    }
}
</script>

<style scoped>
.workTime{
    display: flex;
    flex-direction: column;
    color: black;
}
.marked{
    background-color: greenyellow;
    
}
</style>

