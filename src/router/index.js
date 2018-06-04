import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: resolve => require(['@/components/login'], resolve) },	
    {
      path: '/system',
      redirect: "/system/user",
      component: resolve => require(['@/components/index.vue'], resolve),
      children: [
        { path: '/system/user', component: resolve => require(['@/pages/system/user'], resolve) },	
        { path: '/system/role', component: resolve => require(['@/pages/system/role'], resolve) },	
        { path: '/sx/history', component: resolve => require(['@/pages/sx/history'], resolve) },	
        { path: '/antiFraud/rule', component: resolve => require(['@/pages/qizha/rule'], resolve) },	
        { path: '/crm/customer-info', component: resolve => require(['@/pages/crm/customer-info'], resolve) },
        { path: '/crm/custinfo/retail', component: resolve => require(['@/pages/crm/lingshou'], resolve) },	
        { path: '/crm/lingshou/detail', component: resolve => require(['@/pages/crm/lingshou/detail'], resolve) },	
      ]
    }
  ]
})

router.beforeEach((to, from ,next) => {
  const _this = Vue.prototype;
  console.log(this, to, from , 9988)
  _this.$confirm('确定路由跳转?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    next();
    // _this.$message({
    //   type: 'success',
    //   message: '删除成功!'
    // });
  }).catch(() => {
    // _this.$message({
    //   type: 'info',
    //   message: '已取消删除'
    // });
  });
  // next();

  // vue.$message({ message: '确定跳转 ？', type: 'warning' });
})
export default  router;

