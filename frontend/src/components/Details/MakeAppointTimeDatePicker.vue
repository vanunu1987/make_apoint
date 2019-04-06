

<template>
  <section class="make-appoint-time-date-picker">
    <calendar-date-picker
      class="calendar"
      @to-cmp-appoint-picker="sendToCmpAppointPicker"
      @update-appoint="updateAppoint"
    ></calendar-date-picker>

    <calendar-appoint-picker
      class="appoint-picker"
      @move-to-cmp="moveToCmp"
      @update-appoint="updateAppoint"
      :date="selectedDay"
    ></calendar-appoint-picker>
  </section>
</template>

<script>
import CalendarDatePicker from "@/components/Details/CalendarDatePicker.vue";
import CalendarAppointPicker from "@/components/Details/CalendarAppointPicker.vue";

export default {
  data() {
    return {
      selectedDay: Date.now(),
      showModal: true
    };
  },
  methods: {
    sendToCmpAppointPicker(payload) {
      this.selectedDay = payload.value;
    },
    moveToCmp(cmpName) {
      this.$emit("set-cmp", cmpName);
    },
    updateAppoint(payload) {
      this.$emit("update-appoint", payload);
    }
  },
  components: {
    CalendarDatePicker,
    CalendarAppointPicker
  }
};
</script>

<style lang="scss">
section.make-appoint-time-date-picker {
  display: flex;
  justify-content: space-around;
  position: relative;
  height: 540px;
  width: 100%;

  .appoint-picker {
    background-color: white;
    z-index: 4;
    width: 40%;
  }
}
</style>

