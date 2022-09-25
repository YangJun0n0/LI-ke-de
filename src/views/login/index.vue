<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
      <!--帝可得图片 -->
      <div class="title-container">

        <img src="@/assets/common/logo.png" alt="">

      </div>
      <div class="fromDate">
        <!-- 手机框 -->
        <el-form-item prop="name">
          <i class="el-icon-mobile-phone" />
          <el-input v-model="loginForm.loginName" placeholder="请输入手机号码" />
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <div>
            <i class="el-icon-unlock" />
            <el-input ref="pwd" v-model="loginForm.password" placeholder="请输入密码" :type="passwordType" />

            <span class="svg-container" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </div></el-form-item>

        <!-- 验证码 -->
        <el-row type="flex" class="row-bg">
          <el-form-item prop="verificationCode" class="codes">
            <el-col :span="17">
              <i class="el-icon-bangzhu" />
              <el-input v-model="loginForm.code" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="7" style="height:50px;">
              <img :src="srcCode" alt="" @click="imgCode()">
            </el-col></el-form-item>
        </el-row>
        <!-- 点击框 -->
        <el-button :loading="loading" style="width:100%;height:52px;background:#4764e6;color:#fff" @click="handleLogin">登录</el-button>
      </div>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import { getimgCodeAPI, getLoginAPI } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: { // 账号密码
        clientToken: 'KEKRDRpDQEfPNs2FSLqHCeG9w8X2VDcf',
        loginName: 'admin',
        password: 'admin',
        code: '',
        loginType: 0
      },
      loginRules: {
        name: [
          // { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 3, max: 9, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [ // 密码校验
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 3, max: 16, message: '密码格式不对', trigger: 'blur' }
        ],
        verificationCode: [ // 验证码
          // { required: true, message: '请输入', trigger: 'blur' },
          // { min: 4, max: 4, message: '密码格式不对', trigger: 'blur' }
        ]
      },
      loading: false, // 加载Login
      passwordType: 'password',
      srcCode: '' // 验证码地址

    }
  },
  watch: {

  },
  created() {
    this.imgCode()
  },
  methods: {
    async imgCode() {
      try {
        const data = await getimgCodeAPI(this.loginForm.clientToken)

        this.srcCode = window.URL.createObjectURL(data.data)
      } catch (error) {
        console.log(error, '验证码')
      }
    },
    showPwd() {
      this.passwordType === 'password'
        ? (this.passwordType = '')
        : (this.passwordType = 'password')
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async handleLogin() {
      try {
        // const { data } = await getLoginAPI(this.loginForm)
        this.loading = true
        await this.$store.dispatch('user/LoginAction', this.loginForm)
      } catch (error) {
        console.log(error.msg, '登录')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$light_gray:#fff;
$cursor: #ccc;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position:relative;
    background-image: url("~@/assets/common/background.png"); // 设置背景图片
    background-size: cover;// 将图片位置设置为充满整个屏幕
    overflow: hidden;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;

      color: $light_gray;

      height: 47px;
      color: #999999;
      caret-color: $cursor;
    }
  }

  .el-form-item {
    height: 52px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    color: #454545;
      .el-form-item__content{
        width: 446px;
        height: 50px;
      padding-left: 15px;
      i{
        font-size: 16px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>

$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  // 表单框
  .login-form {
     position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    border-radius: 10px;
// 帝可徳图片
  .title-container {
    position: absolute;
    top: 0%;
    left: 50%;
    margin-left: -48px;
    margin-top: -48px;
    width: 96px;
    height: 96px;
      img {
        width: 100%;
      }
  }
  .fromDate{
    width: 448px;
    height: 280px;

  }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

}
</style>
