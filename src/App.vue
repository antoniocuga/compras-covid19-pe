<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <summary-contracts :dataset="dataset"></summary-contracts>
      </div>
    </div>    
    <div class="row">
      <div class="col-12">
        <search :dataset="dataset"></search>
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
  import concat from 'lodash/concat'

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