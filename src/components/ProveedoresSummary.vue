<template>
  <div class="row">
    <div class="col-12">
      <div class="row proveedores-explore">
        <div class="col-12 mt-5 mb-5">
          <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="proveedordetail" v-if="proveedor ">
          <button class="small btn btn-cerrar" @click="proveedor=false">Cerrar</button>
          <span class="badge badge-light">{{ proveedor.ruc }}</span>
          <p>{{ proveedor.name }}</p>
          <div class="proveedorcontratos">
            <div class="row mb-3" v-for="(contrato, index) in proveedor.contratos" v-bind:key="`${contrato.RUCPROVEEDOR}_${contrato.CODIGOENTIDAD}_${contrato.CODIGOCONVOCATORIA}_${index}`">
            <div class="col-12"><h3>{{ contrato.MONTOREFERENCIALSOLES | currency("S/. ") }}</h3></div>
            <div class="col-12"><b>{{ contrato.ENTIDAD }}</b></div>
            <div class="col-12"><a target="_blank" :href="contrato.URLFICHAPROCESO">Link al proceso</a></div>
            <div class="col-12 small">{{ contrato.DESCRIPCION_PROCESO }}</div>            
          </div>
          </div>
          
        </div>
      </div>
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

  import Vue from "vue";
  
  export const EventBus = new Vue()

  export default {
    name: "ProveedoresSummary",
    components: {
      highcharts: Chart
    },
    data() {
      return {
        proveedores: (uniq(map(this.dataset, 'PROVEEDOR'))),
        proveedor: false
      }
    },
    props: {
      dataset: Array
    },
    mounted() {
      EventBus.$on("showProveedor", point => {
        if(point.ruc)
          this.showProveedor(point.name, point.ruc)
      });
    },
    methods: {
      showProveedor(name, ruc) {
        const data = filter(this.dataset, ['RUCPROVEEDOR', ruc])
        this.proveedor = {
          name: name,
          ruc: ruc,
          contratos: data
        }
      }
    },
    computed: {
      compras() {
        let compras = sortBy(this.dataset, 'RUCPROVEEDOR')
        compras = map(groupBy(compras, 'RUCPROVEEDOR'), (item, value) => {
          return {
            name: (uniq(map(item, 'PROVEEDOR'))).join(),
            ruc: value,
            y: item.length,
            x: (sum(map(item, 'MONTOREFERENCIALSOLES'))),
          }
        })
        return compras
      },
      proveedoresSummary() {
        return [{
          name: "Proveedor",
          data: this.compras,
          turboThreshold: 10000,
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
                lineColor: '#0c5460',
                lineWidth: 1,
                fillColor: '#d1ecf169',
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
                    enabled: true
                  }
                }
              },
              tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: `<b>{point.name}</b><br>Total: S/. {point.x} en {point.y} contratos <br /> Click para ver detalle` 
              }
            },
            series: {
              turboThreshold: 10000,
              point: {
                events: {
                  click(e) {
                    EventBus.$emit("showProveedor", e.point);
                  } 
                }
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

  .proveedores-explore {
    position: relative;
  }

  .proveedordetail {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 360px;
    overflow: hidden;
    background: #d2d4d696;
    padding: 10px;
  }

  .btn-cerrar {
    position: absolute;
    right: 15px;
  }

  .proveedorcontratos {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 360px;
  }

</style>