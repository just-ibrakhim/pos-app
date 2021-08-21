import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barRespons: true,
    menuRespons: true,
    orderRespons: true,
  },
  getters: {
    getBar(state) {
      return state.barRespons
    },
    getMenu(state) {
      return state.menuRespons
    },
    getOrders(state) {
      return state.orderRespons
    },
  },
  mutations: {
    showBar(state) {
      state.barRespons = true
      state.menuRespons = false
      state.orderRespons = false
    },
    showMenu(state) {
      state.menuRespons = true
      state.barRespons = false
      state.orderRespons = false
    },
    showOrders(state) {
      state.orderRespons = true
      state.barRespons = false
      state.menuRespons = false
    }
  }
})