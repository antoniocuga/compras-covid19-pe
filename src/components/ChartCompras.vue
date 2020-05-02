<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import { Chart } from 'highcharts-vue'
  import orderBy from 'lodash/orderBy'
  import map from 'lodash/map'
  import uniq from 'lodash/uniq'

  export default {
    name: "ChartCompras",
    components: {
      highcharts: Chart
    },
    props: {
      dataset: Array
    },
    computed: {
      comprasDiarias() {
        let data = orderBy(this.dataset, 'name')
        return data
      },
      chartOptions() {
        return {
          title: {
              text: ''
          },
          subtitle: {
              text: 'Contratos convocados por día'
          },
          xAxis: {        
            categories: uniq(map(this.comprasDiarias, 'name'))
          },
          yAxis: {
            title: {
              text: 'Cantidad de compras diarias'
            },
            min: 0
          },
          legend: {
            enabled: false
          },
          series: [{
            type: "column",
            data: this.comprasDiarias,
            color: "#d4edda"
          }]
        }

      }
    }
  }

</script>