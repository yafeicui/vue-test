<template>
  <el-container>
    <el-header style="padding: 0;">
      <HeaderTem></HeaderTem>
    </el-header>
    <el-container>
      <el-aside style="width: 220px;padding: 0;background: #2E2E3C; minWidth: 220px">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>系统管理</template>
            <el-menu-item-group>													
              <el-menu-item index="/system/user" @click.native="getSelectedMenuTitle('/system/user')"><i class="icon-dot"></i>用户管理</el-menu-item>
              <el-menu-item index="/system/role" @click.native="getSelectedMenuTitle('/system/role')"><i class="icon-dot"></i>角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>反欺诈</template>
            <el-menu-item-group>													
              <el-menu-item index="/antiFraud/rule" @click.native="getSelectedMenuTitle('/antiFraud/rule')"><i class="icon-dot"></i>规则分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>授信</template>
            <el-menu-item-group>													
              <el-menu-item index="/sx/history" @click.native="getSelectedMenuTitle('/sx/history')"><i class="icon-dot"></i>历史信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="background: #E9EEF3;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import HeaderTem from '@/components/header'
import LayOut from '@/components/layout'
import ShowArea from '@/components/pages/system/user.vue'
export default {
  name: 'cui',
  data () {
    return {
      
    }
  },
  components: {
    HeaderTem,
    LayOut,
    ShowArea
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    getSelectedMenuTitle(url) {
      this.$router.push({
        path: url
      })
    },
    isLogin() {
      var userId = localStorage.getItem("userId");
      var userName = localStorage.getItem("userName");
      if (userId && userName) return true;
      return false;
    }
  },
  mounted () {
    
  },
  beforeMount () {
    if (this.isLogin()) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push("/login");
    }
  }
}
</script>
<style scoped>
  
</style>
<style>
  .el-container {
    height: 100%;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item-group__title {
    height: 0;
    padding: 0;
  }
  .el-submenu__title {
    background: #2E2E3C;
    color: #AAA;
  }
  .el-menu-item{
    background: #2E2E3C;
    color: #AAA;
  }
  .el-menu-item.is-active {
    background: #48485B;
  }
  .el-menu-item:hover {
    background: #48485B;
  }
  .el-submenu__title:hover {
    background: #48485B;
  }
</style>


