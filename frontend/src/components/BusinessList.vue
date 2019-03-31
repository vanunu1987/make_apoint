<template>
  <div class="list">

     <!-- <el-carousel v-if="!isSearch" :interval="2500" type="card" height="350px">
        <el-carousel-item v-for="currBusiness in business" :key="currBusiness._id">
          <BusinessPreview :currBusiness="currBusiness"/>
        </el-carousel-item>
      </el-carousel> -->
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
$light-blue: #3498db;
$black: #000000;

ul {
  padding: 0;
  margin: 0;
  max-width: 1050px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 20px;
  padding: 20px;
  
  li {
    // float: left;
    border-radius: 3px;
    // box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    // top: 0;
    text-align: left;
    transition: all 0.4s;

    &:hover {
    }
    .BusinessPreview {
      height: 100%;
    }
  }
}


</style>
