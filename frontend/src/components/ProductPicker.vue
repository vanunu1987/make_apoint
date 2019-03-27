<template>
<section class="product-picker">

    
    <h1>Top Services</h1>
    <!-- <select>
      <option v-for="product in products" :key="product.title">
          {{product.title}}
          {{product.price | dollar}}
      </option>
      </select> -->

    <div @click="alert('hello')" class="block">
      <el-carousel  :interval="2500" trigger="click" height="150px">
      <el-carousel-item v-for="product in products" :key="product._id">
        <product-preview @click="updateAppoint({property:'product',value:product})" :product="product"/>
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
  },
  methods:{
    updateAppoint(payload){
      console.log('sjdfhlkj')
      this.$emit("update-appoint", payload);
    }
  }
};
</script>

<style lang="scss">
.product-picker{

.product{
  background-color:turquoise;
  border:1px solid grey;
}

}
</style>
