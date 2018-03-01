<template>
  <div id="app">
    <!-- <Login/> -->
    <router-view/>
  </div>
</template>

<script>
  import Login from '@/components/login'
  export default {
    name: 'App',
    components: {
      Login
    }
  }
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .hello {
    height: 100%;
  }
  .header-row {
    background: #06dd1f;
  }
  .table-box {
    width: 100%;
    /* border: 1px solid #E6E6E6; */
    /* background: #fff; */
    text-align: center;
    padding-bottom: 20px; 
  }
  .table-demo {
    margin-bottom: 20px;
  }
  /* // 去除表格最后一行尾巴上的 1px   */
  .el-table::before{
    height: 0!important;
    border: 0;
  }
  .el-table__row .el-table__row--striped {
    border: 0;
  }
  /* // 去除表格单行下面的 1px */
  .el-table th.is-leaf, .el-table td {
    border-bottom-style:none;
  }
  /* // 去除悬浮置顶的表格底部 1px */
  .el-table__fixed::before, .el-table__fixed-right::before{
    height: 0;
  }
</style>
