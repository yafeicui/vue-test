import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login'
import pages from '@/components/index'

import user from '@/components/pages/system/user'
import role from '@/components/pages/system/role'

import history from '@/components/pages/sx/history'

import rule from '@/components/pages/qizha/rule'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: "",
      component: login,
    },
    {
      path: '/system',
      redirect: "/system/user",
      component: pages,
      children: [
        {path: '/system/user', component: user},
        {path: '/system/role', component: role},
        {path: '/antiFraud/rule', component: rule},
        {path: '/sx/history', component: history},
      ]
    }
  ]
})

