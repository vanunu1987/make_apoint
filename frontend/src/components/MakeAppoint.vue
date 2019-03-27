

<template>
  <section class="make-appoint">
    <component 
    :is="currCmp.name" 
    :payload="currCmp.payload"
    @set-cmp="setCmp" 
    @update-appoint="updateAppoint">
    </component>
  </section>
</template>

<script>
import MakeAppoint1 from "@/components/MakeAppoint1.vue";
import MakeAppoint2 from "@/components/MakeAppoint2.vue";

export default {
  data() {
    return {
        currCmp:{ name: "MakeAppoint1" },
        cmps:[],
        appoint:{
          date:null,
          time:null,
          user_id:null,
          business_id:null,
          product:null
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
    }
  },
  created() {
    this.cmps.push({ name: "MakeAppoint1" });
    this.cmps.push({ name: "MakeAppoint2" });
  },
  components: {
    MakeAppoint1,
    MakeAppoint2
  }
};
</script>

<style lang="scss">
.make-appoint {
  border: 1px dotted black;
  border-radius: 3px;
}
</style>
