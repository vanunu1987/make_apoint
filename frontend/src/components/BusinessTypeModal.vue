<template>
  <div class="ModalContiner">
    <div class="modalMain">
        <h2>Pick your business type</h2>
        <select  v-model="selctedType">
            <option value="">Busines type</option>
            <option v-for="(type,idx) in businessType " 
            :key="idx"
           >
           {{type}}
            </option>
            
        </select>
        <div @click="saveType" class="save">
      <button >save</button>
      <span class="fas fa-save"></span>
      </div>
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
            
                this.businessType=this.$store.getters.BusinessTypes
                console.log(this.businessType);
                

    }
}
</script>

<style lang="scss"  >
.ModalContiner {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #131919ba;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .modalMain {
  box-shadow: 4px 3px 14px 2px rgba(0, 0, 0, 0.75);
    height: 30vh;
    width: 25vw;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    
  }

  select{
      text-align: center;
       &:focus {
      text-align: center;
    outline: none;
    // background-color: #131919ba;
    // border: dashed;
    
  }
  }
}
.save{
    display: flex;
    justify-content: center;
    align-items: baseline;
    span{
        margin-left: 5px;
    }
    cursor: pointer;

}
button{
    margin-top: 10px;
}
select{
    cursor: pointer;
}
</style>
