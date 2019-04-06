

<template>
  <section class="details-page-footer">
    <div class="btn-container">
      <h3 class="preview-price">{{currBusiness.products[0].price | dollar}} per person</h3>
      <button class="set-appoint-btn" @click="moveToCmp('MakeAppointTimeDatePicker')">See Dates</button>
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
    ></v-rating>-->
    <div class="rank">
      <span class="avg">{{ currBusiness.rank.avg }}</span>
      <span class="star">
        <i class="fas fa-star"></i>
      </span>
      <span class="qty">({{ currBusiness.rank.qty }})</span>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    currBusiness() {
      return this.$store.getters.currBusiness;
    }
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
  },
  mounted() {
    this.currBusiness = this.$store.getters.currBusiness;
  }
};
</script>

<style lang="scss">
@import '@/scss/variables.scss';

.details-page-footer {
  width: 100%;
  z-index: 5;
  background-color: white;
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
