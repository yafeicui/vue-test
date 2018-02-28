<template>
  <div class="htButton">
    <div @click="handleClick" class="ht-button">点击</div>
  </div>
</template>
<script>
  export default {
    props: ['msg'],
    data() {
      return {

      }
    },
    methods: {
      handleClick() {
        console.log(this.msg);
      }
    }
  }
</script>
<style scoped>
  .ht-button {
    width: 50px;
    height: 25px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
  }
</style>

