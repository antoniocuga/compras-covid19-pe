<template>
  <div class="container">
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
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faTimes, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import get from 'lodash/get'

  import Search from './components/Search'

  library.add(faTimes)
  library.add(faPauseCircle)
  library.add(faPlayCircle)

  Vue.use(BootstrapVue)
  Vue.use(Vuex)

  Vue.component('font-awesome-icon', FontAwesomeIcon)

  export default {
    name: "App",
    components: {
      Search
    },
    computed: {
      dataset () {
        return require('./data/dataset.json')
      },
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap';
  @import '../node_modules/bootstrap-vue/src/index.scss';
</style>