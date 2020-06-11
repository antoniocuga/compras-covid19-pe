<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="pt-5 text-center pb-5">Compras públicas durante la emergencia en Perú</h1>
        <div class="row justify-content-center">
          <div class="text-center col-12 col-md-8 mb-3">
            <p> Contrataciones ante la Emergencia Sanitaria por la existencia del Coronavirus - [Organismo Supervisor de las Contrataciones del Estado (OSCE)] <a href="https://www.datosabiertos.gob.pe/dataset/contrataciones-ante-la-emergencia-sanitaria-por-la-existencia-del-coronavirus-organismo">Ir a la fuente</a>
            </p>
          </div>
        </div>
      </div>
    </div> 
    <div class="row">
      <div class="text-center col-12">
        <div class="alert alert-info" role="alert">
          Existen <strong>{{ dataset.length }}</strong> contrataciones directas por "Situación emergencia".
        </div>
      </div>
      <div class="col-12">
        <search :dataset="dataset"></search>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <summary-contracts :dataset="dataset"></summary-contracts>
      </div>
    </div>    
       
  </div>
</template>

<script>
  import BootstrapVue from 'bootstrap-vue'
  import "vue-select/dist/vue-select.css"
  import Vue from 'vue'
  import Vuex from 'vuex'
  import HighchartsVue from 'highcharts-vue'

  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  
  import Search from './components/Search'
  import SummaryContracts from './components/SummaryContracts'

  library.add(faDrumstickBite)

  Vue.use(BootstrapVue)
  Vue.use(Vuex)
  Vue.use(HighchartsVue)

  Vue.component('font-awesome-icon', FontAwesomeIcon)

  export default {
    name: "App",
    components: {
      Search,
      SummaryContracts,
    },
    computed: {
      dataset () {
        const data = require('./data/dataset.json')
        return data
      },
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap';
  @import '../node_modules/bootstrap-vue/src/index.scss';
</style>