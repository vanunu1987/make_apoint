

<template>
  <section class="make-appoint3">
      <form>
        <h1>contacts for host:</h1>
    <v-text-field
      v-model="phone"
      v-validate="'required|max:10'"
      :counter="10"
      label="Name"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      v-validate="'required|email'"
      label="phone"
      data-vv-name="email"
      required
    ></v-text-field>
   
    <v-btn @click="sendAddUser">submit</v-btn>

   
  </form>
    
  
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
  font-size: 23px;
  flex-direction:column;
 justify-content: space-between;
 align-items: left;

 h1{
   text-align: left;
 }
 button.v-btn{
   background-color:#2f71ff !important;
   opacity: 0.9;
 }
 input{
  //  border:1px black solid;
  background-color: #eeeeee;
  width: 50%;
  text-align: center;
  padding: 5px;
  border-radius: 3px;
   
 }
}
</style>

