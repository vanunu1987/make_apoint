

<template>
  <section class="details-page-footer">
    <div class="btn-container">
      <button
        class="set-appoint-btn"
        @click="moveToCmp('MakeAppointTimeDatePicker')"
      >Make an appointment</button>
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
  flex-direction: column;
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
