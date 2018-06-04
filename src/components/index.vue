<template>
  <el-container>
    <el-header style="padding: 0;">
      <HeaderTem></HeaderTem>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <ht-menu :menus="allmenus" @select="handleSelect" router unique-opened></ht-menu>
			</el-aside>
      <el-container class="right-content-wrap">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- <el-container>
			<el-aside width="220px">
        <ht-menu :menus="allmenus" @select="handleSelect" router unique-opened></ht-menu>
			</el-aside>
			<el-container class="right-content-wrap">
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container> -->

  </el-container>
</template>

<script>
import htMenu from '@/components/ht-menu';
import HeaderTem from '@/components/header'
export default {
  name: 'cui',
  data () {
    return {
      allmenus: []
    }
  },
  components: {
    HeaderTem,
    htMenu
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
    },
    handleSelect() {

    }
  },
  mounted () {
    
  },
  beforeMount () {
    if (this.isLogin()) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push("/");
    }
    this.allmenus = JSON.parse(localStorage.getItem("users")).menus;
  }
}
</script>
<style scoped>
  
</style>
<style>
  .el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  height: 100%;
}

.el-main {
  background-color: #F7F8FC;
  color: #333;
  width: calc(90% - 200);
  min-width: 1000px;
  overflow: auto;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
  .el-container {
    height: 100%;
  }
  .el-menu {
    border-right: 0;
  }
  .ht-contain {
    overflow: auto;
    margin: -20px;
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
  .right-content-wrap {
    overflow: auto;
    width: calc(100% - 210px) !important;
  }
</style>


