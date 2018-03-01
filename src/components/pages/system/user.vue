<template>
	<ht-page title="用户管理">
		<ht-control-bar>
			<el-input v-model.trim="ruleForm.account" clearable placeholder="账号" class="search-input-condition"></el-input>
			<el-button type="primary" round @click="handleSearch">搜索</el-button>
		</ht-control-bar>

		<div class="ht-flex">
			<div class="dept">
				<div class="treeTitle">组织机构</div>
				<div class="deptList">
					<el-tree :highlight-current="true" :data="deptList" @node-click="handleGetDeptId" style="border: none;"></el-tree>
				</div>
			</div>
			<div class="table-box">
				<el-table class="table-demo" :data="userList" stripe header-row-class-name="header-row">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000"></el-pagination>
			</div>
      
		</div>
	</ht-page>
</template>

<script>
	export default {
		data() {
			return {
				deptList: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }
        ],
				ruleForm: {
					account: ""
        },
        userList: [
          {
            "account":"xin.jin",
            "deptName":"华通银行",
            "name":"金鑫",
          },
          {
            "account":"zhaojin.jiang",
            "deptName":"华通银行",
            "name":"赵金江",
          }
        ]
			};
		},
		components: {
			// AddDialog,
			// SetRoleDialog
		},
		methods: {
			handleSearch() {},
      // 切换树
      handleGetDeptId() {},
      handleResetPw() {},
      handleFreeze() {},
      handlejump() {
        this.$router.push({
          path: '/sx/history'
        })
      },
      handleSizeChange() {},
      handleCurrentChange() {}
		},
		beforeMount() {

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
</style>