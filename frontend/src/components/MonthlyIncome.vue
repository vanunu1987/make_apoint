<script>

// import { Bar } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
 
export default {
//   extends: Bar,
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.data.dates,
      datasets: [
        {
          label: this.data.products,
        //   backgroundColor: '#f87979',
          data: this.data.productRevenues
        }
      ]
    })
  }
}
</script>