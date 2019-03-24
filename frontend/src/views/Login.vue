<template>
  <div class="login">
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input type="text" placeholder="User Name" v-model="userCredentials.userName">
      <input type="password" placeholder="Password" v-model="userCredentials.password">
      <button type="submit">OK</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      userCredentials: {
        userName: null,
        password: null
      }
    };
  },
  computed: {},
  methods: {
    login() {
      console.log(this.userCredentials);
      var credentials = { ...this.userCredentials };
      this.$store.dispatch({ type: "loginUser", credentials });
       this.userCredentials.userName = null;
      this.userCredentials.password = null;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 30px;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  // border: 1px solid black;
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  input {
    height: 25px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 5px;
    text-align: center;
  }
}
</style>


