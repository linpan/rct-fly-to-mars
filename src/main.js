import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'
import store from './store'
import vuetify from './plugins/vuetify'
import 'drawflow/dist/drawflow.min.css'
import i18n from "../i18n"

Vue.config.productionTip = false
Vue.use(VueBus)
Vue.use(VueAxios, axios)


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
