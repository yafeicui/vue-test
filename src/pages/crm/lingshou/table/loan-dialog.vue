<template>
  <el-dialog :visible.sync="isShowTable" title="明细" :close-on-click-modal="false" class="ht-dialog-content-wrap middle">
		<el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="paybackDate" label="日期" min-width="280" align="center">
        <template slot-scope="scope">
          {{scope.row.paybackDate | translateDate}}
        </template>
      </el-table-column>
      <el-table-column prop="paybackMoney" label="还款金额（元）" min-width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.paybackMoney | toLocaleNumString}}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box mixin-pagination">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange"></el-pagination>
    </div>
	</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isShowTable: false,
      tableData: [],
      ruleForm: {
        loanNumber: '',
        page: 1,
        limit: 10
      },
      total: 10,
      clientId: ''
    }
  },
  methods: {
    show(val) {
      this.isShowTable = true;
      this.ruleForm.loanNumber = val.loanNumber;
      this.clientId = val.clientId;
      this.getTableData();
    },
    getTableData() {
      this.$http({
        url: `${process.env.AJAX_PREFIX}/paybackDetails/` + this.clientId,
        method: 'get',
        params: this.ruleForm
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      })
    },
    currentChange(num) {
      this.ruleForm.page = num;
      this.getTableData();
    }
  }
}
</script>
<style lang="less" scoped>
  .page-box {
    width: 100%;
    height: 40px;
    margin: 20px 0;
    text-align: center;
  }
</style>


