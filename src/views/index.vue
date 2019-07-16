<template>
  <el-container class="manage">
    <el-header class="myHeader">
      <el-row>
        <el-col :span="3">
          <img src="../assets/logo.png" alt="logo" style="height: 60px;" />
        </el-col>
        <el-col :span="20">
          <h2>蝙蝠侠后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click.prevent="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="left" style="width: 200px;">
        <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened router>
          <el-submenu v-for="(item,index) in manageList" :key="index" :index="''+index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="(it,idx) in item.children" :key="idx" :index="'/index/' + it.path">
              <i class="el-icon-menu"></i>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { manageList } from "../api/http";
export default {
  name: "index",
  data() {
    return {
      manageList: []
    };
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  },
  created() {
    //获取左侧管理列表
    manageList().then(backData => {
      // console.log(backData);
      if (backData.data.meta.status == 200) {
        this.manageList = backData.data.data;
      }
    });
  },
  methods: {
    logout() {
      this.$confirm("您确定要退出吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.manage {
  height: 100%;
  .myHeader {
    background: #b3c0d1;
    text-align: center;
    line-height: 60px;
    .logout {
      text-decoration: none;
      color: white;
    }
  }

  .main {
    background: #e9eef3;
    padding-top: 0;
  }
}
</style>
