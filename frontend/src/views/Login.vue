<template>
  <div class="login">
    <div class="sign-background"></div>
    <section class="form-container">
    <h1>LOGIN</h1>
    <form v-if="!newUser" @submit.prevent="login">
      <input type="text" placeholder="User Name" v-model="userCredentials.userName">
      <input type="password" placeholder="Password" v-model="userCredentials.password">
      <button type="submit">OK</button>
    </form>
    <form v-if="newUser" @submit.prevent="signup">
      <input type="text" placeholder="User Name" v-model="newUserCredentials.userName">
      <input type="password" placeholder="Password" v-model="newUserCredentials.password">
      <input type="tel" placeholder="Phone Number" v-model="newUserCredentials.phone">
      <button type="submit">OK</button>
    </form>
    <button @click="newUser = !newUser">{{(!newUser)  ? 'New User' : 'Existing User'}}</button>
    </section>
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
      },
      newUserCredentials: {
        userName: null,
        password: null,
        phone:null
      },
      newUser: false
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
    },
    signup() {
      console.log(this.newUserCredentials);
      var credentials = { ...this.newUserCredentials };
      this.$store.dispatch({ type: "signUpUser", credentials });
       this.newUserCredentials.userName = null;
      this.newUserCredentials.password = null;
      this.newUserCredentials.phone = null;
    },
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
  width: 100vw;
  position: fixed;
   z-index: -1;
}
.sign-background{
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
   z-index: -10;
}

.form-container{
  background-color: #a2f7b5;
  padding: 10px;
  border-radius: 5px;
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


