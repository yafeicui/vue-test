export default {
  methods: {
    // 聚焦
    deptFocus() {
      this.isDeptShow = true;
    },
    // 失焦
    deptBlur() {
      setTimeout(() => {
        if (this.isDeptClose) {//true
          this.isDeptShow = false;
        } else {//false
          this.$refs.deptInput.focus();
          this.isDeptShow = true;
        }
        this.isDeptClose = true;
      }, 250)
    },
    // 阻止默认事件
    handlePrevent(e) {
      e.preventDefault();
    },
    // 是否隐藏树形部门
    ifHiddenDeptTree() {
      this.isDeptClose = false;
    },
    // 转换日期样式
    add0(m) { return m < 10 ? '0' + m : m },
    timeFormat(timestamp, num) {
      //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      timestamp -= Number(num) * 24 * 60 * 60 * 1000;
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return year + '-' + this.add0(month) + '-' + this.add0(date);
    },
    // 是否显示
    isCanOperate() {
      var userId = localStorage.getItem('userId');
      this.$http({
        method: 'get',
        url: `/api/roles/` + '280' + '/highRole'
      }).then((res) => {
        // console.log(res.data, 88888)
        // var orgcode = JSON.parse(localStorage.getItem('user')).orgCode;
        // 'CLIENT_MAthis.NAGER'  
        res.data.data = 'DEPT_MANAGER' 
        res.data.data === 'CLIENT_MANAGER' ? this.isOperate = false : this.isOperate = true;
        // DEPT_MANAGER 获取部门列表需要带orgCode参数
        res.data.data === 'OFFICE_MANAGER' || res.data.data === 'DEPT_MANAGER' ? this.handleGetDeptList({ orgCode: '00000000' }) : this.handleGetDeptList();
      }).catch(console.log.bind(console))
    },
    // 获取部门列表
    handleGetDeptList(val) {
      this.$http({
        url: `/api/crm/orgs`,
        method: 'get',
        params: val ? val : {},
      }).then((res) => {
        this.deptList = res.data.data
      })
    },
  }
}