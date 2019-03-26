<template>
<section class="product-picker">

    <h1>Top Services</h1>
    {{products}}
    <div class="block">
    <span class="demonstration">Switch when indicator is clicked</span>
    <el-carousel :interval="2500" trigger="click" height="150px">
      <el-carousel-item v-for="product in products" :key="product._id">
        <product-preview :product="product"/>
      </el-carousel-item>
    </el-carousel>
  </div>


</section>
</template>

<script>
import ProductPreview from '@/components/ProductPreview.vue'
export default {
  components:{
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

<style lang="scss">
.product-picker{


}
</style>
