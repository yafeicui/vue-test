<template>
  <div class="card-wrap">
    <div class="title" v-if="title">
      <span>
        {{title}}
      </span>      
      <div class="slot-title-right">
        <slot name="title-right"></slot>
      </div>
    </div>
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
    border-top: solid 5px #fcb924;
    margin-bottom: 10px;

    .title {
      line-height: 58px;
      font-size: 20px;
      color: gray;
      padding: 0 20px;
      // border-bottom: solid 1px #eee;
      border-bottom: solid 1px #ffe1a1;
      display: flex;
      justify-content: space-between;
    }    
    .content-wrap {
      padding: 20px;
    }
    .slot-title-right {
      // float: right;
      // background: yellow;
    }
  }
</style>

