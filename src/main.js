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

// 解决axios的三个问题
import axios from 'axios'
// 问题 1 : 每次都加基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题2 : 每个 组件想 使用axios 都要引入一次
Vue.prototype.$axios = axios // 以后vue的实例 都可以 使用 $axios (组件 本质就是vue实例 )

// 问题3 : 每次请求都要携带token
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
// axios.interceptors.response.use(function (response) {

//   if (response.data.meta.status === 100011) {
//     this.$router.push('/login')
//   }

//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
