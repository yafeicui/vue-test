<template>
  <div class="ht-page-content-wrap">
    <div class="center-flex-box">
      <div>
        <div class="banner">
          登录入口
        </div>
        <div class="box-card">
          <el-form ref="loginForm" :model="loginForm" :rules="ruleInline" label-width="90px">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="loginForm.account" placeholder="请输入账号" style="width: 84%;" @keyup.enter.native="handleSubmit"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" style="width: 84%;" @keyup.enter.native="handleSubmit"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
              <el-button type="primary" size="large" @click="handleSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        loginForm: {
          account: '',
					password: '',
        },
        ruleInline: {
					account: [{
						required: true,
						message: '请填写用户名',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请填写密码',
							trigger: 'blur'
						}
					]
				}
      }
    },
    methods: {
      handleSubmit() {
        var loginData = {
          name: this.loginForm.account,
          password: this.loginForm.password
        }
        this.$http({
          url: '/api/login',
          method: 'post',
          data: loginData
        }).then((res) => {
          axios.defaults.headers.common['accessToken'] = res.data.token
          localStorage.setItem("userId", res.data.password);
          localStorage.setItem("userName", res.data.account);
          localStorage.setItem('users',JSON.stringify(res.data));
          localStorage.setItem('auth',res.data.token)
          localStorage.setItem("url", 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1230799154,4259669654&fm=27&gp=0.jpg');
          this.$router.push({
            path: '/system'
          })
        })
      }
    },
    mounted () {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
  }
</script>
<style scoped>
  .ht-page-content-wrap {
    background: linear-gradient(top, #195a97, #3b8eda);
    height: 100%;
  }
  .center-flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
	#login {
		height: 100%;
		background: #f0f0f0;
	}
	
	.banner {
    color: #f0f0f0;
		font-size: 50px;
		text-align: center;
  }
  
	.box-card {
		margin-top: 30px;
    width: 480px;
    height: 100%;
    padding: 20px 0;
    background: #f0f0f0;
	}
	
	.title {
    text-align: center;
    color: #f0f0f0;
		font-size: 20px;
	}
	
	.submitBtn {
		margin: 0px;
		margin-top: 10px;
	}
	.submitBtn button {
		width: 84%;
	}
	.remember {
		padding-left: 90px;
	}
</style>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>

