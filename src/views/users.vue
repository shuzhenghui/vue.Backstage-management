<template>
  <div>
    <myBread level1="用户管理" level2="用户列表"></myBread>

    <!-- 搜索框与添加按钮 -->
    <el-row class="search" :gutter="5">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model.trim="input3"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain size @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- //添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="ruleForm"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input type="text" v-model.trim="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input type="password" v-model.trim="formData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model.trim="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model.trim="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="160"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleSwitchChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="edit(scope.row)"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="handleDelete(scope.row.id)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            @click="checkBox(scope.row)"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑用户弹框 -->
    <el-dialog title="收货地址" :visible.sync="editUser">
      <el-form ref="form" :model="formData1" :rules="formRules1">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input disabled v-model="formData1.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="formData1.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="formData1.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUser = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="checkroles">
      <el-form :model="checkvalue">
        <el-form-item label="当前用户" label-width="120px">{{checkvalue.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="checkvalue.role_name" placeholder="请选择角色">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkroles = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 5, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import { users } from "../api/http";
import { statement } from "../api/http";
import { deleteuser } from "../api/http";
import { adduser, edituser, fenpei, userlist } from "../api/http";
export default {
  name: "users",
  data() {
    return {
      options: [],
      checkvalue: {
        username: "",
        role_name: "",
        id: 0
      },
      //分配角色弹框数据
      checkroles: false,
      checkBoxData: {},
      value: true,
      // 用户列表
      managerList: [],
      uId: "",
      type: "",
      // 分页
      currentPage: 1,
      pageSize: 5,
      totalCount: 5,
      // 搜索框
      input3: "",
      tableData: [],
      //编辑框数据
      dialogFormVisible: false,
      formData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      },
      //添加用户按钮数据
      editUser: false,
      formData1: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      formRules1: {
        username: [{ required: true }]
      }
    };
  },
  methods: {
    getroles() {
      //获取用户角色
      userlist().then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.options = backData.data.data;
        }
      });
    },
    //确认框
    checkBox(row) {
      this.checkroles = true;
      // console.log(row);
      this.checkvalue.username = row.username;
      this.checkvalue.role_name = row.role_name;
      this.checkvalue.id = row.id; //保存用户id
      this.getroles();
    },
    //搜索框
    search() {
      users({
        query: this.input3,
        pagenum: this.currentPage,
        pagesize: this.pageSize
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.users;
          this.totalCount = backData.data.data.total;
        }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },

    //获取用户列表请求
    async handleSwitchChange(user) {
      // console.log(user);
      // console.log(user.id, user.mg_state);
      const res = statement(user.id, user.mg_state).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status === 200) {
          this.$message.success(backData.data.meta.msg);
        } else {
          this.$message.error(backData.data.meta.msg);
        }
      });
    },

    //删除用户事件
    handleDelete(id) {
      this.$confirm("您确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteuser(id).then(backData => {
            // console.log(id);
            // console.log(backData);
            if (backData.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.currentPage = 1;
              this.search();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //添加用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          adduser(this.formData).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 201) {
              this.dialogFormVisible = false;
              this.search();
              this.$message.success(backData.data.meta.msg);
            } else if (backData.data.meta.status == 400) {
              this.$message.success(backData.data.meta.msg);
              return false;
            }
          });
        } else {
          this.$message.error("请正确输入!");
        }
      });
    },
    //编辑用户
    edit(row) {
      console.log(row);
      this.editUser = true;
      this.formData1 = row;
    },
    //确认提交
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          edituser(this.formData1).then(backData => {
            // console.log(backData);
            if (backData.data.meta.status == 200) {
              this.editUser = false;
              this.search();
              this.$message.success(backData.data.meta.msg);
            } else if (backData.data.meta.status == 400) {
              this.$message.success(backData.data.meta.msg);
              return false;
            }
          });
        } else {
          this.$message.error("请正确输入!");
        }
      });
    },
    //分配角色确认
    submitForm2(formName) {
      //若用户没有选角色就点确定传的id是字符串,会报错
      if (typeof this.checkvalue.role_name == "string") {
        this.checkroles = false;
        return;
      }
      // console.log(this.checkvalue.id, this.checkvalue.role_name);
      //进入这里代表选了角色
      fenpei({ id: this.checkvalue.id, rid: this.checkvalue.role_name }).then(
        backData => {
          // console.log(backData);
          if (backData.data.meta.status == 200) {
            this.$message.success(backData.data.meta.msg);
            this.checkroles = false;
            this.search();
          } else {
            this.$message.error("请正确输入!");
          }
        }
      );
    }
  },
  created() {
    //   获取用户管理中的用户列表
    this.search();
  },
  watch: {
    "this.pageSize"() {
      this.search();
    }
  }
};
</script>

<style scoped>
.editBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111;
  background: #646464a4;
}

/* .addBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1111;
  background: #646464a4;
} */
.mask {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
</style>
