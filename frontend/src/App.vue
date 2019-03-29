<template>
  <div id="app">
    <userAppoints/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
       <router-link to="/login">Log in</router-link> | 
       <router-link to="/edit">Add business</router-link> | 
       <router-link v-if="loggedUser && loggedUser.business_id" 
       :to="'business/'+loggedUser.business_id">{{loggedUser.userName}}'s Page |</router-link>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  display: flex;
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
