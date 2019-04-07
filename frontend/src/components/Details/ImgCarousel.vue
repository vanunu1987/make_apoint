<template>
  <section class="img-carousel">
    <el-carousel :interval="2500" trigger="click">
      <el-carousel-item v-for="(img,idx) in imgs" :key="idx">
        <product-preview :img="img"/>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
import ProductPreview from "@/components/ProductPreview.vue";
export default {
  components: {
    ProductPreview
  },
  computed:{
    imgs(){
      return this.$store.getters.currBusiness.prefs.preview_imgs
    }
  }
};
</script>

<style lang="scss">
.img-carousel {
  .product {
    background-color: turquoise;
    border: 1px solid grey;
  }
  .el-carousel,
  .el-carousel__container,
  .v-image {
    height: 100% !important;
  }
}
</style>
