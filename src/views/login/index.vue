<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <!-- ref:可以获取当前form的实例,来对此进行整体的一个校验  -->
        <!-- rules:所绑定的规则 -->
        <!-- model:当前表单所绑定的数据结构 -->
        <el-form ref="form" :rules="loginRules" :model="loginForm">
          <el-form-item prop="mobile">
            <el-input
              v-model="loginForm.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px" @click="login"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        mobile: "",
        password: "",
        isAgree: false,
      },
      loginRules: {
        mobile: [
          {
            // 表示当前表单为必需项
            required: true,
            // 如果不填就给出对应的提示message
            message: "请输入手机号",
            // 触发trigger:什么时候触发
            // 失去焦点时触发
            trigger: "blur",
          },
          {
            // 正则表达式校验pattern
            pattern: /^1[3-9]\d{9}/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          {
            // 表示当前表单为必需项
            required: true,
            // 如果不填就给出对应的提示message
            message: "请输入密码",
            // 触发trigger:什么时候触发
            // 失去焦点时触发
            trigger: "blur",
          },
          {
            // min:最小值
            min: 6,
            // max:最大值
            max: 16,
            message: "密码长度应该为6-16位之间",
            trigger: "blur",
          },
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              // rule校验规则
              // value校验的值
              // callback 函数  - promise resolve reject
              // 当value通过校验时触发正常的回调,如果没有通过,将会触发对应的异常
              value ? callback() : callback(new Error("您必须勾选用户协议"));
            },
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.form.validate((isOk) => {
        // validate会传入一个参数,这个参数表示整个form表单的验证是否通过了
        if (isOk) {
          this.$store.dispatch("user/login", this.loginForm);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
