<template>
  <div>
    <myBread></myBread>
    <el-row class="search" :gutter="5">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain size>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="姓名" width="160"></el-table-column>
      <el-table-column prop="name" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="address" label="电话" width="300"></el-table-column>
      <el-table-column prop="status" label="用户状态" width="80"></el-table-column>
      <el-table-column prop="option" label="操作" width="200"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
import myBread from "../components/myBread.vue";
export default {
  name: "users",
  data() {
    return {
      // 分页
      currentPage: "",
      input3: "",
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
  },
  components: {
    myBread
  }
};
</script>

<style scoped>
</style>
