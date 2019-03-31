<template>
  <div id="app">
    <button class="nav-burger" @click="isOpenNav = !isOpenNav"><i class="fas fa-bars"></i></button>
    <userAppoints/>
          <div id="nav">
            <div class="logo" v-if="isHome">
            <h1>Make Appoint<span>.</span></h1>
            </div>
            <section class="routes" :class="{ openNav: isOpenNav }">
            <router-link v-if="loggedUser && loggedUser.business_id"
            :to="'/business/'+loggedUser.business_id">{{loggedUser.userName}}'s Page <span>|</span></router-link>
            <router-link @click="test" to="/edit">Add business <span>|</span></router-link>
            <router-link to="/about">About <span>|</span></router-link>
            <router-link to="/login">Log in <span>|</span></router-link>
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
      isOpenNav:false,
      isHome:true
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
    },
    test(){
      console.log('ONCLICKKKKKKKKKKKKKKKKKKKKKKKK');
      this.isHome = false
      
    }
  },
  created() {}
};
</script>

<style lang="scss">

</style>
