

<template>
  <section class="make-appoint1">
    <product-picker  @update-appoint="updateAppoint"></product-picker>
      <div class="btn-container">
        <button class="set-appoint-btn" @click="moveToCmp('MakeAppointTimeDatePicker')">Make an appointment</button>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
    .btn-container{
      margin-bottom: 100px;
    }
    .set-appoint-btn{
    padding: 15px;
    width: 200px;
    border-radius: 3px;
    background-color:#1dbf73;
    opacity: 0.9;
    font-weight: bold;
    color: white;
    }
}

</style>
