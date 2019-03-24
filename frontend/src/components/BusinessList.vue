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
  props:['business'],
  components: {
      BusinessPreview
  },
  computed:{
      
  }
}
</script>
