export default {
  methods: {
    handleSearch() {
      this.ruleForm = this.ruleForm || {}
      this.tableAjaxConfig.params = Object.assign({}, this.tableAjaxConfig.params, this.ruleForm)
      // 更新路由中的搜索条件
      if (this.cacheSearchState) {
        this.$router.replace({
          path: this.$route.path,
          query: Object.assign({}, this.$route.query, {
            ruleForm: encodeURIComponent(JSON.stringify(this.ruleForm))
          })
        })
      }
      this.updatePaginationInfo()
    },
    handleReset() {
      this.ruleForm = this.ruleForm || {}
      for (var key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
      this.tableAjaxConfig.params = Object.assign({}, this.tableAjaxConfig.params, this.ruleForm)
      // 更新路由中的搜索条件
      if (this.cacheSearchState) {
        this.$router.replace({
          path: this.$route.path,
          query: Object.assign({}, this.$route.query, {
            ruleForm: encodeURIComponent(JSON.stringify({}))
          })
        })
      }
      this.updatePaginationInfo()
    },
    updatePaginationInfo() {
      console.log(this.ruleForm, 'ruleForm')
      if (this.$refs.htTable.current === 1) {
        // 已经是第一页, 重置回current=1不会触发数据更新，不会拉列表，手动拉取
        this.$refs.htTable.handleGetPaginationInfo()
      } else {
        // current的change保证列表自动刷新
        this.$refs.htTable.current = 1
      }
    }
  },
  beforeMount() {
    if (this.cacheSearchState && this.$route.query.ruleForm) {
      Object.assign(this.ruleForm, JSON.parse(decodeURIComponent(this.$route.query.ruleForm)))
    }
  }
}
