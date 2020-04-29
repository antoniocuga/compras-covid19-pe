    import Vue from 'vue'
    import VueGtag from 'vue-gtag'

    import App from './App.vue'
    import store from './store'
    import Vue2Filters from 'vue2-filters'
    import vSelect from "vue-select";

    Vue.use(VueGtag, { config: { } })
    Vue.use(Vue2Filters)
    Vue.component("v-select", vSelect);

    Vue.config.productionTip = false

    new Vue({
      render: h => h(App),
      store
    }).$mount('#app')