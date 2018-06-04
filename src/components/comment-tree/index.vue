<template>
  <div class="comment-tree" :style="{width:width || '100%',maxHeight: height || '200px'}" @click="noHidden">
    <el-tree :data="data" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick"  :indent="8" accordion></el-tree>
  </div>
</template>
<script>
export default {
  props: ['width', 'height', 'data', 'defaultProps'],
  data() {
    return {

    }
  },
  methods: {
    handleNodeClick(val) {
      this.$emit('clicktree', val);
      this.noHidden();
    },
    noHidden() {
      this.$emit('nohidden');
    }
  },
  beforeMount() {
    
  }
}
</script>
<style scoped>
  .comment-tree {
    border: 1px solid #ccc;
    z-index: 1000;
    border-radius: 4px;
    position: absolute;
    padding: 10px;
    overflow: auto;
    background: #fff;
  }
</style>


