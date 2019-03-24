<template>
  <div class="home-filter">
    <!-- <h1>{{ msg }}</h1> -->
    <input type="search" placeholder="Find your service" @keyup.enter="find">
  </div>
</template>

<script>
export default {
  name: "HomeFilter",
  props: {
    msg: String
  },
  data() {
    return {
      filterBy: {
        name: "",
        type: "",
        sortBy: "",
        currUserLocation: { lat: 32.087971200000005, lng: 34.8031581 }
      }
    };
  },
  methods: {
    find(ev) {
      ev.target.blur();
      this.filterBy.name = ev.target.value;
      this.filterBy.type = ev.target.value;
      this.$emit("find", {...this.filterBy});
      ev.target.value = ''
      this.filterBy.name = ev.target.value;
    },
    blur(ev) {
      ev.target.blur();
    }
  }
};
</script>


<style scoped lang="scss">
</style>
