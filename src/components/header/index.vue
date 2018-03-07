<template>
  <div class="headerTem">
    <div class="header-title">
      <div class="header-log">XXX公司</div>
      <div class="user-box">
        <img :src="imgUrl" class="img-box"/>
        <div class="user-name">
          <el-dropdown size="small">
            <span class="el-dropdown-link name-color">
              你好: {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgUrl: '',
        userName: ''
      }
    },
    methods: {
      logOut() {
        console.log(111)
        this.$router.push({
          path: '/'
        })
      }
    },
    mounted () {
      this.imgUrl = localStorage.getItem('url');
      this.userName = localStorage.getItem('userName');
    }
  }
</script>
<style scoped>
  .header-title {
    background: #3B8EDA;
    height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .header-log {
    font-size: 16px;
    /* width: 200px; */
    text-align: center;
    line-height: 60px;
    height: 60px;
    margin-left: 100px;
  }
  .user-box {
    width: 150px;
    margin-right: 100px;
    /* background: red; */
    padding-top: 10px;
    display: flex;
  }
   .img-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-name {
    display: flex;
    height: 50px;
    line-height: 40px;
    margin-left: 20px;
  }
  .name-color {
    color: #ccc;
  }
</style>

