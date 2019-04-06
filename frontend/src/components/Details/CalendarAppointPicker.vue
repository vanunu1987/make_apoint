<template>
  <section class="calendar-appoint-picker">
    <h1>{{events.length}} times available</h1>

    <span>
      <i class="far fa-calendar-alt"></i>
      {{formatedDate}}
    </span>

    <div class="appoint" v-for="event in events" :key="event.startTime">
      <div>
        <h5>
          <i class="far fa-clock"></i>
          {{ event.startTime}}
        </h5>
        <h5>
          <i class="far fa-hourglass"></i>
          {{ event.duration | hours}}
        </h5>
      </div>

      <button @click="checkIfLogin(event.startTime)">Choose</button>
    </div>
  </section>
</template>

<script>
import CalendarService from "@/services/CalendarService.js";
import moment from "moment";

export default {
  props: ["date"],

  computed: {
    dayDate() {
      return this.date;
    },
    events() {
      return CalendarService.getDayEventsForCalendar(
        this.dayDate,
        this.$store.getters.currBusiness.workHours,
        this.$store.getters.appointsList
      );
    },
    formatedDate() {
      return moment(this.date).format("MMMM Do");
    }
  },

  methods: {
    open(event) {
      this.$emit("event-pressed", { event });
    },
    moveWeeks(weekCount) {
      var count = weekCount * 7 - moment(this.dateToShow).day();
      this.dateToShow = moment(this.dateToShow)
        .add(count, "days")
        .format("YYYY-MM-DD");
    },
    checkIfLogin(selectedTime) {
      this.$emit("update-appoint", {
        property: "startTime",
        value: selectedTime
      });
      if (this.$store.getters.loggedInUser) {
        this.$emit("move-to-cmp", "MakeAppoint5");
      } else {
        this.$emit("move-to-cmp", "UserLoginSignup");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.calendar-appoint-picker {
  overflow: auto;
  padding: 0 10px 0;
  display: flex;
  flex-direction: column;

  div.appoint {
    border-top: 1px grey solid;
    padding: 24px 0;
    display: flex;
    justify-content: space-between;

    div {
      font-size: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
  }

  div.appoint:last-child {
    border-bottom: 1px grey solid;
  }

  span {
    font-size: 20px;
    margin: 8px 0 20px;
    align-self: flex-start;
  }
  h1 {
    font-size: 32px;
    text-align: left;
    font-weight: 400;
  }

  button {
    border: 2px solid $primary-color;
    color: $primary-color;
    font-size: 16px;
    padding: 10px 22px;
    border-radius: 3px;
    font-weight: bold;
    transition: 0.3s ease;
  }

  h5 {
    font-size: 14px;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
  }
  h5:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>
