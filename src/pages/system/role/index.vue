<template>
	<ht-page title="角色管理">
		<ht-control-bar>
			<el-input v-model.trim="ruleForm.roleName" clearable placeholder="角色名称" class="search-input-condition"></el-input>
			<el-button type="primary" round @click="handleSearch">搜索</el-button>
			<el-button slot="right" type="primary" round @click="handleAddRole">新建</el-button>
		</ht-control-bar>

		<div class="table-box">
			<!-- <el-table ref="htTable" class="table-demo" :data="roleList">
				<el-table-column label="角色名" prop="roleName" align="center"></el-table-column>
				<el-table-column label="角色值" prop="roleValue" align="center"></el-table-column>
				<el-table-column label="备注" prop="tips" align="center"></el-table-column>
				<el-table-column label="操作" width="260" align="center">
					<template slot-scope="scope">
						<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="sizes, prev, pager, next" :total="2"></el-pagination> -->
       <ht-table ref="htTable" :ajaxConfig="tableAjaxConfig" :listKey="listKey" :paginationKey="paginationKey">
        <el-table-column align="center" prop="clientName" label="客户名称" ></el-table-column>
        <el-table-column align="center" prop="clientId" label="客户编号"></el-table-column>
       </ht-table>
		</div>
    <p>{{count}}</p>
    <el-button @click="changeState">改变状态管理数据</el-button>
    <el-button @click="handleDesCount">count减2</el-button>
		<add-dialog ref="addDialog" @on-success="addSuccess" :roleList="roleList"></add-dialog>
		<edit-dialog ref="editDialog" @on-success="editSuccess" :roleList="roleList"></edit-dialog>
	</ht-page>
</template>

<script>
import Vue from 'vue';
import AddDialog from './role_add.vue';
import EditDialog from './role_edit.vue';
// import htTable from '@/components/publicComponents/ht-table'
import { mapState, mapActions, mapMutations, mapGetters } from 'Vuex';
export default {
  data() {
    return {
      ruleForm: {
        roleName: '',
        roleType: '',
      },
      roleList: [],
      num: 3,
      id: 0,
      num1: 0,
      tableAjaxConfig: null,
      // ...this.config.PAGINATION_CONTENT,
      listKey: 'data',
      paginationKey: {
        // 分页信息字段
        size: 'size',
        current: 'current',
        total: 'totalElements',
      },
      testNum: 11,
    };
  },
  computed: {
    // ...mapGetters(['count']),
    ...mapState({ count: 'count' }),
    // ...mapState(['count']),
  },
  components: {
    AddDialog,
    EditDialog,
    // htTable
  },
  mounted() {
    console.log(this.$store.getters.count, 9999);
  },
  methods: {
    ...mapActions(['changeCount', 'desCount']),
    ...mapMutations(['desMuCount']),
    *test() {
      // yield throw('aaaa')
      yield this.$http({ url: '/api/system/user/list' });
      yield this.$http({ url: '/api/orgs/040000/users' });
      return 124;
    },
    async handleTest() {
      var testt = this.test();
      // testt.next().value.then(res => {
      //   console.log(res, 888);
      // });
      // testt.next().value.then(res => {
      //   console.log(res, 999);
      // });
      // console.log(testt.next(), 909);

      // var num = [...this.test()];
      // console.log(
      //   num[0].then(res => {
      //     console.log(res);
      //   })
      // );

      // let [n1, n2] = this.test();
      // console.log(n1, n2);

      // n1.then(res => {
      //   console.log(res);
      // });

      // await this.$http({
      //   url: '/api/system/user/list'
      // }).then(res => {
      //   this.testNum -= 12;
      // });
      // await this.$http({
      //   url: `/api/orgs/` + '040000' + '/users',
      //   method: 'get'
      // }).then(res => {
      //   console.log(this.testNum);
      //   this.testNum += 10;
      // });
      // console.log(this.testNum, 8989);

      // Promise.all([this.$http({
      //   url: `/api/orgs/`+'040000'+'/users',
      //   method: 'get',
      // }), this.$http({
      //   url: '/api/system/user/list'
      // })]).then(res => {
      //   console.log(res, 88888)
      // })

      // console.log(1)
      // var a = new Promise((resolve, err) => {
      //   console.log(2)
      //   this.$http({
      //     url: `/api/orgs/`+'040000'+'/users',
      //     method: 'get',
      //   }).then(res => {
      //     console.log(3)
      //     return resolve(res)
      //     console.log(4)
      //   })
      // })
      // console.log(5)
      // a.then(res => {
      //   console.log(6)
      //   console.log(res, 'res')
      // }).catch(err => {
      //   console.log(err, 'err')
      // })
      // console.log(7)
    },
    handleSearch() {},
    addSuccess(val) {
      this.roleList.push({
        roleName: val.roleName,
        roleValue: val.roleValue,
        tips: val.tips,
        id: this.num++,
      });
    },
    editSuccess(val) {
      this.roleList.forEach((item, index) => {
        if (item.id == this.id) {
          item.roleName = val.roleName;
          item.roleValue = val.roleValue;
          item.tips = val.tips;
        }
      });
    },
    handleAddRole() {
      this.$refs.addDialog.show();
    },
    handleEdit(row) {
      this.id = row.id;
      this.$refs.editDialog.show(row);
    },
    handleDelete(row) {
      this.$confirm('确实删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.roleList.forEach((item, index) => {
            if (item.roleName == row.roleName) {
              this.roleList.splice(index, 1);
            }
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // getState() {
    //   this.num1 = this.$store.state.count;
    // },
    handleSizeChange() {},
    handleCurrentChange() {},
    // 改变状态管理数据
    changeState() {
      this.changeCount(3);
      // this.getState();
    },
    handleDesCount() {
      this.desMuCount();
      // this.getState();
    },
    // 获取表格数据
    handleGetPaginationInfo() {
      this.tableAjaxConfig = {
        url: '/api/system/role/tableList',
        method: 'get',
        params: Object.assign({}, this.ruleForm),
      };
    },
  },
  beforeMount() {
    // this.getState();
    this.handleGetPaginationInfo();
    this.handleTest();
    // console.log(this, 'beforeMount');
  },
  // beforeCreate() {
  //   console.log(this, 'beforeCreate');
  // },
  // created() {
  //   console.log(this, 'created');
  // },
  // mounted() {
  //   console.log(this, 'mounted');
  // },
  // beforeUpdate() {
  //   console.log(this, 'beforeUpdate');
  // },
  // updated() {
  //   console.log(this, 'updated');
  // },
  // beforeDestroy() {
  //   console.log(this, 'beforeDestroy');
  // },
  // destroyed() {
  //   console.log(this, 'destroyed');
  // },
  beforeRouteEnter(to, from, next) {
    // console.log(to, from, 88888)
    if (from.path === '/sx/history') {
      Vue.prototype
        .$confirm('确定由授信跳转到当前页面？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    Vue.prototype
      .$confirm('确定离开当前页面？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        next();
      })
      .catch(() => {
        next(false);
      });
  },
};
</script>