import Vue from 'vue'
import App from './App.vue'

//导入样式
import './assets/bass.css'

// 导入饿了么
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//导入axios
// Vue.prototype.$axios = axios

//导入路由模块
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
