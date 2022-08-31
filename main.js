import App from './App'


// #ifndef VUE3
import Vue from 'vue'
// 引入
import request from './utils/request.js'
import Utils from './utils/uitls.js'
import Constants from './utils/constants.js'

// 将暴露的函数,挂在到Vue的原型prototype上的request,这样Vue的所有实例都共享了
Vue.prototype.request = request;
Vue.prototype.utils = Utils;
Vue.prototype.constants = Constants

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif