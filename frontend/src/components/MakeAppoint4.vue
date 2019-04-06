

<template>
  <section class="make-appoint2">
    <calendar-date-picker
      @to-cmp-appoint-picker="sendToCmpAppointPicker"
      @update-appoint="updateAppoint"
    ></calendar-date-picker>

    <calendar-appoint-picker @move-to-cmp="moveToCmp" :date="selectedDay"></calendar-appoint-picker>
  </section>
</template>

<script>
import CalendarDatePicker from "@/components/Details/CalendarDatePicker.vue";
import CalendarAppointPicker from "@/components/Details/CalendarAppointPicker.vue";

export default {
  data() {
    return {
      selectedDay: '2019-03-27'
    };
  },
  methods: {
    sendToCmpAppointPicker(payload) {
      console.log("sendToCmpAppointPicker", payload);
      this.selectedDay = payload.value;
    },
    moveToCmp(cmpName) {
      this.$emit("set-cmp", cmpName);
    },
    updateAppoint(payload) {
      console.log(
        "update appoint recevied in makeappoint2 cmp with this payload",
        payload
      );
      this.$emit("update-appoint", payload);
    }
  },
  components: {
    CalendarDatePicker,
    CalendarAppointPicker
  }
};
</script>
