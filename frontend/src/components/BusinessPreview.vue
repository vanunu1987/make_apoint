<template>
  <div class="card-container">
    <router-link :to="'business/'+currBusiness._id">
      <v-img class="image" :src="currBusiness.prefs.header_img_url" height="330px"></v-img>
      <section class="card-details-container">
        <h3 class="preview-type">{{currBusiness.type}}</h3>
        <h3 class="preview-name">{{currBusiness.name}}</h3>
        <h3 class="address">{{adress}}</h3>
        <!-- <span class="address">{{adress}}</span> -->
      </section>
      <div class="rank">
      <span class="avg">{{ currBusiness.rank.avg }}</span> 
      <span class="star"><i class="fas fa-star"></i></span> 
      <span class="qty">({{ currBusiness.rank.qty }})</span>
      </div>
       
     
    </router-link>
  </div>
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

<style lang="scss" scoped>
@import "@/scss/variables.scss";
@import "@/scss/fonts.scss";


a {
  text-decoration: none;
}

div.rank{
margin-top:5px;
}
span{
  margin-right:2px;
  text-align: center;
  color:$star-blue;
  font-size:12px;
  &.star{
    font-size:9px;
  }
  &.qty{
    color:$text-grey;
  }
}

.card-container {
  border-radius: 3px;
  height: 100%;
  background-color: #fff;
  width: 240px;
  padding: 0;
  float: left;
  position: relative;
  box-sizing: border-box;
}

// .address,
// .rank {
//   line-height: 15px;
//   padding: 0 12px 10px;
//   display: block;
//   min-height: 16px;
//   display: flex;
//   padding: 0 11.5px 10px;
//   // padding-bottom: 10px;
// }

.v-img {
  border-radius: 5px !important;
}
.image{
  border-radius: 4px ;
}

h3{
  margin: 0 0px 0px;
  margin-top:5px;
  font-size: 18px;
  display: block;
  -ms-word-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-word;
  word-break: break-word;
  -webkit-transition: 0.15s ease-in-out;
  transition: 0.15s ease-in-out;
  &.preview-type {
  font-size: 12px;
  font-family: AirbnbCereal-bold;
  color:$text-grey;
  text-transform: uppercase;
  }
  &.preview-name {
  font-size: 16px;
  color:$text-black;
  font-family: AirbnbCereal-bold;
  text-transform: capitalize;
  }
  &.address {
  font-size: 14px;
  color:$text-black;
  font-family: AirbnbCereal-light;
  }
}

@media (max-width: 740px) {
  .card-container {
    width: 90vw;
  }
}
</style>
