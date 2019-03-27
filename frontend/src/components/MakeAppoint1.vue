

<template>
  <section class="make-appoint1">
    <product-picker  @update-appoint="updateAppoint"></product-picker>
      <div>
        <v-btn @click="moveToCmp('MakeAppoint2')" depressed large color="error">Request to Book</v-btn>
      </div>
  </section>
</template>

<script>
import ProductPicker from "@/components/ProductPicker.vue";

export default {
  data() {
    return {
       
    }
  },
  components: {
    ProductPicker
  },
  methods:{
    moveToCmp(cmpName){
      this.$emit('set-cmp',cmpName)
    },
    updateAppoint(payload) {
      console.log(
        "update appoint recevied in makeappoint1 cmp with this payload",
        payload
      );
      this.$emit("update-appoint", payload);
    }
  }
};
</script>

<style lang="scss">
.make-appoint1{
.v-btn:before{
  background-color:red;
  opacity: 0.9;
}


}

</style>
