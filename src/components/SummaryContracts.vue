<template>
  <div class="row mb-5">
    <div class="col-12">
      
      <h1 class="pt-5 pb-5">Compras públicas durante la emergencia en Perú</h1>

      <div class="row">
        <div class="col-12 mb-3">
          <p> Contrataciones ante la Emergencia Sanitaria por la existencia del Coronavirus - [Organismo Supervisor de las Contrataciones del Estado (OSCE)] <a href="https://www.datosabiertos.gob.pe/dataset/contrataciones-ante-la-emergencia-sanitaria-por-la-existencia-del-coronavirus-organismo">Ir a la fuente</a>
          </p>
        </div>
      </div>

      <distritos-summary :dataset="rubrosByDistrito"></distritos-summary>

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
  import DistritosSummary from './DistritosSummary'

  export default {
    name: "SummaryContracts",
    props: {
      dataset: Array
    },
    components: {
      ChartCompras,
      DistritosSummary
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
      rubrosByDistrito() {
        return this.dataset
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
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "GOBIERNO LOCAL")
        
        return gobs
      },
      gobiernosRegionales() {
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "GOBIERNO REGIONAL")
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
        let gobs = filter(this.dataset, item => item.TIPOENTIDADOEE == "GOBIERNO NACIONAL")
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
            "name": moment(fecha),
            "y": item.length,
            "total": sum(map(item, 'MONTOADJUDICADOSOLES')).toFixed(2)
          }
          
        })
        
        return fechas
      }
    },
    methods: {
    }
  }
</script>