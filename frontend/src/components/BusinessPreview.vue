<template>
    <div class="card-container">
      <router-link :to="'business/'+currBusiness._id">
        <v-img :src="currBusiness.prefs.header_img_url" height="200px"></v-img>
        <section class="card-details-container">
            <h3 class="preview-name">{{currBusiness.name}}</h3>
            <span class="address">{{adress}}</span>
        </section>
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
    </div>
</template>

    // <v-card class="mx-auto" color="grey lighten-4">
    //   <router-link :to="'business/'+currBusiness._id">
    //     <v-img :src="currBusiness.prefs.header_img_url" class="white--text" height="200px"></v-img>
    //     <v-card-title primary-title>
    //       <div>
    //         <div class="preview-name">{{currBusiness.name}}</div>
    //         <span class="grey--text">{{adress}}</span>
    //       </div>
    //     </v-card-title>
    //     <section class="rank">
    //       <v-rating
    //         :value="currBusiness.rank.avg" color="amber" dense half-increments readonly 
    //       size="14" ></v-rating>
    //       <div class="ml-2 grey--text text--darken-2">
    //         <span>{{ currBusiness.rank.avg }}</span>
    //         <span>({{ currBusiness.rank.qty }})</span>
    //       </div>
    //     </section>
    //   </router-link>
    // </v-card>


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

<style <style lang="scss" scoped>

.card-container{
  border-radius: 3px;
  height: 100%;
  background-color: #fff;
  width: 240px;
  padding: 0;
  float: left;
  position: relative;
  border: 1px #e5e5e5 solid;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: black;
}
.address,.rank{
    line-height: 15px;
    color: #b2b2b2;
    padding: 0 12px 10px;
    display: block;
    min-height: 16px;
}
.rank {
  display: flex;
  padding: 0 11.5px 10px;
  // padding-bottom: 10px;
}

.v-img{
  // border-radius: 5px 5px 0 0;
}

h3{
  margin: 0 12px 10px;
    font-size: 18px;
    line-height: 20px;
    font-weight: 400;
    color: #303030;
    height: 45px;
    display: block;
    // overflow: hidden;
    padding-top: 10px;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-word;
    word-break: break-word;
    -webkit-transition: .15s ease-in-out;
    transition: .15s ease-in-out;
}

@media (max-width: 740px){
  .card-container{
  
  width: 90vw;
}
}

</style>
