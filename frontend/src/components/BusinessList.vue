<template>
  <div class="list">

     <!-- <el-carousel :interval="2500" type="card" height="350px">
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
  props:['business'],
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
  // width: 1090px;
  // min-width: 600px;
  // height: 430px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);

  li {
    // width: 330px;
    // height: 430px;
    float: left;
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    top: 0;
    text-align: center;
    transition: all 0.3s;

    &:nth-child(2) {
      // margin: 0 50px;
    }

    &:hover {
      top: -15px;
      box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
    }

    // h4 {
    //   font-weight: 600;
    // }

    // p {
    //   padding: 0 1rem;
    //   font-size: 16px;
    //   font-weight: 300;
    // }

    // a {
    //   font-weight: 500;
    //   text-decoration: none;
    //   color: $light-blue;
    // }
  }
}
</style>
