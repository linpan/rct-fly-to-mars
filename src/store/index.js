import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    caption: index
  },
  getters,
  actions
})
