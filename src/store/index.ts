import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: true
  },
  getters: {
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    setSidebarVisibility(state, value) {
      state.sidebarVisible = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
