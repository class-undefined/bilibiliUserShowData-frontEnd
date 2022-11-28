import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as echarts from 'echarts'
Vue.prototype.echarts = echarts
Vue.prototype.vueCompontent = {}//储存vue实例的容器
Vue.prototype.globalEmit = new Vue() //注册全局事件挂在至vue中
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
