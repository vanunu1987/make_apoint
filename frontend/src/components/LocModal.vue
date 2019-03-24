<template>
  <div class="ModalContiner">
    <div class="modalMain">
      <input type="text" v-model="adrres" placeholder="your full adrres">
      <button @click="saveAdrres">save</button>
    </div>
  </div>
</template>
<script>
import UtilService from '@/services/UtilService.js'
export default {
    data(){
        return{
            adrres: '',
            loc:{}
        }
    },
    methods:{
        saveAdrres(){
            let addressloc= UtilService.getLocationByAdrres(this.adrres)
             return addressloc
             .then(res=>{
        console.log('loc',res);
        this.loc=res
            this.$store.dispatch({ type: "saveAdrres", loc:res })
        })
        .then(()=>{
            this.$emit('setMap',this.adrres)
        })
             }
    },
    components:{
        UtilService
    }
}
</script>

<style lang="scss" >
.ModalContiner {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #f0ffff4d;
  justify-content: center;
  align-items: center;
  .modalMain {
    height: 50vw;
    width: 50vw;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
