<template>
  <div class="row">
    <div>
      <input type="text" name="searchText" v-model="searchText" />
    </div>
  </div>
</template>

<script>
  import sortBy from 'lodash/sortBy'
  import map from 'lodash/map'
  import uniq from 'lodash/uniq'
  import find from 'lodash/find'

  export default {
    name: "ChartCompras",
    props: {
      dataset: Array
    },
    data: () => ({
      searchText: String
    }),
    computed: {
      comprasDiarias() {
        let data = sortBy(this.dataset, 'name')
        return data
      }
    }
  }

</script>