<template>
<section class="manage">
    <h1>IM HERE</h1>
    <!-- {{businessData}} -->
     <!-- <v-card class="mx-auto text-xs-center" color="green" dark max-width="600">
        <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline :value="revenues" :labels="dates" color="rgba(255, 255, 255, .7)" height="100"
                padding="24" stroke-linecap="round" smooth>
                    <template v-slot:label="item">
                        ${{ item.value }}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>

    <v-card-text>
      <div class="display-1 font-weight-thin">Sales</div>
    </v-card-text>

    <v-divider></v-divider>

  </v-card> -->
    <MonthlyIncome :data="{dates,revenues}" :height="200"/>
    <IncomeByProduct :data="{products,productRevenues}" :height="200"
    :backgroundcolor="mybackgroundcolor"
    :bordercolor="mybordercolor"
    :hoverbordercolor="myhoverbordercolor"/>


  <!-- <div id="chart">
      <apexchart type=area height=350 :options="chartOptions" :series="revenues" />
    </div> -->
</section>
</template>

<script>
import MonthlyIncome from '@/components/MonthlyIncome.vue'
import IncomeByProduct from '@/components/IncomeByProduct.vue'
export default {
  name: "BusinessManage",
  components: {
    MonthlyIncome,
    IncomeByProduct
  },
  data(){
      return{
           mybackgroundcolor : ['rgba(75,0,192,0.1)','rgba(0,88,88,0.1)','rgba(75,192,0,0.1)','rgba(75,192,192,0.1)'],
            mybordercolor : ['rgba(75,0,192,1)','rgba(0,88,88,1)','rgba(75,192,0,1)','rgba(75,192,192,1)'],
            myhoverbordercolor : ['rgba(75,0,192,1)','rgba(0,88,88,1)','rgba(75,192,0,1)','rgba(75,192,192,1)'],
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
.MonthlyIncome{
    height: 400px;
    width: 600px;
}
</style>

