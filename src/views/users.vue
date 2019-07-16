<template>
  <div>
    <myBread></myBread>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success">成功按钮</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myBread from "../components/myBread.vue";
export default {
  name: "users",
  data() {
      return {
          input3: ''
      }
  },
  components: {
    myBread
  }
};
</script>

<style>
</style>
