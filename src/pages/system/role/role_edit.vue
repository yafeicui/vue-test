<template>
	<el-dialog :visible.sync="isShow" v-if="isShow" title="修改角色" :close-on-click-modal="false" :show-close="false" class="ht-dialog-content-wrap small" width="400px">
		<el-form ref="editRoleForm" :model="editRole" label-width="80px" :rules="ruleValidate" class="editRoleForm" style="padding-right:10px">
			<el-form-item label="角色名" prop="roleName">
				<el-input v-model="editRole.roleName" placeholder="请输入角色名"></el-input>
			</el-form-item>
			<el-form-item label="角色值" prop="roleValue">
				<el-input v-model="editRole.roleValue" placeholder="请输入角色值"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="editRole.tips" placeholder="请输入角色别名"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="handleCancel">取消</el-button>
			<el-button type="primary" @click="handleSubmit">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
  props: ['roleList'],
  data() {
    return {
      isShow: false,
      editRole: {
        roleName: '',
        roleValue: '',
        tips: ''
      },
      ruleValidate: {
        roleName: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
          }
        ],
        roleValue: [
          {
            required: true,
            message: '角色值不能为空',
            trigger: 'blur'
          }
        ]
      },
      isHave: false,
      id: 0
    };
  },
  mounted() {
    console.log(this.$parent, '父类');
  },
  methods: {
    show(role) {
      this.isShow = true;
      this.id = role.id;
      this.editRole = Object.assign(this.editRole, role);
    },
    handleSubmit() {
      this.isHave = false;
      this.$refs['editRoleForm'].validate(valid => {
        this.roleList.forEach(item => {
          if (item.roleName == this.editRole.roleName && item.id != this.id) {
            this.isHave = true;
          }
        });
        if (this.isHave) {
          this.$message({ message: '角色名重复', type: 'error' });
          return;
        } else {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.$emit('on-success', this.editRole);
          this.handleCancel();
        }
      });
    },
    handleCancel() {
      this.editRole.tips = '';
      this.$refs.editRoleForm.resetFields();
      this.isShow = false;
    }
  }
};
</script>