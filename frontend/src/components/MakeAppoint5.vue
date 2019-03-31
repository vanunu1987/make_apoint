

<template>
  <section class="make-appoint5">
    <h1>almost there!</h1>
    <h1 style="text-decoration:underline;">confirm appointment details:</h1>
    <h1>{{appoint.product.title}}</h1>
    <h1>{{appoint.date}}</h1>
    <h1>{{appoint.startTime}}</h1>
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
  h1{
    text-align: left;
  }
   height: 100%;
   font-size:29px;
  .v-btn:before{
  background-color:rgb(0, 238, 255);
  opacity: 0.9;
}


}
</style>

