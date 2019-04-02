<template>
<section class="manage">
    <div class="mainContiner">
    <business-page/>
    <div class="product">
    <h2>Product distribution</h2>
    <IncomeByProduct :data="{products,productRevenues}" :height="300" :width="660"
    :backgroundcolor="mybackgroundcolor"
    :bordercolor="mybordercolor"
    :hoverbordercolor="myhoverbordercolor"/>
    </div>
    </div>
    <h2>Day's revenues distribution</h2>
    <MonthlyIncome :data="{dates,revenues}" :height="100"/>

</section>
</template>

<script>
import MonthlyIncome from '@/components/MonthlyIncome.vue'
import IncomeByProduct from '@/components/IncomeByProduct.vue'
import BusinessPage from '@/views/BusinessPage.vue'
export default {
  name: "BusinessManage",
  components: {
    MonthlyIncome,
    IncomeByProduct,
    BusinessPage
  },
  data(){
      return{
           mybackgroundcolor : ['rgba(75,0,192,0.1)','rgba(0,88,88,0.1)','rgba(75,192,0,0.1)','rgba(75,192,192,0.1)'],
            mybordercolor : ['rgba(75,0,192,1)','rgba(0,88,88,1)','rgba(75,192,0,1)','rgba(75,192,192,1)'],
            myhoverbordercolor : ['rgba(75,0,192,1)','rgba(0,88,88,1)','rgba(75,192,0,1)','rgba(75,192,192,1)'],
            // height:100,
           

      }
  },
  computed: {
    businessData(){
        return this.$store.getters.businessData
    },
    revenues(){
        if (!this.businessData) return 
        return this.businessData.byDate.map((bus) => {
            return bus.total
        })
    },
    dates(){
        if (!this.businessData) return 
        return this.businessData.byDate.map((bus) => {
            return bus._id
        })
    },
    productRevenues(){
        if (!this.businessData) return 
        return this.businessData.byProduct.map((bus) => {
            return bus.total
        })
    },
    products(){
        if (!this.businessData) return 
        return this.businessData.byProduct.map((bus) => {
            return bus._id
        })
    },
   
  },
  created(){
      this.$store.dispatch('loadBusinessData')
  },
};
</script>

<style lang="scss" scoped>
.manage{
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    h1{
        margin-top: 100px;
    }
}
.mainContiner{
    display: flex;
}
.product{
   display: flex;
    flex-direction: column;  
}
</style>

