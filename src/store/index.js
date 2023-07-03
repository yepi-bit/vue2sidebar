import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dark: false,
    menuList: [],
    collapse: false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    darkSwitch() {
      const html = document.querySelector('html');
      if (this.dark) {
        html.className = 'dark';

      } else {
        html.className = '';
      }
    }
  },
  modules: {
  }
})
