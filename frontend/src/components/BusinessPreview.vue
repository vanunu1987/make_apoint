<template>
  <div class="Preview"> 
      <router-link :to="'business/'+currBusiness._id">
      <div class="preview-img-container" 
      :style="{ backgroundImage: 'url(' + currBusiness.prefs.preview_img_url + ')' }">
      </div>
      </router-link>
      <section class="preview-details-container">
        <h3>{{currBusiness.name}}</h3>
        <p>{{adress}}</p>
        <section class="rank">
        <!-- <star-rating v-model="currBusiness.rank.avg" :star-size="20"></star-rating> -->
        <el-rate
          v-model="currBusiness.rank.avg"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points">
        </el-rate>
        <!-- <span>({{currBusiness.rank.qty}})</span> -->
        </section>
      </section>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'list',
  props:['currBusiness'],
  components: {
      StarRating
  },
  computed:{
      adress(){
          var location = this.currBusiness.location
          return location.street + ' Street ' + location.number + ', ' + location.city + ' ' + location.state
      }
  }
}
</script>

<style>
.rank{
  display: flex;
  align-items: baseline;

}
</style>
