<template>
  <div>
    <!-- 提示条 -->
    <el-alert class="myAlert" center title="添加商品信息" type="info" show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="parseInt(active)" align-center space="200px" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-tabs class="mytabs" v-model="active" tab-position="left">
      <el-tab-pane label="基本信息" name="1">用户管理</el-tab-pane>
      <el-tab-pane label="商品参数" name="2">配置管理</el-tab-pane>
      <el-tab-pane label="商品属性" name="3">角色管理</el-tab-pane>
      <el-tab-pane label="商品图片" name="4">
        <!-- 图片上传组件 -->
        <el-upload
          class="upload-demo"
          :headers="sendHeader"
          action="http://localhost:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="5">
        <el-button type="primary">添加商品</el-button>
        <quillEditor class="ql-editor"></quillEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "goodsAdd",
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      fileList: [],
      sendHeader: {
        authorization: window.sessionStorage.getItem("token")
      }
    };
  },
  methods: {
    handlePreview() {},
    handleRemove() {},
    handleSuccess() {
      this.$message.success("图片上传成功");
    }
  }
};
</script>

<style scoped>
.myAlert {
  margin: 20px 0;
}

.mytabs {
  margin-top: 20px;
}

.ql-editor {
  height: 443px;
}
</style>
