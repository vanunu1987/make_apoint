<template>
  <v-layout>
    <v-flex>
      <v-sheet height="400">
        <v-btn fab outline small absolute left color="primary" @click="moveWeeks(-1)">
          <v-icon dark>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn fab outline small absolute right color="primary" @click="moveWeeks(1)">
          <v-icon dark>keyboard_arrow_right</v-icon>
        </v-btn>
        <!-- now is normally calculated by itself, but to keep the calendar in this date range to view events -->
        <v-calendar ref="calendar" :now="today" :value="dateToShow" color="primary" type="week">
          <!-- the events at the top (all-day) -->
          <template v-slot:dayHeadere="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
import CalendarService from "../services/CalendarService.js";
import workHours from "../services/testWorkHours.json";

console.log(workHours);

export default {
  data: () => ({
    today: "2019-01-09",
    dateToShow: "2019-01-09"
  }),
  computed: {
    events() {
      var date = moment(this.dateToShow);
      var now = moment(this.today);
      return CalendarService.getEvents(
        workHours,
        now > date ? this.today : this.dateToShow
      );
    },
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  created() {
    // this.dateToShow = moment().format('YYYY-MM-DD')
    // this.weekSunday = moment().format('YYYY-MM-DD')
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    open(event) {
      alert(event.title);
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
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}
</style>