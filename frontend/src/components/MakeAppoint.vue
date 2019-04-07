<template>
  <section class="make-appoint">
    <component
      :is="currCmp.name"
      :payload="currCmp.payload"
      :appoint="appoint"
      @set-cmp="setCmp"
      @make-appoint="makeAppoint"
      @update-appoint="updateAppoint"
      @add-user="addUser"
      @loggedIn="setCmp('MakeAppointConfirm')"
    ></component>
  </section>
</template>

<script>
import MakeAppointTimeDatePicker from "@/components/Details/MakeAppointTimeDatePicker.vue";
import UserLoginSignup from "@/components/UserLoginSignup.vue";
import MakeAppoint3 from "@/components/MakeAppoint3.vue";
import MakeAppointConfirm from "@/components/MakeAppointConfirm.vue";
import MakeAppoint6 from "@/components/MakeAppoint6.vue";
import { bus } from "@/main.js";

export default {
  data() {
    return {
      currCmp: { name: "MakeAppointTimeDatePicker" },
      cmps: [],
      appoint: {
        date: moment().format("YYYY-MM-DD"),
        startTime: null,
        user_id: null,
        business_id: this.$store.getters.currBusiness._id,
        product: this.$store.getters.currBusiness.products[0]
      }
    };
  },
  methods: {
    setCmp(cmpName, payload) {
      console.log("setCmp activated", cmpName);
      //get the chosen cmp
      var component = this.cmps.find(cmp => cmp.name === cmpName);
      //upload payload on cmp and set the cmp
      component.payload = payload;
      this.currCmp = component;
    },
    updateAppoint(payload) {
      var property = payload.property;
      var value = payload.value;
      console.log("updateAppoint activated", value);
      this.appoint[property] = value;
      console.log("appoint is updated:", this.appoint);
    },
    addUser(user) {
      this.$store
        .dispatch({
          type: "signUpUser",
          credentials: user,
          isNewBusiness: false
        })
        .then(() => {
          console.log("promise return");
          this.setCmp("MakeAppointConfirm");
        });
      console.log(user);
    },
    makeAppoint() {
      this.$store
        .dispatch({ type: "addAppoint", appoint: this.appoint })
        .then(() => console.log("sucsess!!"));
    }
  },
  created() {
    this.cmps.push({ name: "MakeAppointTimeDatePicker" });

    this.cmps.push({ name: "UserLoginSignup" });
    this.cmps.push({ name: "MakeAppoint3" });

    this.cmps.push({ name: "MakeAppointConfirm" });
    this.cmps.push({ name: "MakeAppoint6" });
    if (this.$store.getters.loggedInUser)
      this.appoint.user_id = this.$store.getters.loggedInUser._id;
  },
  mounted() {
    bus.$on("update-appoint", payload => {
      console.log("1recived!", payload);
      this.updateAppoint(payload);
    });
  },
  components: {
    MakeAppointTimeDatePicker,
    UserLoginSignup,
    MakeAppoint3,

    MakeAppointConfirm,
    MakeAppoint6
  }
};
</script>

<style lang="scss">
.make-appoint {
  width: 100%;
}
</style>
