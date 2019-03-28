<template>
  <div class="login">
    <user-login-signup :isNewUserProp="false" @routeHome="routeHome"></user-login-signup>
  </div>
</template>

<script>
import UserLoginSignup from "@/components/UserLoginSignup.vue";
export default {
  components: {
    UserLoginSignup
  },
  methods:{
    routeHome(){
      this.$router.go(-1)
    }
  }
}
</script>
