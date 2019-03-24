<template>
  <section>
    <component :is="displayCmp.type" @event-pressed="checkIfLogin"></component>
  </section>
</template>

<script>
import CalendarMakeAppoint from "@/components/CalendarMakeAppoint.vue";
import CalendarMakeAppointRegister from "@/components/CalendarMakeAppointRegister.vue";
import CalendarMakeAppointAdd from "@/components/CalendarMakeAppointAdd.vue";
export default {
  components: {
    CalendarMakeAppoint,
    CalendarMakeAppointRegister,
    CalendarMakeAppointAdd
  },
  data() {
    return {
      displayCmp: { type: "CalendarMakeAppoint" },
      cmps: []
    };
  },
  methods: {
    moveToCmp(cmpName) {
      this.displayCmp = this.cmps.find(cmp => cmp.type === cmpName);
    },
    checkIfLogin(payload) {
      console.log("check if login activated!",payload);
      if (this.$store.getters.loggedInUser) {
        this.moveToCmp("CalendarMakeAppointAdd");
      } else {
        this.moveToCmp("CalendarMakeAppointRegister");
      }
    }
  },
  created() {
    this.cmps.push({ type: "CalendarMakeAppoint" });
    this.cmps.push({ type: "CalendarMakeAppointRegister" });
    this.cmps.push({ type: "CalendarMakeAppointAdd" });
  }
};
</script>
