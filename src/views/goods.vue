<template>
  <div>
    <myBread level1="商品管理" level2="商品列表"></myBread>
    <el-row class="search" :gutter="5">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain size>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作" width="354"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 9, 18, 28]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import { getGoods } from "../api/http";
export default {
  name: "goods",
  data() {
    return {
      query: "",
      // 商品列表
      tableData: [],
      // 分页
      currentPage: 1,
      pageSize: 9,
      totalCount: 5
    };
  },
  methods: {
    //获取商品列表
    getData() {
      getGoods({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pageSize
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.totalCount = backData.data.data.total;
          this.tableData = backData.data.data.goods;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    }
  },
  created() {
    //   获取用户列表
    this.getData();
  }
};
</script>

<style scoped>
</style>
