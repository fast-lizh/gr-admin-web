<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input v-model="title" placeholder="文章标题" style="width: 1150px"></el-input>
        <el-button type="primary" @click="submit">搜索<i class="el-icon-search el-icon--right"></i></el-button>
      </div>
    </el-card>

    <el-button size="mini" class="btn-add"  @click="centerDialogVisible=true">添加<i class="el-icon-folder-add el-icon--right"></i></el-button>


    <el-button size="mini" class="btn-add" @click="handleAdd()">发布<i class="el-icon-folder-add el-icon--right"></i></el-button>


    <el-dialog title="创建文件夹" :visible.sync="centerDialogVisible" width="30%" center>
      <div style="height: 60px">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <el-button @click="centerDialogVisible=false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </el-dialog>


    <el-table :data="tableData">
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <i :class="tableData[scope.$index].type==1?'el-icon-folder-opened':'el-icon-document-remove'"></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="time" label="发布时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
        tableData: [{
          type: 1,
          name: '王小虎',
          time: '2020-08-04'
        }, {
          type: 0,
          name: '王小虎',
          time: '2020-08-04'
        }, {
          type: 1,
          name: '王小虎',
          time: '2020-08-04'
        }, {
          type: 0,
          name: '王小虎',
          time: '2020-08-04'
        }]
      }
    }
  }
</script>
