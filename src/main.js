import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/reset.css'

Vue.config.productionTip = false
Vue.prototype.$assetsUrl = "http://tm.lilanz.com/QYWX/Test/LmTest/assets/img/parking/"
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
