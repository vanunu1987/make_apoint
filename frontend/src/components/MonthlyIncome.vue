<script>
// import { Bar } from 'vue-chartjs'
import { Line } from "vue-chartjs";

export default {
  //   extends: Bar,
  extends: Line,
  props: ["data", "options"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.data.dates,
      datasets: [
        {
          label: this.data.products,
          backgroundColor: "#3899ec",
          data: this.data.revenues
        }
      ]
    });
  },
  
};
</script>
<style lang="scss" scoped>
.chartjs-render-monitor {
  #line-chart {
    width: 660px;
  }
}
</style>