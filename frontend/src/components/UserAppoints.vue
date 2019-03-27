<template>
  <div v-if="currUser" class="user-appoints">
  <!-- <el-card class="box-card"> -->
      <div v-if="appoints" class="notifications">{{upcomingCount}}</div>
    <button @click="getUserAppoints">{{currUser.userName}}</button>
  <div v-if="isOpen" class="appoints-card">
      <ul>
          <li v-for="appoint in appoints" :key="appoint._id">
              <el-card class="appoint-container box-card" 
              v-if="appoint.isComingUp" :class="{ comingUp: appoint.isComingUp }">
                <transition name="fade">
                   <v-badge v-if="showComing" color="#ff5c5d" left overlap>
                        <template v-slot:badge>
                            <v-icon dark small>far fa-calendar-alt</v-icon>
                        </template>
                    </v-badge>
                </transition>
              <router-link :to="'business/'+appoint.business_id">
                {{appoint.product.title}}<br>
                {{appoint.timeToShow}}<br> At {{appoint.startTime}}<br>
                {{appoint.timeRemaining}}
              </router-link>
              </el-card>
          </li>
      </ul>
      <ul>
          <li v-for="appoint in appoints" :key="appoint._id">
              <section class="appoint-container" v-if="!appoint.isComingUp">
              <router-link :to="'business/'+appoint.business_id">
                {{appoint.product.title}}<br>
                {{appoint.timeToShow}}<br> At {{appoint.startTime}}<br>
                <!-- Approximatly {{appoint.product.duration}} Minutes<br> -->
                {{appoint.timeRemaining}}
              </router-link>
              </section>
          </li>
      </ul>
  </div>
  <!-- </el-card> -->
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
        showComing:false
    };
  },
  methods: {
    getUserAppoints(){
        if (this.isOpen) return this.isOpen = !this.isOpen
            this.isOpen = !this.isOpen
            if (this.isOpen && this.upcomingCount > 0) {
                var banner = setInterval(() => {
                    this.showComing = !this.showComing
                }, 2000);
                if (!this.isOpen) clearInterval(banner)
            }
        // this.$store.dispatch({type:'loadAppoints',listRequire:'user'})
        // .then(res =>{
        //     this.isOpen = !this.isOpen
        //     },
        // )
    }
  },
  computed:{
    currUser(){
        return this.$store.getters.loggedInUser
    },
    test(){
     return  moment(Date.now()).fromNow()
    },
    upcomingCount(){
        var counter = this.appoints.reduce((acc,appoint) => {
            console.log(acc);
            if (appoint.timeStamp - Date.now() <= 60 * 60 * 24 * 1000) return ++acc
            else return acc
        },0)
        return counter
    },
    appoints(){
        var appoints =  this.$store.getters.appointsList
        appoints.forEach((appoint,idx) => {
            var timeStamp = new Date(appoint.date)
            var day = timeStamp.getDay()
            switch (day){
                case 0:
                    day = 'Sunday'
                break;
                case 1:
                    day = 'Monday'
                break;
                case 2:
                    day = 'Tuesday'
                break;
                case 3:
                    day = 'Wednesday '
                break;
                case 4:
                    day = 'Thursday'
                break;
                case 5:
                    day = 'Fridayday'
                break;
                case 6:
                    day = 'Saturday '
                break;
            }
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
        // return appoint
        })
    return appoints
    }
  }
};
</script>


<style scoped lang="scss">

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
    }
}
.appoints-card{
    position: absolute;
    right: 70px;
    top: 70px;
    // height: 300px;
    width: 250px;
    padding: 5px;
    background: white;
    border-radius: 5px;
}

.appoint-container{
    cursor: pointer;
    background-color: #a2f7b5;
    padding: 3px;
    margin-bottom: 5px;
    position: relative;
    height: 400px;
}
.notifications{
    position: fixed;
    right: 75px;
    top: 25px;
    background-color: #ff5c5d;
    padding: 1px;
    height: 18px;
    width: 18px;
    border-radius: 100px 100px 0 100px;
    z-index: 10;
}
</style>
