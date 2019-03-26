<template>
  <div v-if="currUser" class="user-appoints">
    <button @click="getUserAppoints">{{currUser.userName}}</button>
  <div v-if="isOpen" class="appoints-card">
      <ul>
          <li v-for="appoint in appoints" :key="appoint._id">
              <router-link :to="'business/'+appoint.business_id">
                {{appoint.product.title}}<br>
                {{appoint.timeToShow}}<br> At {{appoint.startTime}}<br>
                Approximatly {{appoint.product.duration}} Minutes<br>
              </router-link>
          </li>
      </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: "UserAppoints",
  props: {
  },
  data() {
    return {
        isOpen:false
    };
  },
  methods: {
    getUserAppoints(){
        if (this.isOpen) return this.isOpen = !this.isOpen
        this.$store.dispatch({type:'loadAppoints',listRequire:'user'})
        .then(res =>{
            console.log('got ittt',res)
            this.isOpen = !this.isOpen
            } 
        )
    }
  },
  computed:{
    currUser(){
        return this.$store.getters.loggedInUser
    },
    appoints(){
        var appoints =  this.$store.getters.appointsList
        appoints = appoints.map((appoint) => {
            var timeStamp = new Date(appoint.date)
            var day = timeStamp.getDay()
            switch (day){
                case 0:
                    day = 'Sunday'
                break;
                case 1:
                    day = 'Monday'
                break;
                case 2:
                    day = 'Tuesday'
                break;
                case 3:
                    day = 'Wednesday '
                break;
                case 4:
                    day = 'Thursday'
                break;
                case 5:
                    day = 'Fridayday'
                break;
                case 6:
                    day = 'Saturday '
                break;
            }
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        var month = months[timeStamp.getMonth()]
        var year = timeStamp.getFullYear()
        var timeToShow = day + ', ' +  month + ' ' + timeStamp.getDate() + ' ' + year
        appoint.timeStamp = timeStamp;
        appoint.timeToShow = timeToShow;
        console.log(appoint);
        return appoint
        })
    return appoints
    },
   
  }
};
</script>


<style scoped lang="scss">

.user-appoints {
    button{
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: #a2f7b5;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: none;
    outline: none;
    }
}
.appoints-card{
    position: absolute;
    right: 70px;
    top: 70px;
    height: 300px;
    width: 250px;
    padding: 5px;
    background: white;
    border-radius: 5px;
}

li{
    cursor: pointer;
    background-color: #a2f7b5;
    padding: 3px;
    margin-bottom: 5px;
}
</style>
