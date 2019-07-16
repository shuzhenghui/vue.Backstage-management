<template>
  <div class="bgBox">
    <div class="loginBox">
      <h2 class="title">用户登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/http";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 4, max: 12, message: "长度在4到12个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在6到12个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.ruleForm).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 200) {
              this.$message.success(backData.data.meta.msg);
              window.sessionStorage.setItem("token", backData.data.data.token);
              this.$router.push("/index");
            } else {
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          alert("用户名或密码错误!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bgBox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginBox {
    width: 580px;
    height: 440px;
    padding: 60px 40px;
    box-sizing: border-box;
    border-radius: 6px;
    background: #fff;

    h2.title {
      margin-bottom: 20px;
    }
  }
}
</style>
