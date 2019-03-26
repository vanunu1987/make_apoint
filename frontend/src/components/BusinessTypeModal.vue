<template>
  <div class="ModalContiner">
    <div class="modalMain">
        <select  v-model="selctedType">
            <option v-for="(type,idx) in businessType " 
            :key="idx"
           >
           {{type}}
            </option>
        </select>
      <button @click="saveType">save</button>
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
        saveType(){
            this.$emit("saveType", this.selctedType )

        }
    },
    components:{
        UtilService
    },
    created(){
            
                this.businessType=this.$store.getters.businessTypes
            

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
