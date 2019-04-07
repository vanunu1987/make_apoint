<script>

// import { Bar } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'
 
export default {
//   extends: Bar,
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.data.products,
      datasets: [
        {
          label: this.data.products,
          backgroundColor: ['#f87979','#3899ec'],
          data: this.data.productRevenues
        }
      ]
    })
  },
  watch: {
 data(){
   console.log('change',this.data);
    this.renderChart({
      labels: this.data.products,
      datasets: [
        {
          label: this.data.products,
          backgroundColor: ['#f87979','#3899ec'],
          data: this.data.productRevenues
        }
      ]
    })
   
 }
   }
}
</script>

<style lang="sass" scoped>

</style>
