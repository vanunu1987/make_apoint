

<template>
  <section class="make-appoint5">
    {{appoint}}
    <v-btn @click="sendAddAppoint">confirm</v-btn>
  
  </section>
</template>

<script>

export default {
  props:['appoint'],
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
        "update appoint recevied in makeappoint5 cmp with this payload",
        payload
      )
      this.$emit("update-appoint", payload);
    },
    sendAddAppoint(){
       this.$emit("make-appoint")
    }
  },
 
};
</script>

<style lang="scss">
.make-appoint5{
  .v-btn:before{
  background-color:rgb(43, 255, 0);
  opacity: 0.9;
}


}
</style>

