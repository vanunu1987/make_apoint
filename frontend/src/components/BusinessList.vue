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
  
  li {
    float: left;
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    top: 0;
    text-align: center;
    transition: all 0.4s;

    &:hover {
      top: -5px;
      box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
    }
    .BusinessPreview {
      height: 100%;
    }
  }
}
</style>
