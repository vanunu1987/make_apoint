<template>
  <div class="user-appoints">
    <button @click="getUserAppoints">TEST</button>
  <div v-if="isOpen" class="appoints-card">
      <ul>
          <li v-for="appoint in appoints" :key="appoint._id">
              {{appoint.product.title}}<br>
              {{appoint.date}} At {{appoint.startTime}}<br>
              Approximatly {{appoint.product.duration}} Minutes<br>
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
        this.$store.dispatch({type:'loadAppoints',listRequire:'user'})
        .then(res =>{
            console.log('got ittt',res)
            this.isOpen = true
        } 
        )
    }
  },
  computed:{
    appoints(){
        return this.$store.getters.appointsList
    }
  }
};
</script>


<style scoped lang="scss">
.appoints-card{
    margin-top: 10px;
    height: 300px;
    width: 250px;
    padding: 5px;
    background: white;
    border-radius: 5px;
}

li{
    background-color: #a2f7b5;
    padding: 3px;
    margin-bottom: 5px;
}
</style>
