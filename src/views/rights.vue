<template>
  <div>
    <myBread level1="权限管理" level2="权限列表"></myBread>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="number" label="#" width="40"></el-table-column>
      <el-table-column prop="date" label="姓名" width="200"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="address" label="电话" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
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

