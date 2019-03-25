<template>
    <section>
        <ul class="workTime">
<li
v-for="(hour,idx) in hours "
:key="idx"
>
<button :class="{marked: hour.isMarked}" @click="setTime(idx)">{{hour.time}}</button>
</li>

        </ul>
    </section>
</template>

<script>
export default {
    data(){
        return {
            hours:[{time:"08:00",isMarked:false},{time:"09:00",isMarked:false},{time:"10:00",isMarked:false},{time:"11:00",isMarked:false},{time:"12:00",isMarked:false},{time:"13:00",isMarked:false},{time:"14:00",isMarked:false},{time:"15:00",isMarked:false},{time:"16:00",isMarked:false},{time:"17:00",isMarked:false},],
            clicks:1,
            from:'',
            to:''
        }
    },
    methods:{
       setTime(idx) {
           var falseObj={time:this.hours[idx].time,isMarked:false}
           var trueObj={time:this.hours[idx].time,isMarked:true}
           if (this.hours[idx].isMarked) {
               this.hours.splice(idx,1,falseObj)
               this.from=''
               this.clicks=1
               return
           } 
           else if (this.clicks===1)  {
               this.hours.splice(idx,1,trueObj)
               this.from=this.hours[idx].time
               this.clicks=2
               return
           }else {
               this.to=this.hours[idx].time
               this.$emit('setWorkTime',{from:this.from,to:this.to})
             while (!this.hours[idx].isMarked){
                var trueObj={time:this.hours[idx].time,isMarked:true}
               this.hours.splice(idx,1,trueObj)
                 idx--
             }
           }
       }
    }
}
</script>

<style lang="scss" scoped>
.workTime{
    display: flex;
    flex-direction: column;
    color: black;
}
.marked{
    background-color: greenyellow;
    
}
button{
    margin: 3px;
    padding: 2px;
    border-radius: 5px;
     &:focus{
            outline:none;
        }
}
/* ul{
    margin: 5px;
} */
</style>

