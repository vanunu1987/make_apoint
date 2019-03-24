<template>
  <div class="about">
    <h1>About Us</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum incidunt est, officiis accusamus voluptates expedita nam fuga error, inventore harum dolores alias autem exercitationem fugiat! Ea rerum tenetur pariatur obcaecati?
    </p>
    <button @click="showCalendar = !showCalendar">Add appoint</button>
 <div  v-if="showCalendar">
        <business-calendar @closecalendar ="closeCalendar" ></business-calendar>
    </div>

  </div>
</template>

<script>
import BusinessCalendar from '../components/BusinessCalendar.vue'
export default {
  components:{
    BusinessCalendar
  },
  data(){
    return{
      showCalendar:false,
    }
  },
  methods:{closeCalendar(){
          this.showCalendar = false
        }
  }
}
</script>
