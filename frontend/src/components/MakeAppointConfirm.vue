

<template>
  <section class="make-appoint-confirm">
    <img src="../assets/confirm-background.png" alt>
    <main>
    <h1>Almost there!</h1>
    <h1 style="text-decoration:underline;">Confirm appointment details:</h1>
    <div>
      <span>{{appoint.product.title | capitalize}}</span>
      <span class="icon">
        <i class="fas fa-chevron-circle-left"></i>
      </span>
    </div>
    <div>
      <span>{{appoint.date }}</span>
      <span class="icon">
        <i class="far fa-calendar-alt"></i>
      </span>
    </div>
    <div>
      <span>{{appoint.startTime}}</span>
      <span class="icon">
        <i class="far fa-clock"></i>
      </span>
    </div>
    <div>
      <span>{{appoint.product.duration | hours}} total</span>
      <span class="icon">
        <i class="far fa-hourglass"></i>
      </span>
    </div>
    <div>
      <span>{{appoint.product.price | dollar}}</span>
      <span class="icon">
        <i class="fas fa-money-bill-wave"></i>
      </span>
    </div>
    <button @click="sendAddAppoint">confirm</button>
    </main>
  </section>
</template>

<script>
export default {
  props: ["appoint"],
  created() {
    //  this.$swal({
    //    title: "Appointment details :",
    //    text: this.appoint.product.title + '\n' + this.appoint.date  + ' At ' + this.appoint.startTime + '\n Price: ' + this.appoint.product.price + '$',
    //    // icon: "success",
    //    buttons: [true,"Confirm"]
    //    // button: "Confirm",
    //  }).then((res) => {
    //    console.log('Clicked: ',res);
    //    if (res) this.sendAddAppoint()
    //    else this.moveToCmp('MakeAppointTimeDatePicker')
    //  })
  },
  methods: {
    moveToCmp(cmpName) {
      this.$emit("set-cmp", cmpName);
    },
    updateAppoint(payload) {
      console.log(
        "update appoint recevied in MakeAppointConfirm cmp with this payload",
        payload
      );
      this.$emit("update-appoint", payload);
    },
    sendAddAppoint() {
      this.$emit("make-appoint");
      this.$emit("set-cmp", "MakeAppoint6");
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/fonts.scss";

.make-appoint-confirm {
  main{
    z-index:1;
  }
  width: 400px;
  margin-left: 250px;
  img {
    position: fixed;
    right: 0;
    top: 56px;
    width: 547px;
  }
  // background-image: url('../assets/confirm-background.png');
  // background-repeat: no-repeat;
  // background-size: contain;
 
  h1 {
    font-weight: 100;
    text-align: left;
    font-family: AirbnbCereal-black;
    margin-bottom: 5px;
     font-size: 25px;

  }
  div {
    font-family: AirbnbCereal-light;
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom:5px;
  }
  span.icon{
    font-size:20px;
  }
  
  height: 100%;
  button {
    margin-top: 58px;
     font-size: 25px;
    width: 100%;
    // height: 48px;
    border-radius: 3px;
    background-color: $secondary-color;
    opacity: 0.9;
    color: white;
    &:hover{
      background-color: darken($secondary-color,10%);
    }
  }
}
</style>

