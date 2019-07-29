import Vue from 'vue'
import App from './App.vue'
// 引入路由 + 挂载到vue实例上
import router from './router'

// 引入公共样式
import './assets/common.css'

// 引入 elementUI
import ElementUI from 'element-ui'
// 引入element的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
