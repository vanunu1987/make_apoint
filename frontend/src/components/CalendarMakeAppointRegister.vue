<template>
<section>
    <h1>{{payload}}</h1>
    <h1>{{event.title}}</h1>
    <h1>{{event.date}}</h1>
    <h1>{{event.time}}</h1>
    <h1>{{event.duration}}</h1>
<h1>not a user!</h1>
<h1>register:</h1>
<h1> or give details:</h1>
 <v-text-field
      v-model="name"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
     <v-text-field
      v-model="phone"
      :counter="10"
      label="phone"
      required
    ></v-text-field>

</section>
</template>

<script>
export default {
    props:['payload'],
    data(){
        return {
            name:'',
            phone:''
        }
    },
    computed:{
        event(){
            return this.payload.event
        },
        user(){
            return {
                userName:this.name,
                phone:this.phone,
                pass:null,
                appoints_id:[],
                business_id:null
            }
        }
    }
}
</script>
