<template>
<section class="manage">
    <!-- <div class="mainContiner"> -->
    <business-page class="business-page"/>
    <div class="product">
    <h2>Product distribution</h2>
    <IncomeByProduct :data="{products,productRevenues}" :height="200" :width="460"
    :backgroundcolor="mybackgroundcolor"
    :bordercolor="mybordercolor"
    :hoverbordercolor="myhoverbordercolor"/>
    </div>
    <!-- </div> -->
    <div class="mothlyRev">
    <h2>Day's revenues distribution</h2>
    <MonthlyIncome :data="{dates,revenues}" :height="100"/>
    </div>
    <div class="revenue">
        <h2>Total Revenue</h2>
        <div class="month">
         <h2>month:</h2>
        <select  v-model="selctedMonth">
            <option v-for="(month,idx) in monthsToShow " 
            :key="idx"
           >
           {{month[0]}}
            </option>
        </select>
        </div>
        <h2 class="amount" v-if="businessData">{{revenueByMonth}}$</h2>
    </div>
    <div class="userCount">
        <h2>Users</h2>
        <h2 class="count">20</h2>

    </div>
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
           months:[{January:"01"},{February:"02"},{March:"03"},{April:"04"},{May:"05"},{June:"06"},{July:"07"},{August:"08"},{September:"09"},{October:"10"},{November:"11"},{December:"12"}],
            selctedMonth:'March'
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
    revenueByMonth(){
        var sum = 0;
           this.businessData.byDate.filter((data)=>data._id.substr(5, 2)=== this.monthFormated).forEach((filtered)=>{
           sum+= filtered.total   
           })
           return sum
        },
    monthsToShow(){
       return this.months.map((m)=>Object.keys(m))
    },
    monthFormated(){
       let month= this.months.find((m)=>Object.keys(m)[0]===this.selctedMonth)
       console.log(this.selctedMonth);
       console.log(Object.values(month)[0]);
       
       return Object.values(month)[0]
    }    
   
  },
  created(){
      this.$store.dispatch('loadBusinessData')
  },
};
</script>

<style lang="scss" scoped>
.manage{
//   background-color: #f0f4f7;
  display: grid;
  grid-template-columns: 1fr 2fr .5fr 1px;
  grid-template-rows: 15px .5fr .7fr 1fr 0.5fr;
  grid-gap: 10px 20px;
  // padding: 20px;
  .business-page {
    grid-column: 1;
    grid-row: 2/5;
    padding: 5px;
    border-radius: 5px;
    background-color: #23263e;
    margin: 0px;
  }
  .product{
    grid-column: 2;
    grid-row: 2;
    background-color: #f5f2f2;

  }
  .mothlyRev{
    grid-column: 2;
    grid-row: 3;
    background-color: #f5f2f2;

  }
  .revenue{
   grid-column: 3;
    grid-row: 2;
    background-color: #f5f2f2;   
    // margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .amount{
        font-size: 2.5rem;
    }
  }
    .userCount{
   grid-column: 3;
    grid-row: 3;
    background-color: #f5f2f2;   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .count{
        font-size: 2.5rem;

    }
    }


}
.month{
    display: flex;

    h2{
        margin-right: 20px;
        margin-left: 25px;
    }
    
}
.mainContiner{
    // display: flex;
}
.product,.mothlyRev{
   display: flex;
    flex-direction: column;  
}
select{
    &:focus{
    outline: none;

    }
}
</style>

