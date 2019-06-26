<template>
  <div class="list">
      <ul class="business-list">
          <li v-for="currBusiness in business" :key="currBusiness._id">
              <BusinessPreview :currBusiness="currBusiness"/>
          </li>
      </ul>

    

  </div>
</template>

<script>

import BusinessPreview from "@/components/BusinessPreview.vue";

export default {
  name: 'list',
  props:['business','isSearch'],
  components: {
      BusinessPreview
  },
  computed:{
      
  }
}
</script>


<style lang="scss" scoped>

ul {
  padding: 0;
  margin: 0;
  max-width: 1050px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 20px;
  padding: 20px;
  
  li {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    text-align: left;
    transition: all 0.4s;

    .BusinessPreview {
      height: 100%;
    }
  }
}


</style>
