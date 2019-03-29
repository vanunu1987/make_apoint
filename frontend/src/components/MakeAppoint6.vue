

<template>
  <section class="make-appoint6">
    <h1>see you there!</h1>
  <img src="../assets/success.gif">
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
       this.$emit('set-cmp','MakeAppoint6')
    }
  },
 
};
</script>

<style lang="scss">
.make-appoint6{
   background-image: linear-gradient(rgb(23, 156, 245), rgb(255, 255, 248));
   font-size:50px;
   img{
     max-width:100%;
max-height:100%;
   }


}
</style>

