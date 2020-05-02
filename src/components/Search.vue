<template>
  <div class="row">
    <div class="col-12">

      <div class="row my-3">
        <div class="col-4">
          <v-select class="vue-select2" :options="departments" placeholder="Todos los departamentos" @input="filterDepartment"></v-select>
        </div>
        <div class="col-4">
          <v-select class="vue-select2" :options="entidades" placeholder="Todas las entidades" @input="filterEntidad"></v-select>
        </div>
        <div class="col-4">
          <v-select class="vue-select2" :options="rubros" placeholder="Todas los rubros" @input="filterRubros"></v-select>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="alert alert-success" role="alert">
            Se encontraron <strong>{{ contracts.length }} de contrataciones</strong>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <contracts :dataset="contracts"></contracts>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
  import filter from 'lodash/filter'
  import map from 'lodash/map'
  import sortBy from 'lodash/sortBy'
  import uniq from 'lodash/uniq'
  import { mapMutations, mapState } from 'vuex'
  import Contracts from './Contracts'

  export default {
    name: "Search",
    data() {
      return {
        contracts: Array,
      }
    },
    props: {
      dataset: Array
    },
    components: {
      Contracts
    },
    beforeMount() {
      this.contracts = sortBy(this.dataset, ['MONTOADJUDICADOSOLES'], ['desc'])
    },
    computed: {
      ...mapState(['selectedDepartment', 'selectedEntidad', 'selectedRubro']),
      departments() {
        return this.fieldDataset(this.dataset, 'ENTIDAD_DEPARTAMENTO')
      },
      entidades() {
        return this.fieldDataset(this.contracts, 'ENTIDAD')
      },
      rubros() {
        return this.fieldDataset(this.contracts, 'RUBROS')
      }
    },
    methods: {
      ...mapMutations(['setSelectedEntidad', 'setSelectedDepartment', 'setSelectedRubro']),
      fieldDataset (data, field) {
        data = sortBy(data, field)
        return uniq(map(data, field))
      },
      filterDataset () {
        this.contracts = sortBy(this.dataset, ['MONTOADJUDICADOSOLES'], ['desc'])
        this.contracts = filter(this.contracts, item => {
        
          let condition = true;
          if (this.selectedDepartment) {
            condition = condition && item.ENTIDAD_DEPARTAMENTO == this.selectedDepartment 
          }

          if (this.selectedRubro) {
            condition = condition && item.RUBROS == this.selectedRubro
          }

          if (this.selectedEntidad) {
            condition = condition && item.ENTIDAD == this.selectedEntidad 
          }

          return condition;
        })
      },
      filterDepartment(department) {
        this.setSelectedDepartment(department)
        this.filterDataset()
      },
      filterEntidad(entidad) {
        this.setSelectedEntidad(entidad)
        this.filterDataset()
      },
      filterRubros(rubro) {
        this.setSelectedRubro(rubro)
        this.filterDataset()
      }
    }
  }
</script>