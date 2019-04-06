<template>
  <section class="calendar-appoint-picker">
    <span><i class="far fa-calendar-alt"></i> {{formatedDate}}</span>
   <h1>{{events.length}} Available Hours</h1>
    <!-- <span><i class="far fa-calendar-alt"></i> {{dayDate}}</span> -->
    <br/>
    <div class="appoint" v-for="event in events" :key="event.startTime">
     <div>
     <h5><i class="far fa-clock"></i> {{ event.startTime}} </h5>
     <h5><i class="far fa-hourglass"></i> {{ event.duration|hours}}</h5>
     </div>
     <button @click="checkIfLogin(event.startTime)">Choose</button>
    </div>
  </section>
</template>

<script>
import CalendarService from "@/services/CalendarService.js";
import moment from "moment";

export default {
  props:['date'],

  computed:{
    dayDate(){
      return this.date
    },
    events() {
      console.log('service paramss',this.dayDate,this.$store.getters.currBusiness.workHours, this.$store.getters.appointsList)
      return CalendarService.getDayEventsForCalendar(this.dayDate,
        this.$store.getters.currBusiness.workHours,
        this.$store.getters.appointsList
    )},
    formatedDate(){
      return moment(this.date).format('MMMM Do')
    }
  },
   
  methods: {
    open(event) {
      this.$emit('event-pressed',{event})
    },
    moveWeeks(weekCount) {
      var count = weekCount * 7 - moment(this.dateToShow).day();
      this.dateToShow = moment(this.dateToShow)
        .add(count, "days")
        .format("YYYY-MM-DD");
    },
    checkIfLogin(selectedTime){
      this.$emit('update-appoint',{property:'startTime',value:selectedTime})
      if(this.$store.getters.loggedInUser){
         this.$emit('move-to-cmp','MakeAppoint5')
      }else{
         this.$emit('move-to-cmp','MakeAppoint3')
      }
    }
  }
};
</script>




<style lang="scss" scoped>
.calendar-appoint-picker{
  // margin-top:64px;
  // border: 1px solid rgb(182, 181, 181) !important;
  overflow: auto;
  padding: 0 10px 0;
div.appoint{
  border-top:1px grey solid;
  padding: 5px 0;
  display:flex;
  justify-content:space-between;
  div{
    font-size:15px;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
  }
}
span{
  font-size:20px;
  margin: 0 0 20px;
}
h1{
  font-size: 1.3rem;
  text-align: left;
  margin: 11px 0 0 0;
}
button{
  background-color: #42b983;
  padding: 5px;
  border-radius: 3px;
  font-weight: bold;
  transition: .3s ease;
  &:hover{
    color: white;
  }
}

}
</style>
