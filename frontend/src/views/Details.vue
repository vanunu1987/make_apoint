<template>
  <section class="page-container" v-if="currBusiness">
    <router-link class="fas fa-users-cog" v-if="isAdmin" :to="'/edit/'+businessId"></router-link>
    <router-link class="fas fa-users-cog" v-if="isAdmin" :to="'/manage/'+businessId">business</router-link>

    <img-carousel class="img-carousel-container"/>

    <calendar-dialog v-if="isShowCalendarDialog" @closeBtnClick="toggleCalendarDialog" />
    <details-page-footer @btnClick="toggleCalendarDialog"/>
    <!-- <make-appoint class="calendar"></make-appoint> -->

    <div class="img-header" :style="{backgroundImage: `url(${imgPath.header_img_url})`}"></div>

    <div class="profile-details culomn">
      <div class="details-head flex">
        <h1 class="name">{{currBusiness.name}}</h1>
        <div class="img-profile" :style="{backgroundImage: `url(${imgPath.profile_img_url})` }"></div>
      </div>

      <span class="flex">
        <span class="fas fa-map-marker-alt"></span>
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
        <span class="fas fa-trophy"></span>
        <h2>Rating</h2>
      </span>
      <span class="rating-container flex">
        <v-rating
          :value="currBusiness.rank.avg"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <h3>({{currBusiness.rank.qty}})</h3>
      </span>
    </div>

    <div class="middle">
      <GmapMap
        class="map"
        :center="mapCenter"
        :zoom="16"
        map-type-id="terrain"
        style="height: 300px"
        :disableAutoPan="true"
        :options="{scrollwheel: false}"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="mapCenter"
          :clickable="true"
          :draggable="true"
          :disableAutoPan="true"
          :options="{scrollwheel: false}"
        />
      </GmapMap>
    </div>
  </section>
</template>

<script>
import ImgCarousel from "@/components/Details/ImgCarousel.vue";
import DetailsPageFooter from "../components/Details/DetailsPageFooter.vue";
import CalendarDialog from '@/components/Details/CalendarDialog.vue';

import BusinessService from "@/services/UtilService.js";

export default {
  components: {
    ImgCarousel,
    DetailsPageFooter,
    CalendarDialog,
  },
  created() {
    this.loadBusiness();
  },
  data() {
    return {
      isShowCalendarDialog: false,
      imgIdx: 0,
      markers: [
        {
          label: "a place",
          position: { lat: 32.0877, lng: 34.8032 }
        }
      ],
      editMode: false,
      businessId: null,
      isAdmin: false,
    };
  },
  mounted() {
    var user = this.$store.getters.loggedInUser;
  },
  computed: {
    currBusiness() {
      return this.$store.getters.currBusiness;
    },
    address() {
      let loc = this.currBusiness.location;
      return `${loc.street} ${loc.number} ${loc.city} ${loc.state}`;
    },
    imgPath() {
      return this.currBusiness.prefs;
    },
    mapCenter() {
      return this.$store.getters.currBusiness.location;
    },
    businessIdParam() {
      return this.$route.params.businessId;
    }
  },
  methods: {
    changeImgIdx(val) {
      if (this.imgIdx + val < 0 || this.imgIdx + val > this.imgPath.length - 1)
        return;
      else this.imgIdx += val;
    },
    loadBusiness() {
      let { businessId } = this.$route.params;
      this.businessId = businessId;
      this.$store.dispatch({ type: "loadBusiness", businessId }).then(() => {
        var user = this.$store.getters.loggedInUser;
        if (user && businessId === user.business_id) this.isAdmin = true;
        this.$store.dispatch({ type: "loadAppoints", listRequire: "business" });
      });
    },
    toggleCalendarDialog() {
      this.isShowCalendarDialog = !this.isShowCalendarDialog;
    }
  },
  watch: {
    businessIdParam: () => {
      this.loadBusiness();
    }
  }
};
</script>

<style lang="scss" scoped>
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
h1,
h2,
h3 {
  font-weight: 100;
  letter-spacing: 0.2px;
}
.name {
  font-size: 46px;
  font-weight: 800;
}
.page-container {
  background-color: white;
  display: grid;
  padding: 20px 20px 100px;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px 20px;

  .img-header {
    grid-column: 1/3;
    grid-row: 1;
  }
  .profile-details {
    grid-column: 2;
    grid-row: 2;
  }
  .calendar {
    grid-column: 3;
    // grid-row: 2;
    position: relative;
    display: inline;
  }
  .middle {
    grid-column: 1/3;
  }
}
.profile-details {
  word-wrap: break-word !important;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica Neue, sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #484848 !important;
}
.details-head {
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}
.img-profile {
  width: 75px;
  height: 75px;
  background-size: cover;
  border-radius: 50px;
  background-position: center;
  margin-left: 10px;
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
span {
  &.rating-container {
    margin-top: 5px;
    display: flex;
    padding-bottom: 10px;
  }
}
.fas {
  color: black;
}
.add-appoint {
  border-radius: 5px;
  padding: 5px;
  border: none;
}

a {
  text-decoration: none;
  font-size: 2rem;
  padding: 5px;
  text-align: center;
  border-radius: 100%;
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
  margin: 10px;
  z-index: 10;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 55px;
  right: 15px;
  background-color: white;
}

@media (max-width: 740px) {
  .page-container {
    background-color: white;
    display: grid;
    grid-template-columns: 10px 1fr 10px;
    grid-template-rows: 1.3fr 1fr 1fr 0.5fr;
    grid-gap: 10px 20px;

    .img-header {
      grid-column: 1/3;
      grid-row: 1;
    }
    .profile-details {
      grid-column: 2;
      grid-row: 2;
    }
    .calendar {
      grid-column: 1;
      grid-row: 3;
      position: relative;
      display: inline;
    }
    .middle {
      grid-column: 1/2;
    }
  }
}

.img-carousel {
  grid-column: 1;
}

.img-header {
  width: 100%;
  height: 400px;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center !important;
}

.calendar-dialog {
  background-color: white;
  z-index: 6;
}
</style>
