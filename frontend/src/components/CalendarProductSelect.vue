<template>
  <section>

    <select>
      <option v-for="product in products" :key="product._id" value="product">{{product.title}}</option>
    </select>
    
  </section>
</template>
<script>
export default {
  data() {
    return {
      products: null
    };
  },
  computed: {
    productsList() {
      return this.products.map(product => product.title);
    }
  },
  created() {
    this.products = this.$store.getters.currBusiness.products;
  }
};
</script>
