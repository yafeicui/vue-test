<template>
  <div class="ht-paged-table-wrap">
    <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
      <el-table-column property="account" align="center" label="卡号" min-width="250"></el-table-column>
      <el-table-column property="subAccount" align="center" label="子序号" min-width="150"></el-table-column>
      <el-table-column property="productCode" align="center" label="产品编码" width="150"></el-table-column>
      
      <el-table-column property="openDate" align="center" label="开户日期" width="150">
        <template slot-scope="scope">
          {{scope.row.openDate | translateDate}}
        </template>
      </el-table-column>
      <el-table-column property="balance" align="center" label="时点余额（元）" width="150">
        <template slot-scope="scope">
          {{ scope.row.balance | toLocaleNumString}}
        </template>
      </el-table-column>
    </ht-table>
  </div>
</template>

<script>
  import mixinFormSearch from '@/components/mixin/mixin-form-search.js';
  import htTable from '@/components/publicComponents/ht-table';
export default {
  mixins: [mixinFormSearch],
  props: ['producttype', 'clientId'],
  data() {
    return {
      tableAjaxConfig: null,
      // ...this.config.PAGINATION_CONTENT,
      listKey: 'data',
      ruleForm: {
        clientId: '',
        productType: ''
      },
      paginationKey: {  // 分页信息字段
        size: 'size',
        current: 'current',
        total: 'totalElements'
      },
      params: {},
      acctTypeList:{
        "One":"一类户",
        "Two":"二类户",
        "Three":"三类户"
      }
    }
  },
  components: {
    htTable
  },
  methods: {
    handleGetPaginationInfo() {
      console.log(1111)
      this.tableAjaxConfig = {
        url: `/api`+ '/products',
        method: "get",
        params: Object.assign({}, this.ruleForm)
      }
    }
  },
  beforeMount() {
    this.ruleForm.productType = this.producttype;
    this.ruleForm.clientId = this.clientId;
    this.handleGetPaginationInfo(this.producttype)
  }
}
</script>

