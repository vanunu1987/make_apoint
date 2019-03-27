<template>
  <section class="calendar-appoint-picker">
   
    <i class="far fa-calendar-alt"></i> {{dayDate}}
    <br/>
    <div class="appoint" v-for="event in events" :key="event.time">
     <div>
     <h5><i class="far fa-clock"></i> start time: {{ event.time}} </h5>
     <h5><i class="far fa-hourglass"></i> duration: {{ event.duration}}</h5>
     </div>
     <v-btn @click="checkIfLogin(event.time)" outline color="indigo">choose</v-btn>
    </div>
  </section>
</template>

<script>
import CalendarService from "../services/CalendarService.js";

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
      )}
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
      if(this.$store.getters.loggedInUser){
        console.log('f checkIfLogin activated in CalendarAppointPicker cmp')
         this.$emit('update-appoint',{property:'startTime',value:selectedTime})
         this.$emit('move-to-cmp','MakeAppoint5')
      }
    }
  }
};
</script>




<style lang="scss" scoped>
.calendar-appoint-picker{
div.appoint{
  border-top:1px grey solid;
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

}
</style>