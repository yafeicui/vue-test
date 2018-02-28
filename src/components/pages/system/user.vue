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
			<div class="ht-paged-table-wrap table-box">
				<el-table ref="htTable" :data="userList">
					<el-table-column label="账号" prop="account" align="center"></el-table-column>
					<el-table-column label="姓名" prop="name" align="center"></el-table-column>
					<el-table-column label="部门" prop="deptName" align="center"></el-table-column>
					<el-table-column label="状态" prop="statusName" width='60' align="center"></el-table-column>
					<el-table-column label="操作" align="center" width="180">
						<template slot-scope="scope">
							<!-- <ht-icon-button v-if="validAccess(ACCESS_CODE.USER_EDIT)" curIconType="ht-icon-bj" tip="编辑" @onBtnIcon="handleEdit(scope.row)"></ht-icon-button>
            		<ht-icon-button v-if="validAccess(ACCESS_CODE.USER_DELETE)" curIconType="ht-icon-sc" tip="删除" @onBtnIcon="handleDelete(scope.row)"></ht-icon-button> -->
							<el-dropdown>
								<ht-text-button class="el-dropdown-link">更多<i class="el-icon-arrow-down"></i></ht-text-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.native="handleResetPw(scope.row)">重置密码</el-dropdown-item>
									<el-dropdown-item @click.native="handleFreeze(scope.row)">{{scope.row.status === 'close'? "解冻用户" : "冻结用户"}}</el-dropdown-item>
									<el-dropdown-item @click.native="handleSetRole(scope.row)">分配角色</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</ht-page>
</template>

<script>
	export default {
		data() {
			return {
				deptList: [],
				ruleForm: {
					account: ""
        },
        userList: [
          {
            "account":"xin.jin",
            "birthdayName":"1992-11-23",
            "deptId":"1",
            "deptName":"华通银行",
            "id":"1",
            "name":"金鑫",
            "roleIds":"1",
            "roleNames":"系统管理"
          },
          {
            "account":"zhaojin.jiang",
            "birthdayName":"2018-02-26",
            "deptId":"1",
            "deptName":"华通银行",
            "id":"968045284951105537",
            "name":"赵金江",
            "roleIds":"1",
            "roleNames":"系统管理",
          }
        ]
			};
		},
		components: {
			// AddDialog,
			// SetRoleDialog
		},
		methods: {
			handleSearch() {

      },
      // 切换树
      handleGetDeptId() {

      }
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
	
	.table-box {
		width: 100%;
	}
	
	.table-demo {
		width: 100%;
	}
</style>