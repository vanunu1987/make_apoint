<template>
  <section class="page-continer" v-if="currBusiness">
 <router-link :to="'/edit/'+businessId" >edit</router-link>

    <calendar-date-picker class="calendar" style="width:500px;"></calendar-date-picker>

        <div  class="img-header"  
        :style="{backgroundImage: `url(${imgPath.header_img_url})`}">
        </div>
        <div class="profile-detais culomn">
          <div class="details-head flex">
                <h1 class="name" >{{currBusiness.name}}</h1>
              <div  class="img-profile"  :style="{backgroundImage: `url(${imgPath.profile_img_url})` }">
          </div>
          </div>
          <span class="flex">
         <span class="fas fa-map-pin"></span> 
         <h2 class="address-h2">Address</h2> 
         </span>
         <h3>{{currBusiness.address}}</h3>
          <span class="flex">
         <span class="fas fa-phone"></span> 
         <h2>Phone number</h2> 
         </span>
         <h3>{{currBusiness.phone}}</h3>
          <span class="flex">
         <span class="fas fa-address-card"></span>
         <h2>About Us</h2> 
        </span>
        <h3>{{currBusiness.prefs.description}}</h3>
          <span class="flex">
         <span class="fas fa-star-half-alt"></span>
         <h2>Rating</h2> 
        </span>
        <span class="flex">
        <h3>{{currBusiness.rank.avg}}</h3>
        ,
        <h3>{{currBusiness.rank.qty}}</h3>
        </span>
        </div>
        <div class="midle">
        <GmapMap
  class="map"      
  :center="mapCenter"
  :zoom="16"
  map-type-id="terrain"
  style="width: 100vw; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="mapCenter"
    :clickable="true"
    :draggable="true"
  />
</GmapMap>
<button @click="showCalender = !showCalender">Add appoint</button>
 <div class="calendar" v-if="showCalender">
        <make-appoint @closecalender ="closeCalender"></make-appoint>
    </div>
</div>

    </section>

</template>

<script>
import MakeAppoint from '../components/MakeAppoint.vue'
import mapCmp from '../components/MapCmp.vue'
import vueDraggable from '../components/VueDraggable.vue'
import CalendarDatePicker from '@/components/CalendarDatePicker.vue'
import BusinessService from '@/services/UtilService.js'
export default {
  components:{
    MakeAppoint,
    BusinessService,
    vueDraggable,
    mapCmp,
    CalendarDatePicker
  },
  created() {
    let { businessId } = this.$route.params;
    this.businessId=businessId
    this.$store.dispatch({ type: "loadBusiness", businessId })
    .then(()=>{

      this.$store.dispatch({type:'loadAppoints',listRequire:'business'})

      })
  },
  data() {
    return {
      showCalender:false,
      imgIdx: 0,
      markers: [
        {
          label: "a place",
          position: { lat: 32.0877, lng: 34.8032 }
        }
      ],
      editMode:false,
    businessId:null
    }
  },
 
 
  computed: {
    currBusiness() {
      return this.$store.getters.currBusiness;
    },
    address(){
      let loc= this.currBusiness.location
      return `${loc.street} ${loc.number} ${loc.city} ${loc.state}`
    },
    imgPath(){
     return this.currBusiness.prefs
    },
    mapCenter(){
      return this.$store.getters.currBusiness.location;

    }
  },
    methods:{
        changeImgIdx(val){
            if (this.imgIdx+val<0||this.imgIdx+val>this.imgPath.length-1)return
            else this.imgIdx+=val
            
        },
        closeCalender(){
          this.showCalender = false
        }
    },
}
</script>
<style lang="scss" scoped>

// helpers
.flex{
  display: flex;
  flex: none;
}
.culomn{
  display: flex;
  flex-direction: column;
}
span.flex{
      align-items: baseline;
      margin-top: 20px;
      span{
        margin: 3px;
      }
}
h1,h2,h3{
  font-weight: 100;
  letter-spacing: .2px;
  
}
.name{
  font-size: 2.5rem;
  font-weight: 500;
}
.page-continer{
  background-color: white;
 display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 0.5fr;
    grid-template-rows: 1fr 1fr 1fr .5fr;
     grid-gap: 10px 20px;
        // padding: 20px;
    .img-header{
      grid-column: 1/5;
      grid-row: 1;
    }
    .profile-detais{
      grid-column: 2;
      grid-row: 2;      

    }
    .calendar{
       grid-column: 3;
      grid-row: 2; 
      position: relative;
      display: inline;
    }
    .midle{
       grid-column: 1/5;
      grid-row: 3;
    }
}
.profile-detais{
// margin-left: 30px;
word-wrap: break-word !important;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 1.375em !important;
    color: #484848 !important;
}
.details-head{
align-items: center;
}
.img-profile{
  width: 75px;
    height: 75px;
    background-size: cover;
    border-radius: 50px;
    background-position: center;
  margin-left: 10px;

}

.img-header {
  width: 100%;
  height: 50vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
button {
  background-color: #ffdead00;
  border: none;
  font-weight: 800;
  font-size: 1.5rem;
}
h3{
  text-align: left;
}
.address-h2{
margin-left: 6px;
}
button:focus {
  border: none;
  outline: none;
}
.midle{
    // display: flex;
    // justify-content: space-between;

}
.fas{
  color: black;

}
.add-appoint{
  border-radius: 5px;
  padding: 5px;
  border: none;

}
div.calendar{
  // background-color:rgb(255, 233, 137);
  // width:90%;
  //  position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // z-index: 3;
}
</style>

