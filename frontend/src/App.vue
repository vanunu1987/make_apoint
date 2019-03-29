<template>
  <div id="app">
    <userAppoints/>
        <div id="nav">
          <div class="logo">
          <h1>Make Appoint<span>.</span></h1>
          </div>
          <section class="routes">
          <router-link v-if="loggedUser && loggedUser.business_id" 
          :to="'business/'+loggedUser.business_id">{{loggedUser.userName}}'s Page |</router-link>
          <router-link to="/edit">Add business |</router-link>
          <router-link to="/">Home |</router-link>
          <router-link to="/about">About |</router-link>
          <router-link to="/login">Log in</router-link>
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
@import url('https://fonts.googleapis.com/css?family=Baloo+Chettan');

.logo{
  h1{
  font-family: 'Baloo Chettan', cursive;
    position: relative;
    font-weight: bold;
    span{
    position: absolute;
    top: -101px;
    font-size: 135px;
    right: -13px;
    z-index: -1;
    color: #1dbf73;
    height: 50px;
    }
  }
}

.routes{
      display: flex;
    align-items: flex-end;
    font-size: 1.1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  // padding: 30px;
  display: flex;
  justify-content: space-between;
  a,.user-name,logout-btn {
    margin-right: 5px;
    margin-left: 5px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
