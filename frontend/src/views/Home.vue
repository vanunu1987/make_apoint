<template>
  <div class="home">
    <header>
      <section class="head-bar">
        <div class="frosted-glass-background"></div>
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
import UtilService from "@/services/UtilService.js";

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
    }
  },
  created() {
    this.$store.dispatch("loadUserLocation");
    var filterBy = this.$store.getters.filterBy;
    this.$store.dispatch({ type: "loadBusinesses", filterBy });
  }
};
</script>

<style lang="scss" scoped>
.home {
  header {
    height: 100vh;
    padding-top: 130px;
    background-image: url("../assets/background1.png");
    background-size: cover;
    background-position-y: -100px;
    background-position-x: center;

    .head-bar {
      max-width: 550px;
      width: auto;
      position: relative;
      overflow: hidden;
      border-radius: 10px;

      h1 {
        position: relative;
        font-size: 34px;
        line-height: 1.3;
        padding-bottom: 32px;
        color: #303030;
        text-transform: capitalize !important;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        text-align: -webkit-auto;
      }
    }
  }
}

#list {
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

.logo {
  position: absolute;
  height: 100px;
  width: 100px;
  left: 5px;
  top: 0;
  z-index: 10001;
}

.frosted-glass-background {
  background-color: #ffffffd4;
  filter: blur(4px);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

@media (max-width: 740px) {
  .head-bar {
    padding: 20px;
  }
}

@media (min-width: 740px) {
  .head-bar {
    padding: 20px;
    padding-left: 30px;
  }
}
</style>

