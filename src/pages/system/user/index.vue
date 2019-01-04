<template>
	<ht-page title="用户管理">
		<ht-control-bar>
			<el-input v-model.trim="ruleForm.account" clearable placeholder="账号" class="search-input-condition" style="width: 150px" :autofocus="true"></el-input>
			<el-button type="primary" round @click="handleGetTableData">搜索</el-button>
		</ht-control-bar>

		<div class="ht-flex">
			<div class="dept">
				<div class="treeTitle">组织机构</div>
				<div class="deptList">
					<el-tree :highlight-current="true" :data="deptList" @node-click="handleGetDeptId" style="border: none;"></el-tree>
				</div>
			</div>
			<div class="table-box">
				<el-table class="table-demo" :data="tableData" stripe header-row-class-name="header-row">
					<el-table-column label="账号" prop="account" align="center"></el-table-column>
					<el-table-column label="姓名" prop="name" align="center"></el-table-column>
					<el-table-column label="部门" prop="deptName" align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="180">
						<template slot-scope="scope">
							<el-dropdown>
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="handlejump(scope.row)">跳转</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total"></el-pagination>
			</div>
      
		</div>
    <div>
      <button @click="show = !show">
        动画效果
      </button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
    <input v-focus="{name: 'test'}">
	</ht-page>
</template>

<script>
export default {
  data() {
    return {
      deptList: [],
      ruleForm: {
        account: ''
      },
      tableData: [],
      total: 1000,
      pageSize: 1,
      show: false
    };
  },
  components: {
    // AddDialog,
    // SetRoleDialog
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    // 切换树
    handleGetDeptId(val) {
      let param = {
        id: val.id
      };
      this.$http({
        url: '/api/system/user/treeclick',
        method: 'post',
        data: param
      }).then(res => {
        let middleArr = res.data.data;
        let resArr = [];
        if (middleArr.children) {
          resArr.push(middleArr);
          middleArr.children.forEach(ele => {
            resArr.push(ele);
            if (ele.children) {
              this.addItem(resArr, ele.children);
            }
          });
        } else {
          resArr.push(middleArr);
        }
        this.tableData = resArr;
        this.total = resArr.length;
      });
    },
    addItem(arr, list) {
      list.forEach(ele => {
        arr.push(ele);
        if (ele.children) {
          this.addItem(arr, ele.children);
        }
      });
    },
    // 获取树数据
    handleGetTreeList() {
      this.$http({
        url: '/api/system/user/treelist',
        method: 'get'
      }).then(res => {
        let treeList = res.data.data;
        let middleArr = [];
        this.getDeptList(treeList, middleArr);
      });
    },
    getDeptList(treeList, middleArr) {
      treeList.forEach(item => {
        item.label = item.name;
        treeList.forEach(ele => {
          if (item.id === ele.pid) {
            if (item.children) {
              item.children.push(ele);
            } else {
              item.children = [];
              item.children.push(ele);
            }
          }
        });
      });
      treeList.forEach(ele => {
        if (ele.pid === 0) {
          middleArr.push(ele);
        }
      });
      this.deptList = middleArr;
    },
    handlejump() {
      this.$router.push({
        path: '/sx/history'
      });
    },
    handleSizeChange(val) {
      // this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(val, 89)
    },
    handleGetTableData() {
      this.$http({
        url: '/api/system/user/list',
        method: 'get',
        params: {
          account: this.ruleForm.account
        }
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.data.length;
      });
    }
  },
  beforeCreate() {
    console.log(this, 'beforeCreate');
  },
  beforeMount() {
    this.handleGetTableData();
    this.handleGetTreeList();
  },
  mounted() {
    // console.log(this.$root, '根元素');
    console.log(this.$data, '根');
  }
};
</script>
<style scoped>
.dept {
  width: 200px;
  min-width: 200px;
  border: 1px solid #ddd;
  margin-right: 10px;
  background: #fff;
}
.treeTitle {
  padding: 11px 15px;
  text-align: center;
  background: #e6e6e6;
  font-size: 15px;
  color: #777;
  font-weight: 500;
}
.deptList {
  padding: 15px;
}
.ht-flex {
  display: flex;
}
.index {
  min-width: 1140px;
}

/* .table-box {
    width: 100%;
    padding: 0;
    border: 1px solid red;
	} */

.table-demo {
  width: 100%;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: 1s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter,.fade-leave-to {
  opacity: 0;
} */

.fade-enter-active {
  animation: bounce-in 0.5s;
}
.fade-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>