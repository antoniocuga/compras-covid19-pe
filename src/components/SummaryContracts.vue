<template>
  <div class="row mb-5">
    <div class="col-12">
      
      <h1>Compras durante la emergencia</h1>

      <div class="row">
        <div class="col-6" v-bind:key="rubro.rubro" v-for="rubro in rubros">          
          <div><strong>{{ rubro.rubro }}: </strong> {{ rubro.total | currency('S/ ') }}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

  import groupBy from 'lodash/groupBy'
  import map from 'lodash/map'
  import sum from 'lodash/sum'
  import sortBy from 'lodash/sortBy'

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
            "total": sum(map(item, 'MONTOADJUDICADOSOLES'))
          }
        })
        
        return rubros
      }
    },
    methods: {
    }
  }
</script>