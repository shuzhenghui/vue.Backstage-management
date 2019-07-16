<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="myBread">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "myBread",
  props: ['level1','level2']
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
