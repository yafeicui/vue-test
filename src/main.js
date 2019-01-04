// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../theme/index.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// 引入elementui
import Element from 'element-ui';
import '../element-variables.scss';
Vue.use(Element);
// 引入状态管理
// import Vuex from 'vuex'
// Vue.use(Vuex)
// 引入bus
import VueBus from 'vue-bus';
Vue.use(VueBus);
// 引入axios全局拦截
import { createHttp, bindVue } from './http/axios';
createHttp();

Vue.config.productionTip = false;

// 引入指令
import '@/components/directives';
// 引入过滤器
import '@/components/filter';
// 引入公共组件
import HtPage from '@/components/publicComponents/ht-page.vue';
Vue.component('HtPage', HtPage);
import HtControlBar from '@/components/publicComponents/ht-control-bar.vue';
Vue.component('HtControlBar', HtControlBar);
import HtCard from '@/components/publicComponents/ht-card.vue';
Vue.component('HtCard', HtCard);
import HtTable from '@/components/publicComponents/ht-table.vue';
Vue.component('HtTable', HtTable);

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
bindVue(vue);
