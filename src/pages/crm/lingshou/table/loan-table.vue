<template>
  <div class="ht-paged-table-wrap">
    <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
      <el-table-column property="loanNumber" align="center" min-width="250" label="借据号"></el-table-column>
      <el-table-column property="productCode" align="center" label="产品编码" width="150"></el-table-column>
      <el-table-column property="productName" align="center" label="产品名称" width="150"></el-table-column>
      <el-table-column property="loanMoney" align="center" width="150" label="贷款金额（元）">
        <template slot-scope="scope">
          {{ scope.row.loanMoney | toLocaleNumString}}
        </template>
      </el-table-column>
      <el-table-column property="interestValue" align="center" width="150" label="利息估值（元）">
        <template slot-scope="scope">
          {{ scope.row.interestValue | toLocaleNumString}}
        </template>
      </el-table-column>
    </ht-table>
    <loan-detail ref="loanDetail"></loan-detail>
  </div>
</template>

<script>
import loanDetail from './loan-dialog.vue';
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
    loanDetail,
    htTable
  },
  methods: {
    handleGetPaginationInfo() {
      console.log(21212)
      this.tableAjaxConfig = {
        url: `/api`+ '/products',
        method: "get",
        params: Object.assign({}, this.ruleForm)
      }
    },
    lookDetail(index, scope) {
      this.$refs.loanDetail.show(scope);
    }
  },
  beforeMount() {
    this.ruleForm.productType = this.producttype;
    this.ruleForm.clientId = this.clientId;
    this.handleGetPaginationInfo(this.producttype);
    // account
    // subAccount
    // limit
    // page
  }
}
</script>

