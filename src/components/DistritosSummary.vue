<template>
  <div class="row">
    <div class="col-12 mb-5">
      <h4>Y: Cantidad de compras, X: total en soles, agrupados por rubro y entidad</h4>
    </div>
    <div class="col-12 col-md-9">
      <highcharts :options="chartOptions"></highcharts>
    </div>
    <div class="col-12 col-md-3 filters">

      <b-form-group label="Filtrar por rubro">
        <b-form-checkbox
          v-bind:key="option.text"
          v-for="option in rubros"
          name="rubros-filter"
          v-model="rubroFilter"
          :options="rubros"
          :value="option.value"
          checked
        > <span :style="{'backgroundColor': colors[option.text] }" class="badge badge-light">{{ option.text }} - {{ option.total }}</span>
        </b-form-checkbox>
      </b-form-group>
  
    </div>
  </div>
</template>

<script>
  import { Chart } from 'highcharts-vue'
  import filter from 'lodash/filter'
  import map from 'lodash/map'
  import sum from 'lodash/sum'
  import uniq from 'lodash/uniq'
  import groupBy from 'lodash/groupBy'
  import sortBy from 'lodash/sortBy'

  export default {
    name: "DistritosSummary",
    components: {
      highcharts: Chart
    },
    data() {
      return {
        rubroFilter: uniq(map(this.dataset, 'RUBROS')),
        dataFilter: [],
        colors: {
          'Servicios': '#66c2a5',
          'Alimentos': '#fc8d62',
          'Medicamentos': '#8da0cb',
          'Material y Equipo Médico': '#e78ac3',
          'Protección, Aseo y Limpieza': '#a6d854',
          'Otros Bienes': '#ffd92f'
        }
      }
    },
    props: {
      dataset: Array
    },
    watch: {
      rubroFilter() {
        this.filterDataset()
      }
    },
    methods: {
      filterDataset(){
        this.dataFilter = filter(this.dataset, (item) => {
          if(this.rubroFilter.indexOf(item['RUBROS']) >= 0 ){
            return item
          }
          return false
        })
      }
    },
    computed: {
      rubros() {
        let rubros = sortBy(this.dataset, 'RUBROS')
        rubros = map(groupBy(rubros, 'RUBROS'), (item, value) => {

          return {
            "text": value,
            "value": value,
            "total": item.length,
          }
        })

        return rubros
      },
      comprasRubros() {

        this.filterDataset()

        let rubros = map(groupBy(this.dataFilter, 'RUBROS'), (item, value) => {

          let data = map(groupBy(item, 'RUC_ENTIDAD'), (item) => {
            return {
              x: (sum(map(item, 'MONTOREFERENCIAL'))),
              y: item.length,
              name: (uniq(map(item, 'ENTIDAD'))).join()
            }
          })

          return {
            turboThreshold: 10000,
            name: value,
            data: data,
            color: this.colors[value]
          }
        })

        return rubros 
      },
      chartOptions() {
        return {
          chart: {
            type: 'scatter',
            zoomType: 'xy'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          xAxis: {
            title: {
                enabled: true,
                text: 'Total en soles'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
          },
          yAxis: {
            title: {
              text: 'Cantidad de compras'
            }
          },
          legend:false,
          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                symbol: 'circle',
                states: {
                  hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                  }
                }
              },
              states: {
                hover: {
                  marker: {
                    enabled: false
                  }
                }
              },
              tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '<b>{point.name}</b><br>Total: S/. {point.x} en {point.y} de compras'
              }
            }
          },
          series: this.comprasRubros
        }

      }
    }
  }

</script>

<style lang="scss">
  
  .filters {
    font-size: 14px;
  }

</style>