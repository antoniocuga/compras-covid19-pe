import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

function initialState () {
  return {
    selectedDepartment: 'Todos los departamentos',
    selectedEntidad: 'Todas las entidades',
    selectedRubro: 'Todas los rubros'
  }
}

export default new Vuex.Store({
  state: initialState(),
  mutations: {
    setSelectedDepartment (state, selectedDepartment) {
      state.selectedDepartment = selectedDepartment
    },
    setSelectedEntidad (state, selectedEntidad) {
      state.selectedEntidad = selectedEntidad
    },
    setSelectedRubro (state, selectedRubro) {
      state.selectedRubro = selectedRubro
    }
  }
})