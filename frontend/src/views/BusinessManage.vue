<template>
    <h1>IM HERE</h1>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "BusinessManage",
  components: {
    StarRating
  },
  computed: {
    
  },
  created(){
      this.$store.dispatch('loadBusinessData')
  },
};
</script>

<style lang="scss" scoped>

</style>

