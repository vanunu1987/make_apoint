<template>
  <div class="about">
    <h1>About Us</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum incidunt est, officiis accusamus voluptates expedita nam fuga error, inventore harum dolores alias autem exercitationem fugiat! Ea rerum tenetur pariatur obcaecati?
    </p>

    <make-appoint style="width:500px;"></make-appoint>
    <product-form/>
  </div>
</template>

<script>
import MakeAppoint from '@/components/MakeAppoint.vue'
import ProductForm from '@/components/ProductForm.vue'
export default {
  components:{
MakeAppoint,
ProductForm
  }
}
</script>
