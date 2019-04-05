<template>
  <div class="container">
    <div class="calendar light">
      <div class="calendar_header">
        <h1 class="header_title">{{currUser}}'s Dashbord</h1>
        <p class="header_copy">Calendar Plan</p>
      </div>
      <div class="calendar_plan">
        <div class="cl_plan">
          <div class="cl_title"> {{dateNow}}</div>
          <div class="cl_copy">
            <input v-model="date" type="date">
          </div>
          <div class="cl_add">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div class="calendar_events">
        <p class="ce_title">Upcoming Events</p>
        <div class="event_item" v-for="(appoint) in filterByDate() " :key="appoint._id" @click="isActiv=!isActiv">
          <div class="ei_Dot" :class="{dot_active: isActiv}"  ></div>
          <div class="ei_Title">{{appoint.startTime}}</div>
          <div class="ei_Copy" >{{appoint.product.title}},{{appoint.userData.userName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  created() {
    let { businessId } = this.$route.params;
    this.businessId = businessId;
    this.$store.dispatch({ type: "loadBusiness", businessId }).then(() => {
      var user = this.$store.getters.loggedInUser;
      if (user && businessId === user.business_id) this.isAdmin = true;
      this.$store.dispatch({ type: "loadAppoints", listRequire: "business" });
    });
  },
  computed: {
    appointList() {
      return this.$store.getters.appointsList;
    },
    dateNow(){
        return moment(this.date).format('MMMM Do YYYY')
    },
    currUser(){
        return this.$store.getters.loggedInUser.userName
    }
  },
  data() {
    return {
      date: null,
      appoint:{
          date:null,
          startTime:null,
          user_id:null,
          business_id:this.$store.getters.currBusiness._id,
          product:this.$store.getters.currBusiness.products[0]
        },
        users:[],
        isActiv:false
    };

  },
  created(){
      this.date = moment(Date.now()).format('YYYY') + '-' + moment(Date.now()).format('MM') + '-' + moment(Date.now()).format('DD')
  },
  methods: {
    filterByDate() {
      return (this.appointList
        .filter(appoint => appoint.date === this.date))
        .sort((a, b) => {
            var a= a.startTime.substr(0, 2)
            var b= b.startTime.substr(0, 2)
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }

          // names must be equal
          return 0;
        });
    },
    finduser(userId){
   return this.$store.dispatch({ type: "findUserById", userId }).then(() => {
       console.log(this.$store.getters.UserToShow);
       var user=this.$store.getters.UserToShow
       console.log(user.userName);
      this.users.push(user.userName) 
       return 
    })
        

    }
  }
};
</script>

<style lang="scss" scoped>
$off_white: #fafafa;
$light_grey: #a39d9e;
* {
  box-sizing: border-box;
}

body {
  background-color: $off_white;
}
input {
  &:focus {
    outline: none;
  }
}
.container {
//   margin: 100px auto;
//   width: 809px;
background-color: #23263e;
}

.light {
//   margin-top: 100px;
  background-color: #fff;
}
.dark {
  margin-left: 65px;
}

.calendar {
  width: 370px;
  box-shadow: 0px 0px 35px -16px rgba(0, 0, 0, 0.75);
  font-family: "Roboto", sans-serif;
  padding: 20px 30px;
  color: #363b41;
  display: inline-block;
}

.calendar_header {
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

.header_copy {
  color: $light_grey;
  font-size: 20px;
}
.calendar_plan {
  margin: 20px 0 40px;
}
.cl_plan {
  width: 100%;
  height: 140px;
  background-image: linear-gradient(-222deg, #3899ec, #57aaf2);
  box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
  padding: 30px;
  color: #fff;
}
.cl_title {
}
.cl_copy {
  font-size: 20px;
  margin: 20px 0;
  display: inline-block;
}

.cl_add {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  margin: 0 0 0 65px;
  color: #c2c2c2;
  padding: 11px 13px;
}
.calendar_events {
  color: $light_grey;
}
.ce_title {
  font-size: 14px;
}

.event_item {
  margin: 18px 0;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(-222deg, #3899ec, #57aaf2);
    box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
    .ei_Dot {
      background-color: #fff;
    }
    .ei_Copy,
    .ei_Title {
      color: #fff;
    }
  }
}

.ei_Dot,
.ei_Title {
  display: inline-block;
}

.ei_Dot {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: $light_grey;
  box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
}
.dot_active {
  background-color: #42b983;
}

.ei_Title {
  margin-left: 10px;
  color: #363b41;
}

.ei_Copy {
  font-size: 12px;
  margin-left: 27px;
}

.dark {
  background-image: linear-gradient(-222deg, #646464, #454545);
  color: #fff;
  .header_title,
  .ei_Title,
  .ce_title {
    color: #fff;
  }
}
</style>
