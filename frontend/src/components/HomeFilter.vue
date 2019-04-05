<template>
  <div class="home-filter">
    <!-- <h1>{{ msg }}</h1> -->
    <input type="search" placeholder="Search by business name or type" @keyup.enter="find">
    <button class="search-btn">Search</button>
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
        // currUserLocation: { lat: 32.087971200000005, lng: 34.8031581 }
      }
    };
  },
  computed:{
    currUserLocation(){
      return this.$store.getters.currUserLocation
    }  
  },
  methods: {
    find(ev) {
      ev.target.blur();
      this.filterBy.name = ev.target.value;
      this.filterBy.type = ev.target.value;
      this.filterBy.currUserLocation = this.currUserLocation
      var filterBy = JSON.parse(JSON.stringify(this.filterBy))
      this.$emit("find", filterBy);
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
@import '@/scss/variables.scss';

.home-filter{
    display: flex;
    position: relative;
    height: auto;
    vertical-align: baseline;
}
.search-btn{
    height: 48px;
    border-radius: 0 3px 3px 0;
    padding: 12px 24px;
    font-size: 14px;
    flex-shrink: 0;
    background-color: $primary-color;
    color: #fff;
    border: 1px solid transparent;
    margin: 0;
    display: inline-block;
    box-sizing: border-box;
    -webkit-transition: color .2s,background-color .2s,box-shadow .2s,border .2s;
    transition: color .2s,background-color .2s,box-shadow .2s,border .2s;

    &:hover{
    background-color: $primary-color-light;
    }
}
</style>
