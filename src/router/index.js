import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },	
    { path: '/login', component: resolve => require(['@/components/login'], resolve) },	
    {
      path: '/system',
      redirect: "/system/user",
      component: resolve => require(['@/components/index.vue'], resolve),
      children: [
        {
          path: '/system/user', component: resolve => require(['@/pages/system/user'], resolve), beforeEnter: (to, from, next) => {
            console.log(to, from , 1111)
            next()
          }},	
        { path: '/system/role', component: resolve => require(['@/pages/system/role'], resolve) },	
        
        { path: '/sx/history', component: resolve => require(['@/pages/sx/history'], resolve) },	
        { path: '/antiFraud/rule', component: resolve => require(['@/pages/qizha/rule'], resolve) },	
        { path: '/crm/customer-info', component: resolve => require(['@/pages/crm/customer-info'], resolve) },
        { path: '/crm/custinfo/retail', component: resolve => require(['@/pages/crm/lingshou'], resolve) },	
        { path: '/crm/lingshou/detail',name: 'lsdetail', component: resolve => require(['@/pages/crm/lingshou/detail'], resolve) },
        { path: '/table', component: resolve => require(['@/pages/special-table'], resolve) },		
      ]
    }
  ]
})

router.beforeEach((to, from ,next) => {
  const _this = Vue.prototype;
  let isHave = false;
  const arr = ['/antiFraud/rule'];
  arr.map(ele => {
    if(from.path === ele) {
      isHave = true
    }
  })
  if (isHave) {
    _this.$confirm('确定路由跳转?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next();
    }).catch(() => { });
  } else {
    next();
  }
  // if (from.path === '/antiFraud/rule') {
  //   _this.$confirm('确定路由跳转?', '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     next();
  //   }).catch(() => {});
  // }else {
  //   next();
  // }
})
router.afterEach((to, from) => {
  // console.log(to, from, 9988)
})
export default  router;

