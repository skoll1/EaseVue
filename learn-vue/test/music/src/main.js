// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 体会 import 加载机制
import Vue from 'vue'

// 从'vue'中加载Vue模块，必须有配置文件，告诉js引擎盖模块的位置。这个要在node里面使用。
// 编译时加载，或者静态加载，在编译时就会完成模块加载
import App from './App'
import router from './router'
import store from './store'
// 这里引入了js文件，可以很明显的看出来。from指定模块的文件位置，可以是绝对路径，也可以是相对路径
import fastclick from 'fastclick'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.$ajax=axios;

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:require('./common/images/1.png'),
  error:require('./common/images/err.png'),
  // 其他参数试验。
  attempt:3,
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
