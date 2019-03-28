<template>
    <v-card class="mx-auto" color="grey lighten-4">
      <router-link :to="'business/'+currBusiness._id">
        <v-img :src="currBusiness.prefs.header_img_url" class="white--text" height="200px"></v-img>
        <v-card-title primary-title>
          <div>
            <div class="preview-name">{{currBusiness.name}}</div>
            <span class="grey--text">{{adress}}</span>
          </div>
        </v-card-title>
        <section class="rank">
          <v-rating
            :value="currBusiness.rank.avg" color="amber" dense half-increments readonly 
          size="14" ></v-rating>
          <div class="ml-2 grey--text text--darken-2">
            <span>{{ currBusiness.rank.avg }}</span>
            <span>({{ currBusiness.rank.qty }})</span>
          </div>
        </section>
      </router-link>
    </v-card>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "list",
  props: ["currBusiness"],
  components: {
    StarRating
  },
  computed: {
    adress() {
      return (this.currBusiness.dist / 1000).toFixed(1) + " Km from you";
    }
  }
};
</script>

<style scoped>

a {
  text-decoration: none;
  color: black;
}
.rank {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.v-card{
  border-radius: 5px;
  height: 100%;
}
.v-img{
  border-radius: 5px 5px 0 0;
}

</style>
