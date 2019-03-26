<template>
    <v-card class="mx-auto" color="grey lighten-4">
        <v-img :src="this.$store.getters.currBusiness.prefs.preview_img_url" class="white--text" height="200px">
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="preview-name">{{product.title}}</div>
            <span class="grey--text">{{'adress'}}</span>
          </div>
        </v-card-title>
        <section class="rank">
          <v-rating
            :value="5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div class="ml-2 grey--text text--darken-2">
            <span>{{' product.rank.avg '}}</span>
            <span>({{ 'product.rank.qty' }})</span>
          </div>
        </section>
    </v-card>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  props: ["product"],
  components: {
    StarRating
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
}
.v-img{
  border-radius: 5px 5px 0 0;
}
.v-card--reveal {
  /* align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  background-color: #246799; */
}
</style>
