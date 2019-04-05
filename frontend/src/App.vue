<template>
  <div id="app">
    <button class="nav-burger" @click="isOpenNav = !isOpenNav">
      <i class="fas fa-bars"></i>
    </button>
    <userAppoints/>
    <div id="nav">
      <div class="logo" v-if="isHome">
        <h1>
          Make Appoint
          <span>.</span>
        </h1>
      </div>
      <section class="routes" :class="{ openNav: isOpenNav }">
        <router-link
          v-if="loggedUser && loggedUser.business_id"
          :to="'/business/'+loggedUser.business_id"
        >{{loggedUser.userName}}'s Page</router-link>
        <router-link @click="test" to="/edit">Add business</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/login">Log in</router-link>
        <router-link to="/">Home</router-link>
      </section>
    </div>
    <router-view/>
  </div>
</template>

<script>
import userAppoints from "@/components/UserAppoints.vue";
export default {
  name: "app",
  components: {
    userAppoints
  },
  data() {
    return {
      isOpenNav: false,
      isHome: true
    };
  },
  computed: {
    loggedUser() {
      var currUser = this.$store.getters.loggedInUser;
      if (!currUser) return;
      return currUser;
    },
    currBusiness() {
      console.log(this.$store.getters.currBusiness);
      return this.$store.getters.currBusiness;
    }
  },
  methods: {
    showReminder() {
      const h = this.$createElement;
      this.$notify({
        title: "Title",
        message: h("i", { style: "color: teal" }, "This is a reminder")
      });
    },
    test() {
      this.isHome = false;
    }
  },
  created() {}
};
</script>

<style lang="scss">
#nav {
  position: absolute;
  left: 0;
  z-index: 1000;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-right: 10px;
  padding-left: 30px;
  background-image: linear-gradient(to right, white, #ffffff00, white);

  a,
  .user-name {
    margin: 0 16px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
