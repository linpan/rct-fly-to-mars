import Vue from 'vue'
import Vuex from 'vuex'
import caption from './modules/caption'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    caption
  },
  getters,
  actions
})
