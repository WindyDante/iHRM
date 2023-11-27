<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <!-- 用户名称 -->
          <!-- 使用了可选链操作符?,指的是当?时,前面的变量为空,就不会往后执行了 -->
          <!-- 可选链操作符在vue2.7支持   变量名?操作方式 -->
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/WindyDante/iHRM">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent阻止a标签的默认事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置dialog(弹层) -->
    <!-- sync 可以接收子组件传过来的事件和值 -->
    <!-- 通过sync,el的组件就能接收到false的值从而关闭弹层 -->
    <el-dialog
      title="修改密码"
      @close="btnCancel"
      :visible.sync="showDialog"
      width="500px"
    >
      <!-- 放置表单 -->
      <el-form
        ref="passForm"
        label-width="120px"
        :model="passForm"
        :rules="rules"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="重复密码" prop="confirmPassword">
          <el-input
            v-model="passForm.confirmPassword"
            show-password
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOk"
            >确认修改</el-button
          >
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePassword } from "@/api/user";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
      passForm: {
        oldPassword: "", // 旧密码
        newPassword: "", // 新密码
        confirmPassword: "", // 确认密码字段
      },
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ], // 旧密码
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            min: 6,
            max: 16,
            message: "新密码的长度为6-16位之间",
          },
        ], // 新密码
        confirmPassword: [
          { required: true, message: "重复密码不能为空", trigger: "blur" },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              // value
              if (this.passForm.newPassword === value) {
                callback();
              } else {
                callback(new Error("重复密码和新密码输入不一致"));
              }
            },
          },
        ], // 确认密码字段
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    btnCancel() {
      this.$refs.passForm.resetFields(); // 重置表单
      this.showDialog = false;
    },
    btnOk() {
      this.$refs.passForm.validate(async (isOk) => {
        if (isOk) {
          // 如果校验都通过了
          // 调用接口
          await updatePassword(this.passForm);
          this.$message.success("修改密码成功");
          // 成功时,重置表单
          this.btnCancel();
        }
      });
    },
    updatePassword() {
      this.showDialog = true;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    async logout() {
      // 调用登出的action
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.username {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  background: #04c9be;
  color: #fff;
  margin-right: 0px 4px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .name {
          //  用户名称距离右侧距离
          margin: 0 10px;
          font-size: 16px;
        }
        .el-icon-setting {
          font-size: 20px;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
