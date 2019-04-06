<template>
  <div id="app">
    <button class="nav-burger" @click="isOpenNav = !isOpenNav">
      <i class="fas fa-bars"></i>
    </button>

    <userAppoints />

    <div id="nav" :class="`${isHeaderAbsolute ? 'absolute-header' : 'basic-header'}`">
      <router-link class="logo-container" to="/">
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

        <dialog-container v-if="isShowLogin" class="login-container" @dialogClick="toggleLogin">
          <user-login-signup :isNewUserProp="false" @loggedIn="toggleLogin"></user-login-signup>
        </dialog-container>
      </section>
    </div>
    <router-view/>
  </div>
</template>

<script>
import userAppoints from "@/components/UserAppoints.vue";
import UserLoginSignup from "@/components/UserLoginSignup.vue";
import DialogContainer from '@/components/General/DialogContainer.vue'

export default {
  name: "app",
  components: {
    userAppoints,
    UserLoginSignup,
    DialogContainer,
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
    },
    isHeaderAbsolute() {
      return this.$store.getters.isHeaderAbsolute;
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
      this.isShowLogin = !this.isShowLogin;
    }
  },
  created() {}
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

#nav {
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
    margin-right:16px;
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

.dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.login-container {
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.basic-header {
  border-bottom: 1px solid lightgray;
}

.absolute-header {
  position: absolute;
}
</style>
