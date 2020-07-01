<template>
  <div class="row">
    <div class="col-12">
      <h4>Cantidad de contrataciones por proveedor en diversos rubros y a diferentes entidades.</h4>
      <p>A la fecha el gobierno a contratado con <b>{{ dataset.length }}</b> empresas a nivel nacional. Algunas han brindado servicios a más de una entidad. Explora la cantidad de contratos adjudicados, el monto contrado y en que rubros se realizaron las compras.</p>
      <p>Contratos publicados entre el {{ desde }} hasta {{ hasta }}</p>
    </div>
    <div class="col-12">
      <div class="row my-3">
        <div class="col-4">
          <v-select class="vue-select2" :options="departments" placeholder="Todos los departamentos" @input="filterDepartment"></v-select>
          <v-select class="vue-select2" :options="entidades" placeholder="Todas las entidades" @input="filterEntidad"></v-select>
          <v-select class="vue-select2" :options="rubros" placeholder="Todas los rubros" @input="filterRubros"></v-select>
          
          <!-- <div class="mt-5">
            <label class="mb-5">Filtrar por monto en soles:</label>
            <vue-slider :lazy="true" v-model="sliderValue" :min="0" :max="100000000" :enable-cross="false" :tooltip="'always'" :tooltip-placement="['top', 'bottom']"></vue-slider>
          </div> -->
        </div>
        <div class="col-8 mb-3">
          <proveedores-summary :dataset="contracts"></proveedores-summary>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-12">
          <contracts :dataset="contracts"></contracts>
        </div>
      </div> -->

    </div>
  </div>
  
</template>

<script>
  import filter from 'lodash/filter'
  import map from 'lodash/map'
  import sortBy from 'lodash/sortBy'
  import orderBy from 'lodash/orderBy'
  import uniq from 'lodash/uniq'
  import min from 'lodash/min'
  import max from 'lodash/max'

  // import VueSlider from 'vue-slider-component'
  // import 'vue-slider-component/theme/default.css'

  import { mapMutations, mapState } from 'vuex'
  import ProveedoresSummary from './ProveedoresSummary'


  export default {
    name: "Search",
    data() {
      return {
        contracts: Array,
        desde: (min(map(this.dataset, 'FECHACONVOCATORIA'))),
        hasta: (max(map(this.dataset, 'FECHACONVOCATORIA'))),
        sliderValue: [0, 100000000]
      }
    },
    props: {
      dataset: Array
    },
    components: {
      ProveedoresSummary,
      //VueSlider
    },
    beforeMount() {
      this.contracts = orderBy(this.dataset, ['FECHACONVOCATORIA'], ['desc'])
    },
    computed: {
      ...mapState(['selectedDepartment', 'selectedEntidad', 'selectedRubro']),
      departments() {
        return this.fieldDataset(this.contracts, 'ENTIDAD_DEPARTAMENTO')
      },
      entidades() {
        return this.fieldDataset(this.contracts, 'ENTIDAD')
      },
      rubros() {
        return this.fieldDataset(this.contracts, 'RUBROS')
      }
    },
    watch: {
      sliderValue(val) {
        this.filterMonto(val)
      }
    },
    methods: {
      ...mapMutations(['setSelectedEntidad', 'setSelectedDepartment', 'setSelectedRubro']),
      fieldDataset (data, field) {
        data = sortBy(data, field)
        return uniq(map(data, field))
      },
      filterMonto (val) {
        this.contracts = filter(this.dataset, item => {
          if(item.MONTOADJUDICADOSOLES >= val[0] && item.MONTOREFERENCIAL <= val[1])
            return true
          return false
        })
      },
      filterDataset () {
        this.contracts = sortBy(this.dataset, ['MONTOREFERENCIAL'], ['desc'])
        this.contracts = filter(this.contracts, item => {

          if(!(item.MONTOREFERENCIAL >= this.sliderValue[0] && item.MONTOREFERENCIAL <= this.sliderValue[1]))
            return false
        
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