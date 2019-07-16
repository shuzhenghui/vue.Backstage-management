<template>
  <div>
    <myBread level1="订单管理" level2="订单列表"></myBread>
    <el-row class="search" :gutter="5">
      <el-col :span="2">
        <el-button type="success" plain size>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="option" label="操作" width="200">
        <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
        <el-button type="warning" icon="el-icon-delete" plain size="small"></el-button>
        <el-button type="danger" icon="el-icon-check" plain size="small"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import { users } from "../api/http";
export default {
  name: "users",
  data() {
    return {
      value: true,
      // 用户列表
      managerList: [],
      // 分页
      currentPage: 1,
      pageSize: 5,
      totalCount: 5,
      input3: "",
      tableData: []
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    }
  },
  created() {
    //   获取用户列表
    users({ pagenum: this.currentPage, pagesize: this.pageSize }).then(
      backData => {
        console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.users;
          this.totalCount = backData.data.data.total;
        }
      }
    );
  }
};
</script>

<style scoped>
</style>
