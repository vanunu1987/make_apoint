<template>
  <div class="login">
    <div class="sign-background"></div>
    <section class="form-container">
    <form v-if="!isNewUser" @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" placeholder="User Name" v-model="userCredentials.userName">
      <input type="password" placeholder="Password" v-model="userCredentials.password">
      <button type="submit">Continue</button>
    </form>
    <form v-if="isNewUser" @submit.prevent="signup">
      <h1>Signup</h1>
      <input type="text" placeholder="User Name" v-model="newUserCredentials.userName">
      <input type="password" placeholder="Password" v-model="newUserCredentials.password">
      <input type="tel" placeholder="Phone Number" v-model="newUserCredentials.phone">
      <button type="submit">Continue</button>
    </form>
    <button @click="isNewUser = !isNewUser">{{(!isNewUser)  ? 'New User' : 'Existing User'}}</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "loginSignup",
  props:['isNewUserProp',"isNewBus"],
  components: {},
  data() {
    return {
      isNewUser:null,
      userCredentials: {
      userName: null,
      password: null
      },
      newUserCredentials: {
        userName: null,
        password: null,
        phone:null,
        isReg:false
      },
    };
  },
 
  methods: {
    login() {
      console.log(this.userCredentials);
      var credentials = { ...this.userCredentials };
      this.$store.dispatch({ type: "loginUser", credentials });
      this.userCredentials.userName = null;
      this.userCredentials.password = null;
      this.$emit('routeHome')
    },
    signup() {
      console.log(this.newUserCredentials);
      this.newUserCredentials.isReg = true;
      var credentials = { ...this.newUserCredentials };
      this.$store.dispatch({ type: "signUpUser", credentials,isNewBusiness: this.isNewBus })
      .then(() => {
        this.$emit('closeSignUp')
        this.$emit('routeHome')
      })
      this.newUserCredentials.userName = null;
      this.newUserCredentials.password = null;
      this.newUserCredentials.phone = null;
    },
    routeHome(){
      this.$emit('routeHome')
    }
  },
  created() {
    console.log(this.isNewUserProp);
    
      this.isNewUser = this.isNewUserProp
  }
};
</script>

<style lang="scss" scoped>

@font-face{
    font-family: AirbnbCereal;
    src: url('../assets/fonts/AirbnbCereal-Book.ttf')

}
*{
    font-family: 'AirbnbCereal', sans-serif;
}

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
  padding: 10px;
  border-radius: 3px;
  border: 2px solid #a2f7b5;
  height: 400px;
  width: 300px;
  background-color: white;
}
form {
  height: 90%;
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
button{
  background-color: #a2f7b559;
  padding: 5px;
  border-radius: 3px;
  width: 100%;
}
</style>


