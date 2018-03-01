<template>
  <div class="headerTem">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>													
          <el-menu-item index="/system/user"><i class="icon-dot"></i>用户管理</el-menu-item>
          <el-menu-item index="/system/role" @click.native="getSelectedMenuTitle('角色管理')"><i class="icon-dot"></i>角色管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      getSelectedMenuTitle() {
        // console.log('点击')
        // this.$router.push({
        //   path: '/system/role'
        // })
      }
    }
  }
</script>
<style scoped>
  .headerTem {
    background: #2E2E3C;
  }
  .icon-dot {
    width: 6px;
    height: 6px;
		display: inline-block;
    border-radius: 50%;
    background: #148865;
		margin-top: -1px;
		margin-right: 10px;
	}
</style>

