

<template>
  <section class="make-appoint5">
    <h1>Almost there!</h1>
    <h1 style="text-decoration:underline;">Confirm appointment details:</h1>
    <h5>{{appoint.product.title | capitalize}}</h5>
    <h5>{{appoint.date }}</h5>
    <h5>{{appoint.startTime}}</h5>
    <h5>{{appoint.product.duration | hours}}</h5>
    <h5>{{appoint.product.price | dollar}}</h5>
    <button @click="sendAddAppoint">confirm</button>
  
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
  h1,h2,h3,h5{
  font-weight:100;
  text-align: left;
  }
  h1{
    margin-bottom: 5px;
  }
   height: 100%;
   font-size:29px;
  button{
  border-radius: 15px;
      border: 0.8px solid #3899ec;
      color: #3899ec;
      background-color: #f0f4f7;
      font-size: 1.5rem;
      padding: 0 17px;
      text-align: center;
      &:hover{
         z-index: 1000;
      visibility: visible;
      background-color: #3899ec;
      color: white;
      }
}


}
</style>

