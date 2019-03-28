<template>
  <div v-if="currUser && !currUser.business_id" class="user-appoints">
  <!-- <el-card class="box-card"> -->
      <div v-if="upcomingCount > 0" class="notifications">{{upcomingCount}}</div>
    <button @click="getUserAppoints">{{currUser.userName}}</button>
  <div v-if="isOpen" class="appoints-card">
      <ul>
          <li v-for="appoint in appoints" :key="appoint._id">
              <section class="appoint-container box-card" v-if="appoint.timeStamp >= Date.now()"
              :class="{ comingUp: appoint.isComingUp }">
                <transition name="fade">
                   <v-badge v-if="showComing && appoint.isComingUp" color="#ff5c5d" left overlap>
                        <template v-slot:badge>
                            <v-icon dark small>far fa-calendar-alt</v-icon>
                        </template>
                    </v-badge>
                </transition>
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
import moment from 'moment'
export default {
  name: "UserAppoints",
  props: {
  },
  data() {
    return {
        isOpen:false,
        showComing:false,
        interval :null
    };
  },
  methods: {
      getDetails(businessId){
          this.$router.push('/business/'+businessId)
      },

    getUserAppoints(){
        if (this.isOpen) return this.isOpen = !this.isOpen
            this.isOpen = !this.isOpen
            if (this.isOpen && this.upcomingCount > 0) {
                this.interval = setInterval(() => {
                    this.showComing = !this.showComing
                }, 2000);
                if (!this.isOpen) clearInterval(this.interval)
            }
    }
  },
  computed:{
    currUser(){
        return this.$store.getters.loggedInUser
    },
    upcomingCount(){
        var counter = this.appoints.reduce((acc,appoint) => {
            console.log(acc);
            if (appoint.timeStamp >= Date.now() && appoint.timeStamp - Date.now() <= 60 * 60 * 24 * 1000) return ++acc
            else return acc
        },0)
        return counter
    },
    appoints(){
        var appoints =  this.$store.getters.userAppointsList
        appoints.forEach((appoint,idx) => {
        var timeStamp = new Date(appoint.date)
        var dayIdx = timeStamp.getDay()
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday ']
        var day = days[dayIdx]
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        var month = months[timeStamp.getMonth()]
        var year = timeStamp.getFullYear()
        var timeToShow = day + ', ' +  month + ' ' + timeStamp.getDate() + ' ' + year
        var timeRemaining = moment(timeStamp).fromNow()
        var isComingUp = (timeStamp - Date.now() <= 60 * 60 * 24 * 1000)
        appoint.timeStamp = timeStamp;
        appoint.timeToShow = timeToShow;
        appoint.timeRemaining = timeRemaining;
        appoint.isComingUp = isComingUp;
        appoints.splice(idx,1,appoint)
        console.log(appoint);
        })
    return appoints.sort((app1,app2) => {
        return app1.timeStamp - app2.timeStamp
    })
    }
  },
  destroyed(){
      clearInterval(this.interval)
  }
};
</script>


<style scoped lang="scss">

a{
    text-decoration: none;
    color: black;
}

p{
    margin-bottom: 5px;
}

.el-card__body {
    padding: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.v-badge{
    background-color: #ff5c5d;
    padding: 3px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 3px;
}

.user-appoints {
    button{
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: #a2f7b5;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: none;
    outline: none;
    z-index: 10;
    }
}
.appoints-card{
    position: absolute;
    right: 70px;
    top: 70px;
    // height: 300px;
    width: 250px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    height: 400px;
    box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.75);
    z-index: 9;
}
$base-color: #a2f7b5;
.appoint-container{
    cursor: pointer;
    background-color: #a2f7b5;
    padding: 3px;
    margin-bottom: 5px;
    position: relative;
    border-radius: 5px;
    &:hover{
        background-color:darken( $base-color, 10% )
    }
}
.notifications{
    position: fixed;
    right: 75px;
    top: 35px;
    background-color: #ff5c5d;
    padding: 1px;
    height: 18px;
    width: 18px;
    border-radius: 100px 100px 0 100px;
    z-index: 11;
}
</style>
