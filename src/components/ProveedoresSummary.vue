<template>
  <div class="row">
    <div class="col-12 mt-5 mb-5">
      <h4>Cantidad de contrataciones por proveedor en diversos rubros y a diferentes entidades.</h4>
      <p>A la fecha el gobierno a contratado con <b>{{ proveedores.length }}</b> empresas a nivel nacional. Algunas han brindado servicios a más de una entidad. Explora la cantidad de contratos adjudicados, el monto contrado y en que rubros se realizaron las compras.</p>
      <p>Contratos publicados entre el {{ desde }} hasta {{ hasta }}</p>
      <highcharts :options="chartOptions"></highcharts>
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
  import min from 'lodash/min'
  import max from 'lodash/max'

  export default {
    name: "ProveedoresSummary",
    components: {
      highcharts: Chart
    },
    data() {
      return {
        proveedores: (uniq(map(this.dataset, 'PROVEEDOR'))),
        desde: (min(map(this.dataset, 'FECHACONVOCATORIA'))),
        hasta: (max(map(this.dataset, 'FECHACONVOCATORIA'))),
      }
    },
    props: {
      dataset: Array
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
      compras() {
        let compras = sortBy(this.dataset, 'RUCPROVEEDOR')
        compras = map(groupBy(compras, 'RUCPROVEEDOR'), (item) => {
          return {
            name: (uniq(map(item, 'PROVEEDOR'))).join(),
            rubros: (uniq(map(item, 'RUBROS'))).join(", "),
            entidades: (uniq(map(item, 'ENTIDAD'))).join("<br>"),
            y: item.length,
            x: (sum(map(item, 'MONTOADJUDICADOSOLES'))),
          }
        })
        return compras
      },
      proveedoresSummary() {
        return [{
          name: "Proveedor",
          data: this.compras,
          turboThreshold: this.compras.length,
        }]
      },
      chartOptions() {
        return {
          chart: {
            type: 'scatter',
            zoomType: 'xy'
          },
          boost: {
            useGPUTranslations: true,
            usePreAllocated: true
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
              text: 'Cantidad de contratos'
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
                pointFormat: `<b>{point.name}</b><br>Total: S/. {point.x} en {point.y} contratos <br /> Rubro(s): {point.rubros}<br>Entidades: {point.entidades}` 
              }
            }
          },
          series: this.proveedoresSummary
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