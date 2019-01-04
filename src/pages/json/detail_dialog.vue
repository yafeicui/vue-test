<template>
  <el-dialog class="simulation-dialog-detail" title=" " :visible.sync="isShowDialog" width="60%" :before-close="handleCancel">
    <div class="detail-cont" v-html="this.detail"></div>
  </el-dialog>
</template>
<script>
  import mixin from '@/components/mixin/mixin-json.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        isShowDialog: false,
        detail: ''
      }
    },
    methods: {
      show(data) {
        this.detail = this.jsonData(JSON.parse(data.fieldsJson));
        this.isShowDialog = true;
      },
      handleCancel() {
        this.isShowDialog = false;
      }
    }
  }
</script>
<style lang="sass">
  .simulation-dialog-detail
    .el-dialog__body
      padding: 0px 20px 30px 20px
      .detail-cont
        width: 100%
        overflow: hidden
        word-break: break-all
</style>


