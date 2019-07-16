<template>
  <div>
    <myBread level1="权限管理" level2="角色列表"></myBread>
    <el-button>添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="姓名" width="160"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="address" label="电话" width="300"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="80"></el-table-column>
      <el-table-column prop="option" label="操作" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>

