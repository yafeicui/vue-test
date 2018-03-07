// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../theme/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入elementui
import Element from 'element-ui'
import '../element-variables.scss'
Vue.use(Element)
// 引入状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入bus
import VueBus from 'vue-bus';
Vue.use(VueBus);

Vue.config.productionTip = false

// 引入公共组件
import HtPage from '@/components/publicComponents/ht-page.vue'
Vue.component('HtPage', HtPage)
import HtControlBar from '@/components/publicComponents/ht-control-bar.vue'
Vue.component('HtControlBar', HtControlBar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
