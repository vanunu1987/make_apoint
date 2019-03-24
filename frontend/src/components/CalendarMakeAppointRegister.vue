<template>
<section>
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
    data(){
        return {
            name:'',
            phone:''
        }
    },
    computed:{
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
