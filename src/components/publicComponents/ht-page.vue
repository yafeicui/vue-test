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
<style scoped>
  .page-wrap {
    /* width: 100%; */
  }
  .title {      
    font-size: 18px;
    line-height: 18px;
    color: #333;
    margin: -20px;
    padding: 20px;
    padding-bottom: 13px;
    padding-top: 18px;
    background: white;
    margin-bottom: 20px;      
  }
</style>
<style>

</style>
