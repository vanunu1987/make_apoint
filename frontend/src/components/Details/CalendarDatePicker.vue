<template>
  <section class="calendar-date-picker">
    <div class="calendar-container">
      <div class="calendar-options-container">
        <span dark>{{monthName}}</span>
        <div class="calendar-button-container">
          <button class="calendar" @click="$refs.calendar.prev()">
            <v-icon left dark>keyboard_arrow_left</v-icon>
          </button>
          <button class="calendar" @click="$refs.calendar.next()">
            <v-icon right dark>keyboard_arrow_right</v-icon>
          </button>
        </div>
      </div>

      <v-layout wrap>
        <v-calendar ref="calendar" v-model="start" :type="type" :end="end" color="primary"></v-calendar>
      </v-layout>
    </div>
  </section>
</template>


<script>
import CalendarService from "@/services/CalendarService.js";
export default {
  data: () => ({
    type: "month",
    start: moment().format("YYYY-MM-DD"),
    end: ""
  }),
  computed: {
    monthName() {
      return moment(this.start).format("MMMM");
    },
    availableCount() {
      return CalendarService.getDayEventsForCalendar(
        this.start,
        this.$store.getters.currBusiness.workHours,
        this.$store.getters.appointsList
      );
    }
  },
  watch: {
    start: function() {
      console.log("month :::", this.start);
      this.$emit("update-appoint", { property: "date", value: this.start });
      this.$emit("to-cmp-appoint-picker", {
        property: "date",
        value: this.start
      });
    }
  }
};
</script>




<style lang="scss" scoped>
button.calendar {
  margin-top: 0px;
}
div.v-sheet {
  height: 360px !important;
}
.v-icon--right {
  margin-left: 0px !important;
}
.calendar-options-container {
  display: flex;
  justify-content: space-between;
  margin: 22px 0px;
  margin-top: 0px;
}
span {
  font-size: 18px;
}
</style>


<style lang="scss" >
$primary-color: rgb(0, 132, 137);

section.calendar-date-picker.calendar {
  position: relative !important;
}
div.layout.wrap {
  flex: 1 !important;
}
div.flex.mb-3.xs12 {
  height: 70% !important;
}

.calendar-container {
  display: flex !important;
  // position: absolute !important;
  flex-direction: column !important;
  // top:0px !important;
  // left:0px !important;
  // width:100% !important;
  // height:100% !important;
  width: 400px;
  height: 400px;
}

.v-calendar-weekly__head-weekday {
  &.v-outside,
  &.v-future,
  &.v-present,
  &.v-past {
    font-size: 12px !important;
    font-weight: 200 !important;
    color: #757575 !important;
    background-color: rgba(0, 132, 137, 0) !important;
  }
}

div.v-calendar-weekly__day-month {
  display: none;
}

div.v-calendar-weekly__day {
  background-color: rgb(237, 246, 246);
  border: 1.5px solid white !important;
  border-radius: 6px !important;
  &.available {
    background-color: red;
  }
}

div.v-calendar-weekly__day:hover {
  cursor: pointer;
  background-color: rgb(167, 208, 208);
}

div.v-calendar-weekly__day-label {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $primary-color;
  font-size: 18px !important;
  font-weight: 800;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: white;
    background-color: $primary-color;
  }
}

div.v-outside {
  background-color: #f7f7f7 !important;
  cursor: default !important;
  div.v-calendar-weekly__day-label {
    color: #d7d7d7;
    cursor: default;
  }
}

div.v-past {
  background-color: #f7f7f7 !important;
  cursor: default !important;
  div.v-calendar-weekly__day-label {
    color: #d7d7d7;
    cursor: default;
  }
}

.theme--dark.v-icon {
  color: black !important;
}

div.calendar-button-container {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 740px) {
  .calendar-container{
        max-width: 320px;
     }

.calendar-date-picker{
       display: flex;
       justify-content: center;

     }
}
@media(max-width:500px) {
  .calendar-container{
    width: 100%;
    height: auto;
  }

  section.calendar-date-picker.calendar{
    margin: 20px 0;
  }
}
@media(max-width:740px) {

  .calendar-date-picker{
    display: flex;
    justify-content: center;

  }
  .calendar-container{
    max-width: 320px;
  }


}

</style>

