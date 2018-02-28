<template>
  <div class="ht-page-content-wrap">
    <div class="center-flex-box">
      <div>
        <div class="banner">
          注册
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          account: '',
					password: '',
					// remember: false
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
						},
						{
							type: 'string',
							min: 1,
							message: '密码长度不能小于5位',
							trigger: 'blur'
						}
					]
				}
      }
    },
    methods: {
      handleSubmit() {
        
      }
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

