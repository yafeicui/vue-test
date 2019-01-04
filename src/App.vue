<template>
  <div id="app">
    <!-- <Login/> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import Login from '@/components/login';
  import Home from '@/components/index'
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
  .search-input-condition {
    width: 100%;
  }
  
</style>
<style lang="less">
  .echart-template .bar-box {
    display: flex;
    padding-top: 30px;
    height: 550px;
    position: relative;
    background: #fff;
    .search-condition {
      width: 140px;
    }
  }
  .echart-template .el-collapse-item__header {
    display: flex;
    justify-content: flex-end;
  }
  .echart-template .el-collapse-item__header.is-active {
    color: rgb(51, 103, 214)
  }
  .echart-template .bar-box .line-search-box {
    padding-top: 10px;
  }
  .echart-template .line-box {
    position: relative;
    padding-top: 30px;
    margin-bottom: 30px;
    height: 550px;
    background: #fff;
    .search-condition {
      width: 140px;
    }
  }
  .echart-template .line-search-box {
    height: 30px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  .echart-template .bar-box, .line-box {
    .bar-hidden {
      width: 100%;
      height: 450px;
      text-align: center;
      line-height: 450px;
    }
    canvas {
      background: #fff!important;
    }
  }
  .echart-template .table-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  .echart-template .table-label {
    width: 20%;
    background: rgb(238, 235, 235);
  }
  .echart-template .table-content {
    width: 70%;
  }
  .echart-template .label-item {
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
    cursor: pointer;
    background: #fff;
    margin-bottom: 5px;
  }
</style>
