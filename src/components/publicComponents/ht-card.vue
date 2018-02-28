<template>
  <div class="card-wrap">
    <div class="content-wrap">
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
  .card-wrap {
    background: white;
    margin-bottom: 10px;
  }
  .content-wrap {
    padding: 20px;
  }    
</style>
<style lang="less">
  // .cart-wrap {
    .content-layout-center {
      text-align: center;
      margin-bottom: 10px;
    }
  // }
</style>


