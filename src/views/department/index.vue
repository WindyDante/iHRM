<template>
  <div class="container">
    <div class="app-container">
      <!-- 展示树形结构 -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <!-- 节点结构 -->
        <template v-slot="{ data }">
          <el-row
            style="width: 100%; height: 40px"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
                <!-- 显示区域的内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <!-- 下拉菜单的选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartment } from "@/api/departement";
import { transListToTreeData } from "@/utils";
export default {
  name: "Department",
  data() {
    return {
      depts: [], // 数据属性
      defaultProps: {
        label: "name", // 要显示的字段的名字,会在depts中进行读取
        children: "children", // 读取子节点下的字段名
      },
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment();
      this.depts = transListToTreeData(result, 0);
    },
  },
};
</script>


<style  scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin-right: 50px;
}
</style>