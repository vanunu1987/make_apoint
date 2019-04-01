

<template>
  <section class="make-appoint-time-date-picker">
    <calendar-date-picker 
      class="calendar"
      @to-cmp-appoint-picker="sendToCmpAppointPicker"
      @update-appoint="updateAppoint"
    ></calendar-date-picker>
    <calendar-appoint-picker  class="appoint-picker" @move-to-cmp="moveToCmp" @update-appoint="updateAppoint" :date="selectedDay">
    </calendar-appoint-picker>

  </section>
</template>

<script>
import CalendarDatePicker from "@/components/CalendarDatePicker.vue";
import CalendarAppointPicker from "@/components/CalendarAppointPicker.vue";

export default {
  data() {
    return {
      selectedDay: '',
      showModal:true,
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

<style lang="scss">
section.make-appoint-time-date-picker{
  display:flex;
  position:relative;
  height: 400px;
 
  .appoint-picker{
    border: 2px solid grey;
    padding: 10px;
    background-color: white;
    // top: 33%;
    // left: -26%;
    // transform: translate(-50%, -50%);
    // position: absolute;
    z-index: 4;
    width: 40%;
}
  


}
</style>

