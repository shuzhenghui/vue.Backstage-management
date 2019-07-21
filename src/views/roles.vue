<template>
  <div>
    <myBread level1="权限管理" level2="角色列表"></myBread>
    <el-button @click="addRoleaaa">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="(tag1,index) in props.row.children" :key="index">
            <el-col :span="4">
              <el-tag class="myTag" closable @close="close(props.row,tag1)">{{tag1.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(tag2,index) in tag1.children" :key="index">
                <el-col :span="6">
                  <el-tag
                    class="myTag"
                    closable
                    type="success"
                    @close="close(props.row,tag2)"
                  >{{tag2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="(tag3,index) in tag2.children"
                    :key="index"
                    closable
                    type="warning"
                    @close="close(props.row,tag3)"
                    class="myTag"
                  >{{tag3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editRoles(props.row)"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleterole(props.row)"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            @click="checkcheck(props.row)"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色弹框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="rules">
        <el-form-item label="角色名称" label-width="100px" prop="username">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px" prop="desc">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoledesc">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色弹框 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoledesc">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限弹框 -->
    <el-dialog title="权限分配" :visible.sync="checkVisible" width="760px">
      <el-tree
        :data="data"
        ref="tree"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultkeys"
        default-expand-all
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkVisible = false">取 消</el-button>
        <el-button type="primary" @click="giveRightaaa">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  userlist,
  deleteRight,
  righttree,
  giveRight,
  editRole,
  deleteRole,
  addRole
} from "../api/http";
export default {
  name: "roles",
  data() {
    return {
      // 添加角色
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      addVisible: false,
      // 编辑角色
      editVisible: false,
      form: {
        roleName: "",
        roleDesc: "",
        id: 0
      },
      rules: {
        roleName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      },
      // 分配权限
      roleId: "",
      tableData: [],
      checkVisible: false,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultkeys: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  methods: {
    //添加角色
    addRoledesc() {
      addRole(this.addForm).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 201) {
          this.$message.success(backData.data.meta.msg);
          this.addVisible = false;
          this.getData();
        } else {
          this.$message.error(backData.data.meta.msg);
        }
      });
    },
    addRoleaaa() {
      this.addVisible = true;
    },
    // 编辑角色
    editRoledesc() {
      editRole(this.form).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.$message.success("修改成功");
          this.editVisible = false;
        } else {
          this.$message.error(backData.data.meta.msg);
        }
      });
    },
    editRoles(row) {
      // console.log(row);
      this.editVisible = true;
      this.form = row;
      // row.roleDes
      // row.roleName
    },
    //删除角色
    deleterole(row) {
      deleteRole({ id: row.id }).then(backData => {
        // console.log(backData);

        this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (backData.data.meta.status == 200) {
              this.$message.success(backData.data.meta.msg);
              this.getData();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },

    //分配权限
    giveRightaaa() {
      const totalrids = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ];
      const rids = totalrids.join(",");
      // console.log(rids);
      console.log(this.roleId.id);
      giveRight({ roleId: this.roleId.id, rids: rids }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.getData();
          this.$message.success(backData.data.meta.msg);
          this.checkVisible = false;
        } else {
          this.$message.error(backData.data.meta.msg);
        }
      });
    },
    getrighttree() {
      righttree().then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.data = backData.data.data;
        }
      });
    },
    checkcheck(row) {
      this.getrighttree();
      let keys = [];
      // console.log(row);
      function getId(row) {
        for (let i = 0; i < row.children.length; i++) {
          if (row.children[i].children) {
            getId(row.children[i]);
          } else {
            keys.push(row.children[i].id);
          }
        }
      }
      getId(row);
      // console.log(keys);
      this.defaultkeys = keys;
      this.checkVisible = true;
      this.roleId = row;
    },
    //获取数据
    getData() {
      userlist().then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data;
        }
      });
    },
    close(row, tag) {
      console.log(row.id, tag.id);
      deleteRight({ roleId: row.id, rightId: tag.id }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          row.children = backData.data.data;
          this.$message.success(backData.data.data.msg);
        } else {
          this.$message.warning(backData.data.data.msg);
        }
      });
    }
  },
  created() {
    this.getData();
    this.getrighttree();
  }
};
</script>

<style scoped>
.myTag {
  margin: 0 10px 10px 0;
}
</style>

