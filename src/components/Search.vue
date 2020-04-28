<template>
  <div class="row">
    <div class="col-12">

      <div class="row mb-3">
        <div class="col-4">
          <b-form-group label="Departamento">
            <b-dropdown :text="selectedDepartment">
              <b-dropdown-item v-for="department in departments" b-bind:key="department" @click="filterDepartment(department)">
                {{ department }}
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </div>
        <div class="col-4">
          <b-form-group label="Entidad">
            <b-dropdown :text="selectedEntidad">
              <b-dropdown-item v-bind:key="entidad" v-for="entidad in entidades"  @click="filterEntidad(entidad)">
                {{ entidad }}
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </div>
        <div class="col-4">
          <b-form-group label="Rubros">
            <b-dropdown :text="selectedRubro">
              <b-dropdown-item v-bind:key="rubro" v-for="rubro in rubros"  @click="filterRubros(rubro)">
                {{ rubro }}
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
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
  import countBy from 'lodash/sortBy'
  import filter from 'lodash/filter'
  import keys from 'lodash/keys'
  import map from 'lodash/map'
  import sortBy from 'lodash/orderBy'
  import uniq from 'lodash/uniq'
  import { mapMutations, mapState } from 'vuex'
  import Contracts from './Contracts'

  export default {
    name: "Search",
    data() {
      return {
        contracts: Array
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
        const departments = this.fieldDataset(this.dataset, 'ENTIDAD_DEPARTAMENTO')
        return departments
      },
      entidades() {
        return this.fieldDataset(this.contracts, 'ENTIDAD')
      },
      rubros() {
        return this.fieldDataset(this.contracts, 'RUBROS')
      }
    },
    watch: {
      selectedDepartment() {
        this.filterDataset()
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
        this.contracts = filter(this.contracts, item => item.ENTIDAD_DEPARTAMENTO == this.selectedDepartment )
        
      },
      filterDepartment(department) {
        this.setSelectedDepartment(department)
      },
      filterEntidad(entidad) {
        this.setSelectedEntidad(entidad)
        this.contracts = filter(this.dataset, item => item.ENTIDAD == this.selectedEntidad )
      },
      filterRubros(rubro) {
        this.setSelectedRubro(rubro)
        this.contracts = filter(this.dataset, item => item.RUBROS == this.selectedRubro )
      }
    }
  }
</script>