import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import pages from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      redirect: "/login",
      component: login,
    },
    {
      path: '/',
      name: 'index',
      component: pages,
    }
  ]
})

