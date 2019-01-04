<template>
	<el-dialog :visible.sync="isShow" v-if="isShow" title="添加角色" :close-on-click-modal="true" :show-close="false" class="ht-dialog-content-wrap small" width="400px">
		<el-form ref="addRoleForm" :model="role" label-width="80px" :rules="ruleValidate" class="addRoleForm" style="padding-right:10px">
			<el-form-item label="角色名" prop="roleName">
				<el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
			</el-form-item>
      <el-form-item label="角色值" prop="roleValue">
				<el-input v-model="role.roleValue" placeholder="请输入角色值"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="role.tips" placeholder="请输入角色别名"></el-input>
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
      role: {
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
      isHave: false
    };
  },
  // mounted() {
  //   console.log(this.$parent, '父类');
  // },
  methods: {
    show() {
      this.isShow = true;
    },
    handleSubmit() {
      this.isHave = false;
      this.$refs['addRoleForm'].validate(valid => {
        this.roleList.forEach(item => {
          if (item.roleName == this.role.roleName) {
            this.isHave = true;
          }
        });
        if (this.isHave) {
          this.$message({ message: '角色名重复', type: 'error' });
        } else {
          this.$emit('on-success', this.role);
          this.handleCancel();
        }
      });
    },
    handleCancel() {
      this.role.tips = '';
      this.$refs.addRoleForm.resetFields();
      this.isShow = false;
    }
  }
};
</script>