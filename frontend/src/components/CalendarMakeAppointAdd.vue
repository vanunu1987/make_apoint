<template>
  <section>
    <h1>appointment details:</h1>
    {{appointDetails}}
    <button>makeAppoint!</button>
  </section>
</template>

<script>
export default {
  props: ["payload"],
  computed: {
    event() {
      return this.payload.event;
    },
    weekday() {
      var date = this.event.date;
      return moment(date).format("dddd");
    },
    appointDetails(){
        return `${this.event.title} in ${this.weekday}, ${this.event.date} 
                  ${this.event.time} o'clock for ${this.event.duration} minutes`
    },
    appoint(){
        return{
            user_id:this.$store.getters.loggedInUser._id,
            business_id:this.$store.getters.currBusiness._id,
            product_id:this.event.title,
            startTime:this.event.time,
            date:this.event.date
        }
    }
  }
};
</script>


<style scoped>
section {
  background-color: white;
}
</style>
