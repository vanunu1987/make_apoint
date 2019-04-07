<template>
  <div class="ModalContiner">
    <div class="modalMain">
        <h1 class="h1Title">Congratulations !</h1>
        <h2> Enjoy your business link:</h2>
        <h3>https://make-appoint.herokuapp.com/0/business/{{currBusiness._id}}</h3>
      <button @click="savePath">Done</button>
    </div>
  </div>
</template>
<script>
import UtilService from '@/services/UtilService.js'
export default {
    data(){
        return{
            businessType:[],
            selctedType:''
        }
    },
    methods:{
        savePath(){
            this.$router.push('/business/' + this.currBusiness._id)
        }
    },
    components:{
    },
    created(){
            
                this.currBusiness=this.$store.getters.currBusiness
                // console.log(this.businessType);
                

    }
}
</script>

<style scoped lang="scss"  >
.ModalContiner {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #131919ba;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modalMain {
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
    height: 15vw;
    width: 45vw;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3{
        margin-top: 5px;
    }
    button{
    font-size: 1.2rem;
    padding: 0 17px;
    border-radius: 15px;
    border: 0.8px solid #42b983;
    color: white;
    background-color: #42b983;
    }
  }

  select{
      text-align: center;
       &:focus {
      text-align: center;
    outline: none;
    border: dashed;
  }
  }
}
button{
    margin-top: 10px;
}
.h1Title{
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 10px;
}

</style>
