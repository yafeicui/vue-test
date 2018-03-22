<template>
	<ht-page title="角色管理">
		<ht-control-bar>
			<el-input v-model.trim="ruleForm.roleName" clearable placeholder="角色名称" class="search-input-condition"></el-input>
			<el-button type="primary" round @click="handleSearch">搜索</el-button>
			<el-button slot="right" type="primary" round @click="handleAddRole">新建</el-button>
		</ht-control-bar>

		<div class="table-box">
			<el-table ref="htTable" class="table-demo" :data="roleList">
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="10" layout="sizes, prev, pager, next" :total="2"></el-pagination>
		</div>
    <p>{{num1}}</p>
    <el-button @click="changeState">改变状态管理数据</el-button>
    <el-button @click="handleDesCount">count减1</el-button>
		<add-dialog ref="addDialog" @on-success="addSuccess" :roleList="roleList"></add-dialog>
		<edit-dialog ref="editDialog" @on-success="editSuccess" :roleList="roleList"></edit-dialog>
	</ht-page>
</template>

<script>
	import AddDialog from "./role_add.vue"
  import EditDialog from "./role_edit.vue"
  import {mapState, mapActions, mapMutations} from 'Vuex'
	export default {
		data() {
			return {
				ruleForm: {
					roleName: '',
					roleType: ''
				},
				roleList: [
					{
						roleName: '11',
						roleValue: 22,
						tips: '测试',
						id: 1
					},
					{
						roleName: '22',
						roleValue: 33,
						tips: '测试2',
						id: 2
					}
				],
				num: 3,
        id: 0,
        num1: 0
			}
    },
		components: {
			AddDialog,
			EditDialog
    },
		methods: {
      ...mapActions(['changeCount', 'desCount']),
      ...mapMutations(['desMuCount']),
			handleSearch() {
				// var arr = [];
				// var midd
				// if(this.ruleForm.roleName) {
				// 	this.roleList.forEach((item) => {
				// 		if(item.roleName == this.ruleForm.roleName) {
				// 			arr.push(item)
				// 		}
				// 	})
				// 	console.log(arr,111)
				// 	this.roleList = arr;
				// }else {

				// }
			},
      addSuccess(val){
				this.roleList.push({
					roleName: val.roleName,
					roleValue: val.roleValue,
					tips: val.tips,
					id: this.num++
				})
			},
			editSuccess(val) {
				console.log(this.id)
				this.roleList.forEach((item, index) => {
					if(item.id == this.id) {
						item.roleName = val.roleName;
						item.roleValue = val.roleValue;
						item.tips = val.tips;
					}
				})
				
			},
			handleAddRole() {
				this.$refs.addDialog.show()
			},
			handleEdit(row) {
				this.id = row.id;
				this.$refs.editDialog.show(row)
			},
			handleDelete(row) {
				this.$confirm('确实删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.roleList.forEach((item, index) => {
						if(item.roleName == row.roleName) {
							this.roleList.splice(index, 1);
						}
					})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getState() {
        this.num1 = this.$store.state.count
        // console.log(this.num1, 12)
			  // console.log(this.$store.state, 55)
      },
			handleSizeChange() {},
      handleCurrentChange() {},
      // 改变状态管理数据
      changeState() {
        this.changeCount(3)
        this.getState();
      },
      handleDesCount() {
        this.desMuCount();
        this.getState();
      }
		},
		beforeMount() {
      this.getState()
		}
	}
</script>