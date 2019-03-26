

<template>
  <section class="make-appoint2">
    <calendar-date-picker></calendar-date-picker>
  </section>
</template>

<script>
import CalendarDatePicker from "@/components/CalendarDatePicker.vue";

export default {
  methods:{
    moveToCmp(cmpName){
      this.$emit('set-cmp',cmpName)
    }
  },
  components: {
    CalendarDatePicker
  }
};
</script>
