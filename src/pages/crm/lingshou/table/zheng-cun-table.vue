<template>
  <div class="ht-paged-table-wrap">
    <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
      <el-table-column prop="account" align="center" label="卡号" min-width="230"></el-table-column>
      <el-table-column prop="subAccount" align="center" label="子序号" min-width="150"></el-table-column>
      <el-table-column property="productCode" align="center" label="产品编码" width="150"></el-table-column>
      
      <el-table-column prop="depositStartDate" align="center" label="起存日期" min-width="150">
        <template slot-scope="scope">
          {{scope.row.depositStartDate | translateDate}}
        </template>
      </el-table-column>
      <el-table-column prop="depositEndDate" align="center" label="到期日期" min-width="150">
        <template slot-scope="scope">
          {{scope.row.depositEndDate | translateDate}}
        </template>
      </el-table-column>
      <el-table-column prop="depositTerm" align="center" label="存期" width="150"></el-table-column>
      <el-table-column prop="balance" align="center" label="金额（元）" width="150">
        <template slot-scope="scope">
          {{ scope.row.balance | toLocaleNumString}}
        </template>
      </el-table-column>
      <el-table-column prop="interestRate" align="center" label="利率（%）" width="150"></el-table-column>
      <el-table-column prop="interestValue" align="center" label="利息估值（元）" width="150">
        <template slot-scope="scope">
          {{ scope.row.interestValue | toLocaleNumString}}
        </template>
      </el-table-column>
    </ht-table>
    <deposit-dialog ref="DepositDialog"></deposit-dialog>
  </div>
</template> 

<script>
  import mixinFormSearch from '@/components/mixin/mixin-form-search.js';
  import htTable from '@/components/publicComponents/ht-table';
  import DepositDialog from './deposit-dialog.vue';
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
      this.handleGetPaginationInfo(this.producttype);
      // productType: ,
      // clientId,
      // limit,
      // page
    }
  }
</script>


