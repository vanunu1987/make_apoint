<template>
  <div id="app">
    <button class="nav-burger" @click="isOpenNav = !isOpenNav">
      <i class="fas fa-bars"></i>
    </button>
    <userAppoints/>
    <div id="nav">
      <router-link to="/">
        <div class="logo" v-if="isHome">
          <h1>
            Make Appoint
            <span>.</span>
          </h1>
        </div>
      </router-link>

      <section class="routes" :class="{ openNav: isOpenNav }">
        <router-link
          v-if="loggedUser && loggedUser.business_id"
          :to="'/business/'+loggedUser.business_id"
        >{{loggedUser.userName}}'s Page</router-link>
        <router-link @click="test" to="/edit">Add business</router-link>

        <a @click="toggleLogin">Log in</a>

        <div v-if="isShowLogin" class="login-container" @click="toggleLogin">
          <user-login-signup :isNewUserProp="false" @routeHome="toggleLogin"></user-login-signup>
        </div>
      </section>
    </div>
    <router-view/>
  </div>
</template>

<script>
import userAppoints from "@/components/UserAppoints.vue";
import UserLoginSignup from "@/components/UserLoginSignup.vue";

export default {
  name: "app",
  components: {
    userAppoints,
    UserLoginSignup
  },
  data() {
    return {
      isOpenNav: false,
      isHome: true,
      isShowLogin: false
    };
  },
  computed: {
    loggedUser() {
      var currUser = this.$store.getters.loggedInUser;
      if (!currUser) return;
      return currUser;
    },
    currBusiness() {
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
    },
    toggleLogin() {
      this.isShowLogin = !this.isShowLogin
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

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
  // background-image: linear-gradient(to right, white, #ffffff00, white);

  a,
  .user-name {
    margin: 0 16px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }

    &.router-link-exact-active {
      color: $primary-color;
    }
  }
}

.logo,
.mobile-logo {
  h1 {
    font-family: "Baloo Chettan", cursive;
    position: relative;
    font-weight: bold;
    color: black;

    span {
      position: absolute;
      top: -101px;
      font-size: 135px;
      right: -13px;
      z-index: -1;
      color: $primary-color;
      height: 50px;
    }
  }
}
.mobile-logo {
  display: none;
}

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
