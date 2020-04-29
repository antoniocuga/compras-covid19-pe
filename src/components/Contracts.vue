<template>
  <div class="row">
    <div class="col-12">

      <div class="row">
        <div v-bind:key="contract.index" class="col-12 mb-3" v-for="contract in dataset">
          <span>{{ contract.FECHACONVOCATORIA }}</span>
          <h3>S/. {{ contract.MONTOADJUDICADOSOLES }}</h3>
          <div class="mb-3">{{ contract.TIPOPROCESO }}</div>
          <div>Entidad: {{ contract.ENTIDAD }}</div>
          <div class="mb-3">Proveedor: {{ contract.PROVEEDOR }}</div>
          <div v-html="contract.DESCRIPCION_PROCESO"></div>
          <div><a target="_blank" :href="contract.URLFICHAPROCESO">Ver ficha</a></div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
  export default {
    name: "Contracts",
    props: {
      dataset: Array
    }
  }
</script>