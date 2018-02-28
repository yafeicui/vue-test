<template>
  <div class="control-bar-wrap">    
    <div class="content-wrap">
      <slot></slot>
    </div>
    <div class="slot-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>  
  .control-bar-wrap {     
    color: gray;    
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .search-input-condition {
      width: 110px;
    }
  }    
  
</style>

