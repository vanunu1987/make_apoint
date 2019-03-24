<template>
  <div class="home">
    <header>
      <!-- <a href="#" v-scroll-to="'#list'">Search</a> -->
      <HomeFilter @find="filterList"/>
    </header>
    <div v-if="isScroll" class="secondary-header"></div>
    <BusinessList id="list" :business="businessToShow"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeFilter from "@/components/HomeFilter.vue";
import BusinessList from "@/components/BusinessList.vue";
import UtilService from '@/services/UtilService.js'

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
    async filterList(filterBy) {
      console.log("scroll");
      await this.$store.dispatch({ type: "loadBusinesses", filterBy });
      this.$scrollTo("#list", 300);
    }
  },
  created() {
    UtilService.getLocation()
    var filterBy = this.$store.getters.filterBy
    var userLocation = UtilService.userLocation;
    console.log('location : ',userLocation);
    if (userLocation) filterBy.currUserLocation = userLocation
    this.$store.dispatch({ type: "loadBusinesses", filterBy });
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

