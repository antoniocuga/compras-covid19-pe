<template>
  <div class="row">
    <div class="col-12">


      <div class="row">
        <div v-bind:key="contract.index" class="col-6 mb-3" v-for="contract in dataset">
          <div class="card h-100">
            <div class="card-header">
              <strong>Proveedor:</strong> {{ contract.PROVEEDOR }}
            </div>
            <div class="card-body">
              <small class="my-3 text-muted">{{ contract.FECHACONVOCATORIA }}</small>
              <h5 class="card-title">{{ contract.MONTOADJUDICADOSOLES | currency('S/') }}</h5>
              <h6 class="card-subtitle mb-2" :class="{'text-danger' :  (contract.TIPOPROCESO == 'Contratación Directa') }">
                {{ contract.TIPOPROCESO }}
              </h6>
              <div class="mb-3">
                <strong>Entidad:</strong> {{ contract.ENTIDAD }}
              </div>
              <div v-html="contract.DESCRIPCION_PROCESO"></div>
              <a :href="contract.URLFICHAPROCESO" target="_blank" class="mt-3 btn btn-primary">Ficha del Proceso</a>
            </div>
          </div>
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