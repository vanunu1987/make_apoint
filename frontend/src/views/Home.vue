<template>
  <div class="home">
    <header>
      <section class="head-bar">
      <h1>Find nearby service and schedule an appointment quick.</h1>
      <HomeFilter @find="filterList"/>
      </section>
    </header>
    <div v-if="isScroll" class="secondary-header"></div>
    <BusinessList id="list" :business="businessToShow" :isSearch="isSearch"/>
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
      isScroll: false,
      isSearch: false
    };
  },
  computed: {
    businessToShow() {
      return this.$store.getters.businessList;
    }
  },
  methods: {
    async filterList(filterBy) {
      await this.$store.dispatch({ type: "loadBusinesses", filterBy });
      this.$scrollTo("#list", 500);
      this.isSearch = true;
    },
  },
  created() {
    this.$store.dispatch('loadUserLocation')
    var filterBy = this.$store.getters.filterBy
    this.$store.dispatch({ type: "loadBusinesses", filterBy });
  },
};
</script>

<style lang="scss" scoped>

#list{
  width: 100%;
  display: flex;
  justify-content: center;
}

.secondary-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: black;
  z-index: 1;
}

.logo{
  position: absolute;
  height: 100px;
  width: 100px;
  left: 5px;
  top: 0;
  z-index: 10001;
}


</style>

