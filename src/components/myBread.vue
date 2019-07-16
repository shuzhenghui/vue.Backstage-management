<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="myBread">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "myBread"
};
</script>

<style>
.myBread {
  background: #d3dce6;
  line-height: 45px;
  font-size: 15px;
  padding-left: 10px;
}
</style>
