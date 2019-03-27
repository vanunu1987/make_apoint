

<template>
  <section class="make-appoint2">
    <calendar-date-picker 
      class="calendar"
      @to-cmp-appoint-picker="sendToCmpAppointPicker"
      @update-appoint="updateAppoint"
    ></calendar-date-picker>
    <!-- <div class="calendar-modal" v-if="showModal"  @click="this.showModal = false"></div> -->
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
section.make-appoint2{
  position:relative;
  .calendar-modal{
    width:100%;
    height: 100%;
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background-color: #ffffff94;
    z-index: 3;
  }
  .appoint-picker{
    background-color: white;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    position:absolute;
    z-index: 4;
  }


}
</style>

