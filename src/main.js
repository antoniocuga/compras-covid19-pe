    import Vue from 'vue'
    import VueGtag from 'vue-gtag'

    import App from './App.vue'
    import store from './store'

    Vue.use(VueGtag, { config: { } })

    Vue.config.productionTip = false

    new Vue({
      render: h => h(App),
      store
    }).$mount('#app')