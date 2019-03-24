<template>
    <section v-if="!!currBusiness.prefs">
        <div  class="details-header"  :style="{backgroundImage: `url(${imgPath[imgIdx]})` }">
            <button class="fas fa-chevron-left" @click="changeImgIdx(-1)" v-if="imgPath.length>1"></button>
            <h1>{{currBusiness.name}}</h1>
            <button class="fas fa-chevron-right" @click="changeImgIdx(1)" v-if="imgPath.length>1"></button>
        </div>
        <p>{{currBusiness.prefs.description}}</p>
        <p>{{address}}</p>
        <div class="midle">
        <GmapMap
  :center="mapCenter"
  :zoom="16"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
  />
</GmapMap>
<button @click="showCalender = !showCalender">Add appoint</button>
 <div class="calendar" v-if="showCalender">
        <business-calendar @closecalender ="closeCalender"></business-calendar>
    </div>
</div>
<vue-draggable/>

        {{imgPath}}
        <!-- {{currBusiness}} -->
    </section>
</template>

<script>
import BusinessCalendar from '../components/BusinessCalendar.vue'
import mapCmp from '../components/MapCmp.vue'
import vueDraggable from '../components/VueDraggable.vue'
import BusinessService from '@/services/UtilService.js'
export default {
  components:{
    BusinessCalendar,
    BusinessService,
    vueDraggable,
    mapCmp
  },
  created() {
    let { businessId } = this.$route.params;

    this.$store.dispatch({ type: "loadBusiness", businessId })
    .then(()=>{
      this.imgPath=this.currBusiness.cmps[0].data.img_urls
      console.log(this.imgPath);
      
      let addressloc= BusinessService.getLocationByAddress(this.address)
      return addressloc
      .then(res=>{
        console.log('loc',res);
        
        this.mapCenter=res
        this.markers[0].position=res

      })
    })
  },
  data() {
    return {
      showCalender:false,
      imgIdx: 0,
      m: {
        position: { lat: 34.38, lng: 34.8 }
      },
      mapCenter: { lat: 32.087971200000005, lng: 34.8031581 },
      markers: [
        {
          label: "a place",
          position: { lat: 32.0877, lng: 34.8032 }
        }
      ],
      imgPath:'',
   
    }
  },
 
  computed: {
    currBusiness() {
      return this.$store.getters.currBusiness;
    },
    address(){
      let loc= this.currBusiness.location
      return `${loc.street} ${loc.number} ${loc.city} ${loc.state}`
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
<style scoped>
.details-header {
  width: 100%;
  height: 50vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: #ffdead00;
  border: none;
  font-weight: 800;
  font-size: 1.5rem;
}
button:focus {
  border: none;
  outline: none;
}
.midle{
    display: flex;
    justify-content: space-between;

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
  width:90%;
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
</style>

