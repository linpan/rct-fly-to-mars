import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'

import store from './store'
import vuetify from './plugins/vuetify'
import 'drawflow/dist/drawflow.min.css'

Vue.config.productionTip = false
Vue.use(VueBus)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
