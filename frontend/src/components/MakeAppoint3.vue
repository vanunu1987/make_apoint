

<template>
  <section class="make-appoint3">
    <form @submit.prevent="sendAddUser">
    <h1>Please enter your details :</h1>
    <input type="text" v-model="userName" placeholder="Your Name">
    <input type="tel" v-model="phone" placeholder="Phone Number">
    <button @click="sendAddUser">Submit</button>
    </form>
    <!-- <form>
        <h1>Please enter your details :</h1>
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
    <button @click="sendAddUser">submit</button>
  </form> -->
    
  
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
      console.log('details : ',this.user);
       this.$emit("add-user",this.user)
    }
  },
 
};
</script>

<style lang="scss">
.make-appoint3{
  height: 100%;
  display:flex;
  // font-size: 23px;
  flex-direction:column;
 justify-content: space-between;
//  align-items: left;
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
}
 button{
      border-radius: 3px;
      border: 0.8px solid #3899ec;
      color: #3899ec;
      background-color: #f0f4f7;
      // font-size: 1.3rem;
      padding: 5px;
      text-align: center;
      transition: .3s ease;
      width: 100px;
      &:hover{
      z-index: 1000;
      visibility: visible;
      background-color: #3899ec;
      color: white;
      }
}

 h1{
   text-align: left;
   font-size: 2rem;
   margin-bottom: 100px;
 }
 
 input{
  //  border:1px black solid;
  background-color: #eeeeee;
  width: 50%;
  text-align: center;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
   
 }
}
</style>

