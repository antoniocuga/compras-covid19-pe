<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import { Chart } from 'highcharts-vue'
  import sortBy from 'lodash/sortBy'
  import map from 'lodash/map'
  import uniq from 'lodash/uniq'
  import moment from 'moment'

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
        let data = sortBy(this.dataset, 'name')
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
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>' + 'Total: <b>{point.total}</b><br/>',
            shared: true
          },
          xAxis: {        
            categories: uniq(map(this.comprasDiarias, 'name')),
            labels: {
              formatter: function() {
                return moment(this.value).format("DD-MM-YYYY")
              }
            }
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
            name: 'Compras',
            data: this.comprasDiarias,
            color: "#d4edda"
          }]
        }

      }
    }
  }

</script>