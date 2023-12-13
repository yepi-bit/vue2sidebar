import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/global' //全局

Vue.directive('myColor', el => {
  el.style.color = 'red'
  el.style.backgroundColor = 'yellow'
})

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

