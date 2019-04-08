<template>
  <div v-if="currUser && currUser.isReg && !currUser.business_id" class="user-appoints">
    <!-- <el-card class="box-card"> -->
    <div v-if="upcomingCount > 0" class="notifications">{{upcomingCount}}</div>
    <button @click="getUserAppoints">{{currUser.userName}}</button>
    <div v-if="isOpen" class="appoints-card">
      <ul>
        <li v-for="appoint in appoints" :key="appoint._id">
          <section
            class="appoint-container box-card"
            v-if="appoint.timeStamp >= Date.now()"
            :class="{ comingUp: appoint.isComingUp }"
          >
            <transition name="fade">
              <v-badge v-if="showComing && appoint.isComingUp" left overlap>
                <template v-slot:badge>
                  <v-icon dark small>fas fa-stopwatch</v-icon>
                </template>
              </v-badge>
            </transition>
              <button class="remove-appoint" @click.stop="removeAppoint(appoint._id)">
                  <i class="fas fa-trash-alt"></i></button>
            <router-link :to="'/business/'+appoint.business_id" @click.stop.prevent>
              <h3>{{appoint.product.title}}</h3>
              <p>{{appoint.timeToShow}}</p>
              <p>At {{appoint.startTime}} ({{appoint.timeRemaining}})</p>
            </router-link>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "UserAppoints",
  props: {},
  data() {
    return {
      isOpen: false,
      showComing: false,
      interval: null
    };
  },
  methods: {
    getDetails(businessId) {
      this.$router.push("/business/" + businessId);
    },
    removeAppoint(appointId) {
      this.$store.dispatch({ type: "removeAppoint", appointId });
    },

    getUserAppoints() {
      if (this.isOpen) return (this.isOpen = !this.isOpen);
      this.isOpen = !this.isOpen;
      if (this.isOpen && this.upcomingCount > 0) {
        this.interval = setInterval(() => {
          this.showComing = !this.showComing;
        }, 2000);
        if (!this.isOpen) clearInterval(this.interval);
      }
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedInUser;
    },
    upcomingCount() {
      var counter = this.appoints.reduce((acc, appoint) => {
        console.log(acc);
        if (
          appoint.timeStamp >= Date.now() &&
          appoint.timeStamp - Date.now() <= 60 * 60 * 24 * 1000
        )
          return ++acc;
        else return acc;
      }, 0);
      return counter;
    },
    appoints() {
      var appoints = this.$store.getters.userAppointsList;
      appoints.forEach((appoint, idx) => {
        var timeStamp = new Date(appoint.date);
        var dayIdx = timeStamp.getDay();
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday "
        ];
        var day = days[dayIdx];
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        var month = months[timeStamp.getMonth()];
        var year = timeStamp.getFullYear();
        var timeToShow =
          day + ", " + month + " " + timeStamp.getDate() + " " + year;
        var timeRemaining = moment(timeStamp).fromNow();
        var isComingUp = timeStamp - Date.now() <= 60 * 60 * 24 * 1000;
        appoint.timeStamp = timeStamp;
        appoint.timeToShow = timeToShow;
        appoint.timeRemaining = timeRemaining;
        appoint.isComingUp = isComingUp;
        appoints.splice(idx, 1, appoint);
        console.log(appoint);
      });
      return appoints.sort((app1, app2) => {
        return app1.timeStamp - app2.timeStamp;
      });
    }
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>


<style scoped lang="scss">
@import "@/scss/variables.scss";

a {
  text-decoration: none;
  color: black;
}

p {
  margin-bottom: 5px;
}

.el-card__body {
  padding: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.v-badge {
  color: #ff5c5d;
  padding: 3px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 3px;
  .v-icon{
    color: #ff5c5d;
  }
}

.user-appoints {
  button {
    position: absolute;
    font-weight: 900;
    right: 20px;
    top: 55px;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: none;
    outline: none;
    z-index: 10;
    border: 1px solid $primary-color;
    background-color: white;
    &.remove-appoint{
        left: 0;
        top: -5px;
        height: 20px;
        width: 20px;
        font-size: 1.2rem;
        background: none;
    }
  }
}
.appoints-card {
  border: 1px solid $primary-color;
  position: absolute;
  right: 75px;
  top: 112px;
  width: 250px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  height: 400px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.75);
  z-index: 9;
  ul{
    padding: 0;
  }
}
$base-color: $secondary-color;
.appoint-container {
  cursor: pointer;
  background-color:  $secondary-color;
  padding: 3px;
  margin-bottom: 5px;
  position: relative;
  border-radius: 5px;
  &:hover {
    background-color: darken($base-color, 10%);
  }
}
.notifications {
  position: fixed;
      right: 78px;
    top: 75px;
  background-color: $secondary-color;
  padding: 1px;
  height: 18px;
  width: 18px;
  border-radius: 100px 100px 0 100px;
  z-index: 100;
}
</style>
