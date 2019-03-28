

<template>
  <section class="make-appoint5">
    <h1>make A ppoint!</h1>
    <h1>aapointment details:</h1>
    <h1>{{appoint.date}}</h1>
    <h1>{{appoint.startTime}}</h1>
    <h1>{{appoint.product.title}}</h1>
    <h1>{{appoint.product.duration | hours}}</h1>
    <h1>{{appoint.product.price | dollar}}</h1>
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
       this.$emit('set-cmp','MakeAppoint6')
    }
  },
 
};
</script>

<style lang="scss">
.make-appoint5{
   background-image: linear-gradient(rgb(97, 183, 253), rgb(159, 236, 255));
   height: 100%;
   font-size:29px;
  .v-btn:before{
  background-color:rgb(255, 145, 0);
  opacity: 0.9;
}


}
</style>

