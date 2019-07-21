<template>
  <div>
    <myBread level1="用户管理" level2="商品分类"></myBread>
    <el-row class="search" :gutter="5">
      <el-col :span="2">
        <el-button type="success" plain size>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" row-key="cat_id" border style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="200"></el-table-column>
      <el-table-column prop="cat_level" label="级别" width="100">
        <template slot-scope="scope">{{scope.row.cat_level | formatLevel}}</template>
      </el-table-column>
      <el-table-column prop="cat_delete" label="是否有效" width="100">
        <template slot-scope="scope">{{scope.row.cat_level | formateffc}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="option" label="操作" width="200">
        <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
        <el-button type="warning" icon="el-icon-delete" plain size="small"></el-button>
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
import { getCategories } from "../api/http";
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
  filters: {
    formatLevel(val) {
      switch (val) {
        case 0:
          return "一级";
          break;
        case 1:
          return "二级";
          break;
        case 2:
          return "三级";
          break;

        default:
          break;
      }
    },
    formateffc(val) {
      return val ? "无效" : "有效";
    }
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
    //   获取商品列表
    getCategories().then(backData => {
      console.log(backData);
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style scoped>
</style>
