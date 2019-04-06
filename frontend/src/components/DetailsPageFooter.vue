

<template>
  <section class="details-page-footer">
    <div class="details">
      <h3 class="preview-type">{{currBusiness.type}}</h3>
      <h3 class="preview-name">{{currBusiness.name}}</h3>
      <!-- <span class="address">{{adress}}</span> -->
      <div class="rank">
        <span class="avg">{{ currBusiness.rank.avg }}</span>
        <span class="star">
          <i class="fas fa-star"></i>
        </span>
        <span class="qty">({{ currBusiness.rank.qty }})</span>
      </div>
      <!-- <v-rating
          :value="currBusiness.rank.avg"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
      ></v-rating>-->
    </div>

    <div class="btn-container">
      <h3 class="preview-price">{{currBusiness.products[0].price|dollar}} per person</h3>
      <button @click="moveToCmp('MakeAppointTimeDatePicker')">See Dates</button>
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
@import "@/scss/styles.scss";
.details-page-footer {
  left:0;
  box-shadow: 0 3px 9px 3px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #ebebeb;
  padding: 10px 48px;
  width: 100%;
  z-index: 5;
  background-color: white;
  position: fixed;
  bottom: 0%;
  display: flex;
  justify-content: space-between;
  div.details {
    font-size: 12px;
    .preview-name {
      font-size: 22px;
    }
    .rank {
      color: $star-blue;
    }
  }

  .btn-container {
    display: flex;
    align-items: center;

    .preview-price {
      font-family: AirbnbCereal-light;
      margin-right: 15px;
      font-size: 16px;
    }
    button {
      padding: 15px;
      width: 200px;
      border-radius: 3px;
      background-color: $primary-color;
      opacity: 0.9;
      color: white;
    }
  }
}
</style>
