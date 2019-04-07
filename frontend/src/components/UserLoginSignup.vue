<template>
  <div @click.stop>
    <section class="form-container">
    <form v-if="!isNewUser" @submit.prevent="login">
      <header>
      <h1>Login</h1>
     <div> <input type="text" placeholder="User Name" v-model="userCredentials.userName"><i class="fas fa-user"></i></div>
     <div><input type="password" placeholder="Password" v-model="userCredentials.password"><i class="fas fa-lock"></i></div>
     </header>
      <button type="submit">Log in</button>
    </form>
    <form v-if="isNewUser" @submit.prevent="signup">
      <header>
      <h1>Signup</h1>
     <div> <input type="text" placeholder="User Name" v-model="userCredentials.userName"><i class="fas fa-user"></i></div>
     <div><input type="password" placeholder="Password" v-model="userCredentials.password"><i class="fas fa-lock"></i></div>
     <div><input type="tel" placeholder="Phone Number" v-model="newUserCredentials.phone"><i class="fas fa-phone"></i></div>
     </header>
      <button type="submit">Sign up</button>
    </form>
    <span>{{(!isNewUser)  ? 'Don’t' : 'Already'}}</span>
    <span> have an account? </span>
    <a @click="isNewUser = !isNewUser">{{(!isNewUser)  ? 'Sign up' : 'Log in'}}</a>
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
      var credentials = { ...this.userCredentials };
      this.$store.dispatch({ type: "loginUser", credentials });
      this.userCredentials.userName = null;
      this.userCredentials.password = null;
      this.$emit('loggedIn')
    },
    signup() {
      this.newUserCredentials.isReg = true;
      var credentials = { ...this.newUserCredentials };
      this.$store.dispatch({ type: "signUpUser", credentials,isNewBusiness: this.isNewBus })
      .then(() => {
        this.$emit('closeSignUp')
        this.$emit('signedUp')
      })
      this.newUserCredentials.userName = null;
      this.newUserCredentials.password = null;
      this.newUserCredentials.phone = null;
    },
  },
  created() {
      this.isNewUser = this.isNewUserProp
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

h1 {
  margin-bottom: 30px;
  text-align:left;
  font-size:30px;
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
.form-container{
  padding: 20px;
  height: 400px;
  width: 300px;
  background-color: white;
}
form {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div:focus-within{
   border-color:$primary-color;
  }
  div{
    padding:5px;
    border:1px solid black;
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:10px;
    border-radius: 5px;

    i{
      margin-right:5px;
    }
  }
  input {
    height: 25px;
    border-radius: 5px;
    width: 100%;
    outline:none;
  }
}
button{
  margin-bottom:12px;
  background-color: $primary-color;
  color: white;
  padding: 15px;
  border-radius: 3px;
  width: 100%;
  &:hover{
    background-color: $primary-color-light;
  }
}
</style>


