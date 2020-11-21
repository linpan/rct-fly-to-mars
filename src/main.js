import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'
import store from './store'
import vuetify from './plugins/vuetify'
import 'drawflow/dist/drawflow.min.css'
// import VueI18n from 'vue-i18n'
//
// Vue.use(VueI18n)

Vue.config.productionTip = false
Vue.use(VueBus)
Vue.use(VueAxios, axios)

// const i18n = new VueI18n({
//   locale: 'zh-CN',    // 语言标识
//   //this.$i18n.locale // 通过切换locale的值来实现语言切换
//   messages: {
//     'en':{music: '北京的'}    // 英文语言包
//   }
// })

new Vue({
  router,
  store,
  vuetify,
  // i18n,
  render: (h) => h(App)
}).$mount('#app')
