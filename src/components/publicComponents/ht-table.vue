<template>
  <div class="ht-table-cpn">
    <el-table class="table-demo" size="medium" :data="tbData ? tbData : tableData" stripe v-loading="isTableLoading" header-row-class-name="header-row"
      style="width:100%" @expand-change="handleTableHeader">
      <slot></slot>    
    </el-table>
    <div v-if="paginationKey" class="mixin-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"        
        layout="prev, pager, next"
        background
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  /**@augments
   * 
   ajaxConfig: {     
     http: {    // ajax 接口相关
       url: ''
       methods: 'get',
       params: {}
     },
     listKey: 'records',  // ajax 返回数据中，列表所在字段
     paginationKey: {   
       size: 'size',
       current: 'current',
       total: 'total'
     }
   }
   */
  props:['ajaxConfig', 'paginationKey', 'listKey', 'tbData'],
  data () {
    return {
      current: 1,
      size: 10,
      total: 100,
      tableData: [],
      isTableLoading:false,
    }
  },
  methods: {
    /**
     * @public 更新分页列表
     */
    handleGetPaginationInfo() {
      this.isTableLoading = true      
      var ajaxConfig = Object.assign({}, this.ajaxConfig)
      var paginationKey = this.paginationKey     
      if (paginationKey) {
        ajaxConfig.params = Object.assign({}, ajaxConfig.params, {
          [paginationKey.size]: this.size,
          [paginationKey.current]: this.current - 1
        })
      }
       
      this.$http(ajaxConfig).then(resp => {
        this.isTableLoading = false        
        if (resp.data && resp.data.data) {
          if (paginationKey) {
              // 有分页的情况条件,取列表字段
              var listKeys = this.listKey.split('.')
              var dataNode = resp.data.data
              while (listKeys.length > 1) {
                dataNode = dataNode[listKeys.shift()]
              }
              this.tableData = dataNode[listKeys[0]]
              this.total = parseInt(dataNode[paginationKey.total])              
          } else {
              // 无分页，直接用顶层返还的列表数据
              this.tableData = resp.data.data
          }
        } else {
          this.tableData = []
        }        
      })
    },
    /**@augments
     * 删除行
     */
    deleteRow (ajaxConfig) {
      this.$confirm("确定删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //ajax请求
          this.$http(ajaxConfig)
            .then(res => {
              this.$message({
                type: "success",
                message: `删除成功`
              })
              this.handleGetPaginationInfo()
            })
            .catch(console.log.bind(console))
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },    
    /**@augments
     * @private
     */
    handleSizeChange (val) {
      this.current = 1
      this.size = val
      this.handleGetPaginationInfo()
    },
    /**@augments
     * @private
     */
    handleCurrentChange (val) {      
      this.current = val
      this.handleGetPaginationInfo()
    },
    // 点击行展开表格
    handleTableHeader (val, scope) {
      this.$emit('handleHeaderClick', val)
    }
    
  },
  mounted() {        
    if (this.ajaxConfig) {
      this.handleGetPaginationInfo()
    }
  }
}
</script>
<style lang="less" scoped>
  .mixin-pagination {
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
  }
</style>
<style lang="less">
  .ht-table-cpn {
    .header-row {
      background: #e6e6e6;
    }
    // 去除表格最后一行尾巴上的 1px  
    .el-table::before{
      height: 0!important;
    }
    // 去除表格单行下面的 1px
    .el-table th.is-leaf, .el-table td {
      border-bottom-style:none;
    }
    // 去除悬浮置顶的表格底部 1px
    .el-table__fixed::before, .el-table__fixed-right::before{
      height: 0;
    }
  }
  /*.ht-table-cpn.el-table::before{
    height: 0!important;
  }*/
  /*.ht-table-cpn.el-table th.is-leaf, .el-table td {
    border-bottom-style: none;
  }*/
  /*.el-table__fixed-right {
    border-bottom: none!important;
  }*/
  .el-pager .number {
    border-radius: 50%;
  }
  .mixin-pagination .el-pager li {
    max-width: 28px;
    min-width: 28px;
    margin: 0 4px;
  }
  .mixin-pagination .el-pager li:hover {
    background: #efefef;
    color: #9ea0ad;
  }
  .mixin-pagination .el-pager .active {
    border-radius: 50%;
    background: #518dd3;
    color: #f6fffb;
    cursor: pointer;
  }
  .mixin-pagination .el-pager .active:hover {
    border-radius: 50%;
    background: #518dd3;
    color: #f6fffb;
    cursor: pointer;
  }
</style>



