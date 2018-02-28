<template>
  <div class="headerTem">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>													
          <el-menu-item index="/" @click.native="getSelectedMenuTitle('用户管理')"><i class="icon-dot"></i>用户管理</el-menu-item>
          <el-menu-item index="/system/role" @click.native="getSelectedMenuTitle('角色管理')"><i class="icon-dot"></i>角色管理</el-menu-item>
          <el-menu-item index="/system/dept" @click.native="getSelectedMenuTitle('部门管理')"><i class="icon-dot"></i>部门管理</el-menu-item>
          <el-menu-item index="/system/dict" @click.native="getSelectedMenuTitle('字典管理')"><i class="icon-dot"></i>字典管理</el-menu-item>
          <el-menu-item index="/system/menu" @click.native="getSelectedMenuTitle('菜单管理')"><i class="icon-dot"></i>菜单管理</el-menu-item>
          <el-menu-item index="/system/log" @click.native="getSelectedMenuTitle('业务日志')"><i class="icon-dot"></i>业务日志</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>导航二</template>
        <el-menu-item-group>													
          <el-menu-item index="/system/mgr" @click.native="getSelectedMenuTitle('用户管理')"><i class="icon-dot"></i>用户管理</el-menu-item>
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
        console.log('点击')
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

