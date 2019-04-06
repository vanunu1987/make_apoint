

<template>
  <section class="details-page-footer">
    <div class="btn-container">
      <button
        class="set-appoint-btn"
        @click="moveToCmp('MakeAppointTimeDatePicker')"
      >Make an appointment</button>
    </div>
    <section class="card-details-container">
        <h3 class="preview-type">{{currBusiness.type}}</h3>
        <h3 class="preview-name">{{currBusiness.name}}</h3>
        <h3 class="preview-price">{{currBusiness.products[0].price | dollar}} per person</h3>
        <!-- <span class="address">{{adress}}</span> -->
      </section>
      
        <!-- <v-rating
          :value="currBusiness.rank.avg"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating> -->
      <div class="rank">
      <span class="avg">{{ currBusiness.rank.avg }}</span> 
      <span class="star"><i class="fas fa-star"></i></span> 
      <span class="qty">({{ currBusiness.rank.qty }})</span>
      </div>
       
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    moveToCmp(cmpName) {
      this.$emit("set-cmp", cmpName);
    },
    updateAppoint(payload) {
      console.log(
        "update appoint recevied in DetailsPageFooter cmp with this payload",
        payload
      );
      this.$emit("update-appoint", payload);
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/styles.scss";
.details-page-footer {
  background-color:white;
  position: fixed;
  bottom: 0%;
  display: flex;
  justify-content: space-between;

  .set-appoint-btn {
    padding: 15px;
    width: 200px;
    border-radius: 3px;
    background-color: $primary-color;
    opacity: 0.9;
    font-weight: bold;
    color: white;
  }
}
</style>
