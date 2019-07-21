<template>
  <div>
    <myBread level1="权限管理" level2="权限列表"></myBread>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="index" label="#" width="40"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column prop="level" label="层级" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rightlist } from "../api/http";
export default {
  name: "rights",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    rightlist().then(backData => {
      // console.log(backData);
      for (let i = 0; i < backData.data.data.length; i++) {
        switch (backData.data.data[i].level) {
          case '0':
            backData.data.data[i].level = '一级'
            break;
          case '1':
            backData.data.data[i].level = '二级'
            break;
          case '2':
            backData.data.data[i].level = '三级'
            break;
        }
      }
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style scoped>
</style>

