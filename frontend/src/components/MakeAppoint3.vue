

<template>
  <section class="make-appoint3">
    <h1>leave contacts for host</h1>
    <input type="text" v-model="userName" placeholder="name"/>
    <input type="text" v-model="phone" placeholder="phone"/>
    <v-btn @click="sendAddUser">ok</v-btn>
  
  </section>
</template>

<script>

export default {
  props:['appoint'],
  data(){
    return{
      userName:'',
      phone:null,
    }
  },
  computed:{
    user(){
      return {
      userName:this.userName,
      phone:this.phone,
      pass:null,
      isReg:false,
      business_id:null
      }
    }
  },
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
    sendAddUser(){
       this.$emit("add-user",this.user)
    }
  },
 
};
</script>

<style lang="scss">
.make-appoint3{
  height: 100%;
  display:flex;
  flex-direction:column;
 justify-content: space-between;
 button.v-btn{
   background-color:rgb(25, 136, 240) !important;
   opacity: 0.9;
 }
 input{
   border:1px black solid;
 }
}
</style>

