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
      labels: this.data.dates,
      datasets: [
        {
          label: this.data.dates,
          backgroundColor: '#f87979',
          data: this.data.revenues
        }
      ]
    })
  }
}
</script>