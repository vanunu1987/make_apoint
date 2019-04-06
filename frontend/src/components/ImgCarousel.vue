<template>
  <section class="img-carousel">
    <el-carousel :interval="2500" trigger="click">
      <el-carousel-item v-for="product in products" :key="product._id">
        <product-preview :product="product"/>
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
  data() {
    return {
      products: null
    };
  },
  created() {
    this.products = this.$store.getters.currBusiness.products;
  }
};
</script>

<style lang="scss" scoped>
.img-carousel {
  .product {
    background-color: turquoise;
    border: 1px solid grey;
  }
}
.el-carousel, .el-carousel__container {
  height: 100%;
}
</style>
