<template>
  <div class="page-wrap">    
    <div class="tab-wrap">
      <slot name="tab"></slot>    
    </div>
    <div class="title" v-if="title">
      {{title}}
    </div>   
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title'],
  data() {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
  .page-wrap {
    @title-gap-size: 18px;
    .title {      
      font-size: 18px;
      line-height: 18px;
      color: #333;
      /** 白色标题头的补充代码 */
      margin: -20px;
      padding: 20px;
      padding-bottom: 13px;
      padding-top: 18px;
      background: white;
      /** 白色标题头的补充代码  end */
      margin-bottom: 20px;      
    }
  }
</style>
<style lang="less">
// 全局的tab页头样式
  .page-tabs {    
    .el-tabs__header {
      background: white;
      margin: -20px;
      padding: 0 20px;
      margin-bottom: 15px;
      
      .el-tabs__nav-wrap::after {
        background-color: rgba(0,0,0,0);
      }

      .el-tabs__item {
        font-size: 18px;
        line-height: 18px;
        padding-top: 18px;
        padding-bottom: 32px;
      }
    }
  }
</style>
