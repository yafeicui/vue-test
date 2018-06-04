<template>
  <div class="ht-paged-table-wrap">
    <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
      <el-table-column property="account" align="center" label="卡号" min-width="250"></el-table-column>
      <el-table-column property="subAccount" align="center" label="子序号" min-width="150"></el-table-column>
      <el-table-column property="productCode" align="center" label="产品编码" width="150"></el-table-column>
      
      <el-table-column property="depositStartDate" align="center" label="起存日期" min-width="150">
        <template slot-scope="scope">
          {{scope.row.depositStartDate | translateDate}}
        </template>
      </el-table-column>
      <el-table-column property="balance" align="center" label="金额（元）" width="150">
        <template slot-scope="scope">
          {{ scope.row.balance | toLocaleNumString}}
        </template>
      </el-table-column>
      <el-table-column property="interestValue" align="center" label="利息估值（元）" width="150">
        <template slot-scope="scope">
          {{ scope.row.interestValue | toLocaleNumString}}
        </template>
      </el-table-column>
    </ht-table>
    <deposit-dialog ref="DepositDialog"></deposit-dialog>
  </div>
</template>
<script>
  import DepositDialog from './deposit-dialog.vue';
  import mixinFormSearch from '@/components/mixin/mixin-form-search.js';
  import htTable from '@/components/publicComponents/ht-table';
export default {
  mixins: [mixinFormSearch],
  props: ['producttype', 'clientId'],
  data() {
    return {
      tableAjaxConfig: null,
      // ...this.config.PAGINATION_CONTENT,
      paginationKey: {  // 分页信息字段
        size: 'size',
        current: 'current',
        total: 'totalElements'
      },
      listKey: 'data',
      ruleForm: {
        clientId: '',
        productType: ''
      },
      params: {}
    }
  },
  components: {
    DepositDialog,
    htTable
  },
  methods: {
    handleGetPaginationInfo() {
      this.tableAjaxConfig = {
        url: `/api`+ '/products',
        method: "get",
        params: Object.assign({}, this.ruleForm)
      }
    },
    lookDetail(index, scope) {
      this.$refs.DepositDialog.show(scope);
    }
  },
  beforeMount() {
    this.ruleForm.productType = this.producttype;
    this.ruleForm.clientId = this.clientId;
    this.handleGetPaginationInfo(this.producttype)
  }
}
</script>

