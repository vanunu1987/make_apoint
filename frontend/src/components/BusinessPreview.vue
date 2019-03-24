<template>
<v-hover>
  <v-card slot-scope="{ hover }"
      
      class="mx-auto"
      color="grey lighten-4"> 
      
      <router-link :to="'business/'+currBusiness._id">
      <!-- <div class="preview-img-container" 
      :style="{ backgroundImage: 'url(' + currBusiness.prefs.preview_img_url + ')' }">
      </div> -->
      <v-img :src="currBusiness.prefs.preview_img_url" class="white--text"
          height="200px">
          <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out  darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            Appoint Now !
          </div>
        </v-expand-transition></v-img>
      <!-- <section class="preview-details-container"> -->
        <v-card-title>
          <!-- <div> -->
            <span>{{currBusiness.name}}</span><br>
            <span class="grey--text">{{adress}}</span>
            <!-- <el-rate
          v-model="currBusiness.rank.avg"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} points">
        </el-rate> -->
          <!-- </div> -->
        </v-card-title>
        <!-- <h3>{{currBusiness.name}}</h3>
        <p>{{adress}}</p> -->
        <section class="rank">
        <v-rating
              :value="currBusiness.rank.avg"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ currBusiness.rank.avg }}</span>
              <span>({{ currBusiness.rank.qty }})</span>
            </div>
        </section>
        

    


      </router-link>
  </v-card>
  </v-hover>
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
  },
}
</script>

<style>
a{
  text-decoration: none;
  color: black;
}
.rank{
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  background-color: #246799
}
</style>
