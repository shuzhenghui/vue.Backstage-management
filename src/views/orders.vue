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
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="80"></el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="200"></el-table-column>
      <el-table-column label="操作" width="80">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="option" label="操作" width="200">
        <el-button type="primary" @click="eidtOrder" icon="el-icon-edit" plain size="small"></el-button>
      </el-table-column>
    </el-table>

    <!-- 订单编辑弹框 -->
    <el-dialog title="收货地址" :visible.sync="orderVisible">
      <el-form :model="form">
        <el-form-item label="省市区/县" label-width="100px">
          <el-cascader
            v-model="city"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderVisible = false">确 定</el-button>
      </div>
    </el-dialog>

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
    <Distpicker></Distpicker>
  </div>
</template>

<script>
import Distpicker from "v-distpicker";
import options from "../assets/city_data_2017";
import { getorders } from "../api/http";
export default {
  name: "users",
  components: {
    Distpicker
  },
  data() {
    return {
      //订单修改
      orderVisible: false,
      form: {
        address: ""
      },
      //省市联动
      city: "",
      options,
      value: true,
      // 用户列表
      managerList: [],
      // 分页
      currentPage: 1,
      pageSize: 9,
      totalCount: 5,
      input3: "",
      tableData: []
    };
  },
  methods: {
    //省市联动
    handleChange(value) {
      console.log(value);
    },
    //修改订单
    eidtOrder() {
      this.orderVisible = true;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //   获取用户列表
    getData() {
      getorders({ pagenum: this.currentPage, pagesize: this.pageSize }).then(
        backData => {
          // console.log(backData);
          if (backData.data.meta.status == 200) {
            this.tableData = backData.data.data.goods;
            this.totalCount = backData.data.data.total;
          }
        }
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
</style>
