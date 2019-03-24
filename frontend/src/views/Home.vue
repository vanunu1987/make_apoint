<template>
  <div class="home">
    <header>
      <!-- <a href="#" v-scroll-to="'#list'">Search</a> -->
      <HomeFilter @find="scrollToList"/>
    </header>
    <div v-if="isScroll" class="secondary-header"></div>
    <BusinessList id="list" :business="businessToShow"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeFilter from "@/components/HomeFilter.vue";
import BusinessList from "@/components/BusinessList.vue";

export default {
  name: "home",
  components: {
    HomeFilter,
    BusinessList
  },
  data() {
    return {
      isScroll: false
    };
  },
  computed: {
    businessToShow() {
      return this.$store.getters.businessList;
    }
  },
  methods: {
    scrollToList() {
      console.log("scroll");
      this.$scrollTo("#list", 1000);
    }
  },
  created() {
    this.$store.dispatch("loadBusinesses");
  }
};
</script>

<style>
.secondary-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: black;
  z-index: 1;
}
</style>

