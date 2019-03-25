<template>
  <section>
    <component :is="displayCmp.type" :payload="displayCmp.payload" @event-pressed="checkIfLogin"></component>
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
      cmps: [],
      selectedProduct:null,
    };
  },
  methods: {
    cmpSetter(cmpName,payload) {
      //get the chosen cmp
      var component = this.cmps.find(cmp => cmp.type === cmpName);
      //upload payload on cmp and set the cmp
      component.payload = payload
      this.displayCmp = component
    },
    checkIfLogin(payload) {
      console.log("check if login activated!",payload);
      if (this.$store.getters.loggedInUser) {
        this.cmpSetter("CalendarMakeAppointAdd",payload);
      } else {
        this.cmpSetter("CalendarMakeAppointRegister",payload);
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
