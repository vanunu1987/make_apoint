<template>
  <div id="app">
    <button class="nav-burger" @click="isOpenNav = !isOpenNav"><i class="fas fa-bars"></i></button>
    <userAppoints/>
          <div id="nav">
            <div class="logo">
            <h1>Make Appoint<span>.</span></h1>
            </div>
            <section class="routes" :class="{ openNav: isOpenNav }">
            <router-link v-if="loggedUser && loggedUser.business_id" 
            :to="'business/'+loggedUser.business_id">{{loggedUser.userName}}'s Page <span>|</span></router-link>
            <router-link to="/edit">Add business <span>|</span></router-link>
            <router-link to="/about">About <span>|</span></router-link>
            <router-link to="/login">Log in |</router-link>
            <router-link to="/">Home <span>|</span></router-link>
            </section>
        </div>
  <router-view/>
  </div>
</template>

<script>
import userAppoints from '@/components/UserAppoints.vue'
export default {
  name: "app",
  components:{
    userAppoints
  },
  data() {
    return {
      isOpenNav:false
    };
  },
  computed: {
    loggedUser(){
      var currUser = this.$store.getters.loggedInUser
      if (!currUser) return 
      return currUser
    },
    currBusiness(){
      console.log(this.$store.getters.currBusiness);
      return this.$store.getters.currBusiness
    }
  },
  methods: {
    showReminder(){
       const h = this.$createElement;
        this.$notify({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, 'This is a reminder')
    });
    }
  },
  created() {}
};
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Baloo+Chettan');

// .logo,.mobile-logo{
//   h1{
//   font-family: 'Baloo Chettan', cursive;
//     position: relative;
//     font-weight: bold;
//     span{
//     position: absolute;
//     top: -101px;
//     font-size: 135px;
//     right: -13px;
//     z-index: -1;
//     color: #1dbf73;
//     height: 50px;
//     }
//   }
// }
// .mobile-logo{
//   display: none;
// }
// .nav-burger{
//   display: none;
// }
// .routes{
//     display: flex;
//     align-items: flex-end;
//     font-size: 1.1rem;
// }
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   // padding: 30px;
//   display: flex;
//   justify-content: space-between;
//   a,.user-name,logout-btn {
//     margin-right: 5px;
//     margin-left: 5px;
//     font-weight: bold;
//     color: #2c3e50;
//     text-decoration: none;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

// @media (max-width: 740px){


// .routes{
//   position: fixed;
//   top: 0;
//   left: 0;
//   height: 100vh;
//   background-color: #eeeeee;
//   transform: translate(-100%,0);
//   display: flex;
//   flex-direction: column;
//   align-items: end;
//   padding: 100px 0 0 20px;
//   background-color: #f2f6f5;
//   transition: .3s ease-in-out;
//   &.openNav{
//     position: fixed;
//     transform: translate(0,0);
//     width: 60vw;
//   }
// }
// a{
//   margin-bottom: 10px;
//   span{
//     display: none;
//   }
// }
// .logo{
// //  display: block;
// //   position: absolute;
// //   top: 10px;
// //   left: 25%;
// }
// .nav-burger{
//   display: block;
//   position: absolute;
//   right: 15px;
//   top: 10px;
//   font-size: 2rem;
//   z-index: 100000;
//   cursor: pointer;
// }

// }
</style>
