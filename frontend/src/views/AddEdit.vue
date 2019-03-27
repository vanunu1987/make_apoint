<template>
  <section class="page-continer" v-if="!!currBusiness.prefs">
    <business-type-modal  @saveType="setType" v-if="isTypeModal"/>
    <calendar-date-picker class="calendar" style="width:500px;"></calendar-date-picker>

        <div  class="img-header flex"  :style="{backgroundImage: `url(${currBusiness.prefs.header_img_url})` }">
              <div class="column">
              <button @click="setFilterBy('header')" title="Add image" class="far fa-images"></button>
             <h3>Add your header image here</h3> 
             </div>

        </div>
        <div class="profile-detais culomn">
          <div class="details-head flex">
         <input v-model="currBusiness.name" placeholder="Insert your business name here"  type="text" />
        <div  class="img-profile flex"  :style="{backgroundImage: `url(${currBusiness.prefs.profile_img_url})` }">
              <button @click="setFilterBy('profile')" title="Add profile image" class="fas fa-user-plus"></button>
          </div>

          </div>
          <h5>Profile image</h5>
         
      
          <span class="flex">
         <span class="fas fa-map-pin"></span> 
         <h2 class="address-h2">Address</h2> 
         </span>
         <input v-model="currBusiness.address" placeholder="Insert your address here"  type="text" />
          <span class="flex">
         <span class="fas fa-phone"></span> 
         <h2>Phone number</h2> 
         </span>
         <input v-model="currBusiness.phone" placeholder="Insert your phone number here"  type="text" />
          <span class="flex">
         <span class="fas fa-address-card"></span>
         <h2>About Us</h2> 
        </span>
         <input v-model="currBusiness.prefs.description" placeholder="Insert short description here" type="text" />
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
  style=" height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
  />
</GmapMap>

</div>
 <div class="setings">
    <button title="Setting" class="fas fa-cog Setting"></button>
    <button v-show="isGalleryHeaderImg" title="addImg" class="fas fa-plus addImg"></button>
      

      <div v-if="isGalleryHeaderImg" class="headerGallery">
          <ul>
            <li
            v-for="(img,idx) in filteredItems()"
            :key="idx"
            >
                <div class="galleryItem"
                :style="{backgroundImage: `url(${img.url})` }"
                @click="setHeaderImg(img,img.filter)"
                >
                </div>
            </li>
          </ul>
      </div>
      </div>
  </section>
</template>

<script>
// import BusinessCalendar from '../components/BusinessCalendar.vue'
import mapCmp from '../components/MapCmp.vue'
import vueDraggable from '../components/VueDraggable.vue'
import CalendarDatePicker from '@/components/CalendarDatePicker.vue'
import BusinessTypeModal from '@/components/BusinessTypeModal.vue'
import BusinessService from '@/services/UtilService.js'
export default {
  components:{
    // BusinessCalendar,
    BusinessService,
    vueDraggable,
    mapCmp,
    CalendarDatePicker,
    BusinessTypeModal,
  },
  created() {
    let { businessId } = this.$route.params;
    if (!businessId) this.isTypeModal=true
    this.$store.dispatch({ type: "loadBusiness", businessId })
    .then((res)=>{
      this.currBusiness=this.$store.getters.currBusiness
      console.log(this.currBusiness);
      
    })
  },
  data() {
    return {
      filterBy:"",
      isGalleryHeaderImg:false,
      // imgUrls:[],
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
      editMode:false,
      currBusiness:{},
      isTypeModal:false
       
    }
  },
 
    methods:{
        changeImgIdx(val){
            if (this.imgIdx+val<0||this.imgIdx+val>this.imgPath.length-1)return
            else this.imgIdx+=val
            
        },
        closeCalender(){
          this.showCalender = false
        },
        setHeaderImg(img,filter){
          console.log('img',img);
          
          if (filter==="header"){
          this.currBusiness.prefs.header_img_url=img.url
          this.isGalleryHeaderImg=false
          console.log(this.currBusiness);
          }else{
          this.currBusiness.prefs.profile_img_url=img.url
          this.isGalleryHeaderImg=false
          }
        },
        filteredItems(){
          console.log(this.currBusiness.type);
          console.log(this.imgUrls);
          
         return this.imgUrls[0].imgs.filter((img)=>img.filter===this.filterBy)
        },
        setType(val){
          this.isTypeModal=false
          console.log(this.isTypeModal);
          this.currBusiness.type=val
          this.$store.dispatch({type: 'loadImgs',Businesstype:this.currBusiness.type})

        },
        setFilterBy(val){
          if (!this.isGalleryHeaderImg){
          this.isGalleryHeaderImg=!this.isGalleryHeaderImg
          this.filterBy=val
          }else this.filterBy=val
        }
    },
    computed:{
      imgUrls(){
        return this.$store.getters.imgList
      }
    }
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
.Setting{
  // position: fixed;
  font-size: 2.5rem;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 4px 3px 14px 2px rgba(0,0,0,0.75);
  margin-top: 20px;
  margin-left: 5px;
  z-index: 10;
background-color: white;
}
  .addImg{
    position: absolute;
    font-size: 2.5rem;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 4px 3px 14px 2px rgba(0,0,0,0.75);
  margin-top: 105px;
  margin-left: -55px;
  z-index: 10;
background-color: white;
  
  }
input{
  
  &:focus{
             outline:none;
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
    grid-template-columns: 0.5fr 2fr 1fr 0.8fr;
    grid-template-rows: 1fr 1fr 1fr .5fr;
     grid-gap: 10px 20px;
        // padding: 20px;
    .img-header{
      grid-column: 1/4;
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
       grid-column: 1/4;
      grid-row: 3;
    }
    .setings{
      grid-column: 4;
      grid-row: 1/5;
    }
}

.setings{
  background-color: black;
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
input{
  min-width: 245px;
}
}
.img-profile{
  width: 75px;
    height: 75px;
    background-size: cover;
    border-radius: 50px;
    background-position: center;
  margin-left: 10px;
  border: 1.3px dotted;
  justify-content: center;

}

.img-header {
  width: 100%;
  height: 50vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
   border: 1.3px dotted;
  justify-content: center;
  align-items: center;
  button{
    font-size: 2.5rem;
    padding: 5px;
  }
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
.headerGallery{
  height: 100vh;
  width: 15vw;
  // background-color: #484848d1;
  // position: fixed;
  // top: 10px;
  right: 0px;
  border-radius: 5px;
  margin-top: 100px;
}
.galleryItem{
  margin: 7px;
  height: 100px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
</style>

