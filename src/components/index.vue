<template>
  <div class="hello">
    <el-container>
      <el-header style="padding: 0;">
        <HeaderTem></HeaderTem>
      </el-header>
      <el-container>
        <el-aside style="width: 220px;padding: 0;background: #2E2E3C">
          <LayOut></LayOut>
        </el-aside>
        <el-main style="background: #E9EEF3;">
          <ShowArea></ShowArea>
        </el-main>
      </el-container>
    </el-container>
  </div>
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
    
  },
  mounted () {
    
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


