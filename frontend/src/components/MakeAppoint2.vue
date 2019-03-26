

<template>
  <section class="make-appoint2">
    <calendar-date-picker
    @update-appoint="updateAppoint"></calendar-date-picker>
  </section>
</template>

<script>
import CalendarDatePicker from "@/components/CalendarDatePicker.vue";

export default {
  methods:{
    moveToCmp(cmpName){
      this.$emit('set-cmp',cmpName)
    },
    updateAppoint(payload){
      console.log('update appoint recevied in makeappoint2 cmp with this payload',payload)
     this.$emit('update-appoint',payload)
    }
  },
  components: {
    CalendarDatePicker
  }
};
</script>
