import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

function initialState () {
  return {
    selectedDepartment: null,
    selectedEntidad: null,
    selectedRubro: null
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