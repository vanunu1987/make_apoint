<template>
  <section>
    <h1>jfdslkfj</h1>
    {{events}}
    <div v-for="event in events" :key="event.time">
      {{event.date}}
      {{event.time}}
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
      );
    },
    // convert the list of events into a map of lists keyed by date
    // eventsMap() {
    //   const map = {};
    //   this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
    //   return map;
    // }
  },
  created() {
    // this.dateToShow = moment().format('YYYY-MM-DD')
    // this.weekSunday = moment().format('YYYY-MM-DD')
  },
  mounted() {
    // this.$refs.calendar.scrollToTime("08:00");
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius:5px;
  background-color: #88de2b;
  color: #f8fff5;
  font-size: 16px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 3px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 3px;
    margin-right: 0px;
    margin-top:3px;
  }
}
</style>