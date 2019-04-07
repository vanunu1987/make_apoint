<template>
  <section class="page-container" v-if="!!currBusiness.prefs">
    <business-type-modal class="businessType" @saveType="setType" v-if="isTypeModal"/>
    <business-path-modal @setPath="setPathModal" class="businessType" v-if="isPathModal"/>
    <work-hours class="workHourCmp" v-if="isCalendar" @setWorkTime="setWorkTime"/>
    <user-login-signUp
      :isNewUserProp="true"
      :isNewBus="true"
      class="login"
      v-if="isSignUp"
      @closeSignUp="closeSignUp"
    />
    <div class="calendarContiner"
    >
    <img src="@/assets/calendar.jpg" >
    <button class="calendarBtn">Add product</button>
    <button>Add working hours</button>
    <calendar-date-picker class="calendar" style="width:500px;"></calendar-date-picker>
    </div>
    <div
      class="img-header flex"
      :style="{backgroundImage: `url(${currBusiness.prefs.header_img_url})` }"
    >
      <img v-if="!currBusiness.prefs.header_img_url" src="@/assets/headerimg.jpg" alt style="width:200px">
      <div class="headerImgContiner column" ref="header">
        <h1 v-if="!currBusiness.prefs.header_img_url">Mypage</h1>
        <h3 v-if="!currBusiness.prefs.header_img_url">Add your image</h3>
        <button
          v-if="!currBusiness.prefs.header_img_url"
          @click="setFilterBy('header')"
          title="Add image"
          class="addBlanc"
        >Add</button>
        <button
          v-if="currBusiness.prefs.header_img_url"
          @click="setFilterBy('header')"
          title="Add image"
          class="editHeader far fa-edit"
        ></button>
      </div>
    </div>

    <div class="profile-detais culomn">
      <div class="profileCardcontiner flex">
        <div class="sideBar column">
          <h1>Myprofile</h1>
          <h3>Fill up your details</h3>
        <img src="@/assets/profilecard.jpg" alt style="width:200px ;height:200px">
        </div>
        <div class="detailscontiner column">
          <div class="details-head flex">
            <div
              class="img-profile flex"
              :style="{backgroundImage: `url(${currBusiness.prefs.profile_img_url})` }"
            >
              <button
                v-if="!currBusiness.prefs.profile_img_url"
                @click="setFilterBy('profile')"
                title="Add profile image"
                class="fas fa-user-plus"
              ></button>
              <button
                v-if="currBusiness.prefs.profile_img_url"
                @click="setFilterBy('profile')"
                title="Add profile image"
                class="editProfile fas fa-edit"
              ></button>
            </div>
            <input
              v-model="currBusiness.name"
              placeholder="Business name"
              type="text"
              class="bizInput"
            >
          </div>
          <!-- <h5 class="profilTag">Profile image</h5> -->
          <span class="flex">
            <span class="fas fa-map-pin"></span>
            <h2 class="address-h2">Address</h2>
          </span>
          <input v-model="currBusiness.address" placeholder="Insert your address here" type="text">
          <span class="flex">
            <span class="fas fa-phone"></span>
            <h2>Phone number</h2>
          </span>
          <input
            v-model="currBusiness.phone"
            placeholder="Insert your phone number here"
            type="text"
          >
          <span class="flex">
            <span class="fas fa-address-card"></span>
            <h2>About Us</h2>
          </span>
          <input
            v-model="currBusiness.prefs.description"
            placeholder="Insert short description here"
            type="text"
          >
          <span class="flex">
            <span class="fas fa-star-half-alt"></span>
            <h2>Rating</h2>
          </span>
          <span class="flex">
            <h3>{{currBusiness.rank.avg}}</h3>,
            <h3>{{currBusiness.rank.qty}}</h3>
          </span>
        </div>
      </div>
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
          :disableAutoPan="true"
        />
      </GmapMap>
    </div>
    <div class="setings">
      <div class="bar culomn">
        <button
          @click="isGalleryHeaderImg=!isGalleryHeaderImg"
          title="Setting"
          class="fas fa-cog "
        > Settings</button>
        <button
          @click="isProductModal=true"
          v-show="!isGalleryHeaderImg"
          title="addImg"
          class="fas fa-plus"
        > Add product</button>
        <!-- <product-form v-show="!isGalleryHeaderImg"/> -->
        <button
          v-show="!isGalleryHeaderImg"
          @click="isCalendar=!isCalendar"
          class="fas fa-plus"
        > Add working hours</button>
        <button v-show="!isGalleryHeaderImg" class="doneBtn" @click="saveCog">Done</button>
      </div>

      <input
        hidden
        ref="file"
        name="file"
        :disabled="loadingImg"
        class="inputfile"
        type="file"
        accept="image/*"
        required
        @change="saveImage"
      >
      <button
        @click="$refs.file.click()"
        v-show="isGalleryHeaderImg"
        title="addImg"
        class="fas fa-image addImg"
      >Add image</button>

      <div v-if="isGalleryHeaderImg" class="headerGallery">
        <ul>
          <li v-for="(img,idx) in filteredItems()" :key="idx">
            <div
              class="galleryItem"
              :style="{backgroundImage: `url(${img.url})` }"
              @click="setHeaderImg(img,img.filter)"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
const cloudinary = require("cloudinary/lib/cloudinary");

import Axios from "axios";
var axios = Axios.create({
  withCredentials: true
});

import mapCmp from "../components/MapCmp.vue";
import vueDraggable from "../components/VueDraggable.vue";
import CalendarDatePicker from "@/components/Details/CalendarDatePicker.vue";
import BusinessTypeModal from "@/components/BusinessTypeModal.vue";
import BusinessPathModal from "@/components/BusinessPathModal.vue";
import BusinessService from "@/services/BusinessService.js";
import cloudinaryService from "@/services/cloudinary-service.js";
import UtilService from "@/services/UtilService.js";
import ProductForm from "@/components/ProductForm.vue";
import WorkHours from "@/components/WorkHours.vue";
import userLoginSignUp from "@/components/UserLoginSignup.vue";

export default {
  components: {
    BusinessService,
    vueDraggable,
    mapCmp,
    CalendarDatePicker,
    BusinessTypeModal,
    ProductForm,
    WorkHours,
    userLoginSignUp,
    cloudinaryService,
    BusinessPathModal
  },
  created() {
    let { businessId } = this.$route.params;
    console.log(businessId);
    this.$store.dispatch({ type: "loadBusiness", businessId }).then(res => {
      this.currBusiness = this.$store.getters.currBusiness;
      console.log(this.currBusiness);
      if (!businessId) this.isTypeModal = true;
      // else  this.$store.dispatch({type: 'loadImgs',Businesstype:this.currBusiness.type})
      else {
        this.$store.dispatch({
          type: "loadImgs",
          Businesstype: this.currBusiness.type
        });
      }
    });
  },
  data() {
    return {
      isSignUp: false,
      isCalendar: false,
      isProductModal: false,
      imageFile: "",
      filterBy: "",
      isGalleryHeaderImg: false,
      showCalender: false,
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
      imgPath: "",
      editMode: false,
      currBusiness: {},
      isTypeModal: false,
      cloudinary: {
        cloud_name: "dmr7h2h2h",
        api_key: "684627237884771",
        uploadPreset: "kpalsqih"
      },
      loadingImg: false,
      imageData: "",
      isPathModal: false
    };
  },

  methods: {
    changeImgIdx(val) {
      if (this.imgIdx + val < 0 || this.imgIdx + val > this.imgPath.length - 1)
        return;
      else this.imgIdx += val;
    },
    closeCalender() {
      this.showCalender = false;
    },
    setHeaderImg(img, filter) {
      console.log("img", img);

      if (filter === "header") {
        this.currBusiness.prefs.header_img_url = img.url;
        this.isGalleryHeaderImg = false;
        console.log(this.currBusiness);
      } else {
        this.currBusiness.prefs.profile_img_url = img.url;
        this.isGalleryHeaderImg = false;
      }
    },
    filteredItems() {
      return this.imgUrls[0].imgs.filter(img => img.filter === this.filterBy);
    },
    setType(val) {
      this.isTypeModal = false;
      console.log(this.isTypeModal);
      this.currBusiness.type = val;
      this.$store.dispatch({
        type: "loadImgs",
        Businesstype: this.currBusiness.type
      });
    },
    setFilterBy(val) {
      if (!this.isGalleryHeaderImg) {
        this.isGalleryHeaderImg = !this.isGalleryHeaderImg;
        this.filterBy = val;
      } else this.filterBy = val;
    },

    setWorkTime(workTime) {
      this.isCalendar = false;
      this.currBusiness.workHours = workTime;
    },
    saveAddress() {
      let addressloc = UtilService.getLocationByAddress(
        this.currBusiness.address
      );
      return addressloc.then(res => {
        console.log("loc", res);
        this.currBusiness.location.lat = res.lat;
        this.currBusiness.location.lng = res.lng;
        console.log(this.currBusiness);
        return res;
      });
    },
    saveCog() {
      let { businessId } = this.$route.params;
      this.saveAddress().then(() => {
        if (!this.loggedInUser) this.isSignUp = true;
        else {
          console.log("cmp : ", this.currBusiness);
          this.$store
            .dispatch({ type: "addBusiness", currBusiness: this.currBusiness })
            .then(() =>{
              var business= this.$store.getters.currBusiness
              this.isPathModal=true
              // this.$router.push("/business/" +business._id )
            }
            );
        }
      });
    },
    closeSignUp() {
      console.log(this.loggedInUser);
      this.isSignUp = false;
    },

    saveImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.imageFile = files[0];
      cloudinaryService.doUploadImg(this.imageFile).then(res => {
        if (this.filterBy === "header")
          this.currBusiness.prefs.header_img_url = res.secure_url;
        else this.currBusiness.prefs.profile_img_url = res.secure_url;
      });
    },
  },
  computed: {
    imgUrls() {
      return this.$store.getters.imgList;
    },
    clUrl() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloud_name
      }/upload`;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/variables.scss';
// helpers
.flex {
  display: flex;
  flex: none;
}
.culomn {
  display: flex;
  flex-direction: column;
}
span.flex {
  align-items: baseline;
  margin-top: 20px;
  span {
    margin: 3px;
  }
}
.bar {
  align-items: center;
  margin-top: 100px;
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  align-content: space-between;
  button{
    margin-top: 10px;
  }
}
.profilTag {
  width: 90px;
  margin-left: 250px;
}
.Setting {
  // position: fixed;
  font-size: 2.5rem;
  // padding: 10px;
  // border-radius: 100%;
  // box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
  margin-top: 150px;
  margin-left: 35px;
  z-index: 10;
  width: 65px;
  color: white;
  // background-color: white;
}
button {
  text-align: center;
  &.fa-cog {
    color: white;
  }
  &.fa-barcode {
    color: white;
  }
  &.fa-calendar-alt {
    color: white;
  }
  &.fa-save {
    color: white;
  }
  &.fa-plus {
    color: white;
  }
  &.fa-image {
    color: white;
  }
}
.bizInput{
  margin-left: 5px;
  text-transform: capitalize !important;
}

.detailscontiner{
  margin-left: 10px;
  border-left: 2.1px solid #f0f4f7;
  display: flex;
    flex-direction: column;
    align-items: baseline;
    padding-left: 10px;
    h2{
       font-weight: 600;
    }
    input{
      background-color: #f0f4f7;
      border: none;
      padding: 3px;
      min-width: 250px;
     
    }
}
.addImg {
  // position: absolute;
  font-size: 1.5rem;
  // padding: 10px;
  // border-radius: 100%;
  // box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
  margin: 10px;
  z-index: 10;
  width: 65px;
  margin-left: 35px;
  margin-top: 40px;
  // background-color: white;
}
.headerImgContiner {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-weight: 600;
  }
  button {
    &:hover {
      background-color: $secondary-color;
      color: white !important;
    }
  }
}
.sideBar{
   display: flex;
    flex-direction: column;
    align-items: flex-start;
  h1 {
    font-weight: 600;
    margin-top: 20px;

  }
  img{
    margin-top: 20px;
    border-radius: 10px;
  }
}
input {
  border: 0.8px dashed;
  max-width: 250px;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
}
.businessType {
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
}
h1,
h2,
h3 {
  font-weight: 100;
  letter-spacing: 0.2px;
}
.name {
  font-size: 2.5rem;
  font-weight: 500;
}
.page-container {
  background-color: #f0f4f7;
  display: grid;
  grid-template-columns: 2fr 20px 2fr 1fr 20px 1px;
  grid-template-rows: 1fr 1fr 1fr 0.5fr;
  grid-gap: 10px 20px;
  // padding: 20px;
  .img-header {
    grid-column: 2/6;
    grid-row: 1;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }
  .profile-detais {
    grid-column: 3;
    grid-row: 2;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }
  .calendarContiner {
    grid-column: 4;
    grid-row: 2;
    position: relative;
    // display: inline;
    background-color: white;
    padding: 5px;
    border-radius: 5px;

    // height: 100vh;
    img{
      position: absolute;
      opacity: 0.8;
      // width: 350px;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 10;
    }
    button{
      visibility: hidden;
      position: absolute;
      top: 0px;
      left: 50px;
      margin: 10px;
      border-radius: 15px;
      border: 0.8px solid $secondary-color;
      color: $secondary-color;
      background-color: #f0f4f7;
      font-size: 1.5rem;
      padding: 0 17px;

      transition: 0.3s ease-in;
      
    }
    .calendarBtn{
      min-width: 220px;
    margin-top: 70px;
    font-size: 1.5rem;
    padding: 0 17px;
    border-radius: 15px;
    border: 0.8px solid $secondary-color;
    color: $secondary-color;
    background-color: #f0f4f7;
    // transition: 2s;
   
      }
    &:hover img{
      
        opacity: 1;
        transition: 0.5s;

      
    //   button{
   
      
    // }
    }
    &:hover button{
     z-index: 1000;
      visibility: visible;
      background-color: $secondary-color;
      color: white;

    }
  }
  
  button.calendarBtn{
        margin-top: 50px;
      }
  section.calendar-date-picker.calendar {
    height: 100% important;
  }
  .midle {
    grid-column: 2/6;
    grid-row: 3;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
  }
  .setings {
    grid-column: 1;
    grid-row: 1/5;
    padding: 5px;
    border-radius: 5px;
    ul {
      padding: 0px;
    }
  }
}
.doneBtn{
    font-size: 1.5rem;
    padding: 0 17px;
    border-radius: 15px;
    border: 0.8px solid $primary-color;
    color: white;
    background-color: $primary-color;
    margin-top: 100px;
    margin-left: 70px;
}

.setings {
  background-color: #23263e;
}
.profile-detais {
  // margin-left: 30px;
  word-wrap: break-word !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica Neue, sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 1.375em !important;
  color: #484848 !important;
}
.details-head {
  align-items: center;
  input {
    min-width: 245px;
    border-radius: 5px;
  }
}
.img-profile {
  width: 75px;
  height: 75px;
  background-size: cover;
  border-radius: 50px;
  background-position: center;
  margin-left: 10px;
  border: 2.3px solid;
  justify-content: center;
  border-color: rgb(88, 88, 88);

  button{
    &:hover{
      color: $secondary-color !important;
    }
  }

}

.img-header {
  width: 100%;
  // height: 50vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  // border: 1.3px dashed #3899ec;
  justify-content: center;
  align-items: center;
  button.addBlanc {
    font-size: 1rem;
    padding: 0 17px;
    border-radius: 15px;
    border: 0.8px solid $secondary-color;
    color: $secondary-color;
  }
}
button {
  background-color: #ffdead00;
  border: none;
  font-weight: 800;
  font-size: 1.5rem;
}
h3 {
  text-align: left;
}
.address-h2 {
  margin-left: 6px;
}
button:focus {
  border: none;
  outline: none;
}

.fas {
  color: black;
}
.add-appoint {
  border-radius: 5px;
  padding: 5px;
  border: none;
}

.headerGallery {
  height: 100vh;
  right: 0px;
  border-radius: 5px;
  margin-top: 50px;
}
.galleryItem {
  margin: 7px;
  height: 100px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}
.workHourCmp {
  position: fixed;
  top: 25vh;
  left: 25vw;
  z-index: 1000;
}
.login {
  z-index: 1000;
}
.editHeader {
  background-color: white;
  border-radius: 100%;
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
  margin-top: 355px;
}
.editProfile {
  background-color: white;
  border-radius: 100%;
  padding: 5px;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
  margin-left: 80px;
  height: 33px;
  z-index: 10;
}
</style>

