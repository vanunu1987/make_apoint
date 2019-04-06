

<template>
  <section class="make-appoint">
    <component 
    :is="currCmp.name" 
    :payload="currCmp.payload"
    :appoint = "appoint"
    @set-cmp="setCmp" 
    @make-appoint="makeAppoint"
    @update-appoint="updateAppoint"
    @add-user="addUser"
    >
    </component>
  </section>
</template>

<script>
import DetailsPageFooter from "@/components/DetailsPageFooter.vue";
import MakeAppointTimeDatePicker from "@/components/MakeAppointTimeDatePicker.vue";
import MakeAppoint3 from "@/components/MakeAppoint3.vue";
import MakeAppoint4 from "@/components/MakeAppoint4.vue";
import MakeAppoint5 from "@/components/MakeAppoint5.vue";
import MakeAppoint6 from "@/components/MakeAppoint6.vue";

export default {
  data() {
    return {
        currCmp:{ name: "DetailsPageFooter" },
        cmps:[],
        appoint:{
          date:null,
          startTime:null,
          user_id:null,
          business_id:this.$store.getters.currBusiness._id,
          product:this.$store.getters.currBusiness.products[0]
        }
    };
  },
  methods: {
    setCmp(cmpName, payload) {
      console.log('setCmp activated',cmpName)
      //get the chosen cmp
      var component = this.cmps.find(cmp => cmp.name === cmpName);
      //upload payload on cmp and set the cmp
      component.payload = payload;
      this.currCmp = component;
    },
    updateAppoint(payload) {
      var property = payload.property
      var value = payload.value
      console.log('updateAppoint activated',value)
      this.appoint[property] = value
      console.log('appoint is updated:',this.appoint)
    },
    addUser(user){
      this.$store.dispatch({type:'signUpUser',credentials:user,isNewBusiness:false}).then(()=>{
        console.log('promise return')
        this.setCmp('MakeAppoint5')
      })
      console.log(user)
    },
    makeAppoint(){
this.$store.dispatch({type:'addAppoint',appoint:this.appoint}).then(()=>console.log('sucsess!'))
    }
  },
  created() {
    this.cmps.push({ name: "DetailsPageFooter" });
    this.cmps.push({ name: "MakeAppointTimeDatePicker" });
    this.cmps.push({ name: "MakeAppoint3" });
    this.cmps.push({ name: "MakeAppoint4" });
    this.cmps.push({ name: "MakeAppoint5" });
    this.cmps.push({ name: "MakeAppoint6" });
    if(this.$store.getters.loggedInUser) this.appoint.user_id = this.$store.getters.loggedInUser._id
  },
  components: {
    DetailsPageFooter,
    MakeAppointTimeDatePicker,
    MakeAppoint3,
    MakeAppoint4,
    MakeAppoint5,
    MakeAppoint6,
  }
};
</script>

<style lang="scss">
.make-appoint {
  // border: 1px dotted black;
  border-radius: 3px;
}
</style>
