<template>
  <div class="row mb-5">
    <div class="col-12">
      
      <h1>Compras durante la emergencia</h1>

      <div class="row">
        <div class="col-6" v-bind:key="rubro.rubro" v-for="rubro in rubros">          
          <div><label>{{ rubro.rubro }}: </label> S/.{{ rubro.total }}</div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <h2>Gobiernos Locales</h2>
          <div>{{ gobiernosLocales }}</div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <h2>Gobiernos Regionales</h2>
          <div>{{ gobiernosRegionales }}</div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <h2>Gobierno Nacional</h2>      
          <div>{{ gobiernosNacional }}</div>
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

  export default {
    name: "SummaryContracts",
    props: {
      dataset: Array
    },
    computed: {
      rubros() {
        let rubros = sortBy(this.dataset, 'RUBROS')
        rubros = map(groupBy(rubros, 'RUBROS'), (item, value) => {
          return {
            "rubro": value,
            "total": this.formatPrice((sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2))
          }
        })
        
        return rubros
      },
      objectos() {
        let objectos = sortBy(this.dataset, 'OBJETOCONTRACTUAL')
        objectos = map(groupBy(objectos, 'OBJETOCONTRACTUAL'), (item, value) => {
          return {
            "objectos": value,
            "total": this.formatPrice((sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2))
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
            "total": this.formatPrice((sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2))
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
            "total": this.formatPrice((sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2))
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
            "total": this.formatPrice((sum(map(item, 'MONTOADJUDICADOSOLES'))).toFixed(2))
          }
        })
        
        return orderBy(gobs, 'count', 'desc')
      },
      numberContracts() {
        const fechas = map(groupBy(this.dataset, 'FECHACONVOCATORIA'), (item, fecha) => {
          return {
            "fecha": moment(fecha, "DD-MM-YY"),
            "total": item.length
          }
        })

        return fechas
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }
  }
</script>