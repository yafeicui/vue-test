// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '../theme/index.css'
import Vue from 'vue'
import App from './App'
// 引入elementui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
// 使用elememtui
Vue.use(ElementUI)
Vue.config.productionTip = false

// 公共组件
import htButton from './addcom/htButton.vue';
Vue.component('htButton', htButton);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
