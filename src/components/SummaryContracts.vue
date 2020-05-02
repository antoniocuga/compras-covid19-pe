<template>
  <div class="row mb-5">
    <div class="col-12">
      
      <h1 class="mb-5">Compras públicas durante la emergencia en Perú</h1>

      <div class="row">
        <div class="col-6 mb-3" v-bind:key="rubro.rubro" v-for="rubro in rubros">          
          <div><strong>{{ rubro.rubro }}: </strong> {{ rubro.total | currency('S/ ') }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mb-3">
          <chart-compras :dataset="numberContracts"></chart-compras>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

  import groupBy from 'lodash/groupBy'
  import filter from 'lodash/filter'
  import map from 'lodash/map'
  import sum from 'lodash/sum'
  import sortBy from 'lodash/sortBy'
  import orderBy from 'lodash/orderBy'
  import moment from 'moment'
  import ChartCompras from './ChartCompras'

  export default {
    name: "SummaryContracts",
    props: {
      dataset: Array
    },
    components: {
      ChartCompras
    },
    computed: {
      rubros() {
        let rubros = sortBy(this.dataset, 'RUBROS')
        rubros = map(groupBy(rubros, 'RUBROS'), (item, value) => {
          return {
            "rubro": value,
            "total": sum(map(item, 'MONTOADJUDICADOSOLES'))
          }
        })
        
        return rubros
      },
      objectos() {
        let objectos = sortBy(this.dataset, 'OBJETOCONTRACTUAL')
        objectos = map(groupBy(objectos, 'OBJETOCONTRACTUAL'), (item, value) => {
          return {
            "objectos": value,
            "total": (sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2)
          }
        })
        
        return objectos
      },
      gobiernosLocales() {
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "Gobierno Local")
        gobs = map(groupBy(gobs, 'ENTIDAD'), (item, value) => {
          return {
            "distrito": `${value}` ,
            "count": item.length,
            "total": (sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2)
          }
        })
        
        return orderBy(gobs, 'count', 'desc')
      },
      gobiernosRegionales() {
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "Gobierno Regional")
        gobs = map(groupBy(gobs, 'ENTIDAD'), (item, value) => {
          return {
            "region": `${value}` ,
            "count": item.length,
            "total": (sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2)
          }
        })
        
        return orderBy(gobs, 'count', 'desc')
      },
      gobiernosNacional() {
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "Gobierno Nacional")
        gobs = map(groupBy(gobs, 'ENTIDAD'), (item, value) => {
          return {
            "region": `${value}` ,
            "count": item.length,
            "total": sum(map(item, 'MONTOADJUDICADOSOLES')).toFixed(2)
          }
        })
        
        return orderBy(gobs, 'count', 'desc')
      },
      numberContracts() {
        const fechas = map(groupBy(this.dataset, 'FECHACONVOCATORIA'), (item, fecha) => {
          return {
            "name": fecha,
            "y": item.length
          }
          
        })
        
        return fechas
      }
    },
    methods: {
    }
  }
</script>