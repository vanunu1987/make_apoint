<template>
  <div class="login">
    <user-login-signup :isNewUserProp="false"></user-login-signup>
  </div>
</template>

<script>
import UserLoginSignup from "@/components/UserLoginSignup.vue";
export default {


  components: {
    UserLoginSignup
  }
}
</script>
