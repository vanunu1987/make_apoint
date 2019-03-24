<template>
  <div class="login">
    <h1>hi</h1>
    <user-login-signup :isNewUserProp="true"></user-login-signup>
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
