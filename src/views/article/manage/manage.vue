<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-input v-model="file.searchName" placeholder="搜索" style="width: 1150px"></el-input>
        <el-button type="primary" @click="search()">搜索<i class="el-icon-search el-icon--right"></i></el-button>
      </div>
    </el-card>

    <el-button size="mini" class="btn-add" @click="back()">返回<i class="el-icon-arrow-left el-icon--right"></i>
    </el-button>

    <el-button size="mini" class="btn-add" @click="dialogVisible=true">添加<i
      class="el-icon-folder-add el-icon--right"></i></el-button>

    <el-button  size="mini" class="btn-add" @click="handleAdd()">发布<i class="el-icon-folder-add el-icon--right"></i>
    </el-button>

    <el-dialog
      title="添加文件夹"
      :visible.sync="dialogVisible" width="30%">
      <el-form :model="fileAdd"
               ref="reasonForm" label-width="150px">
        <el-form-item label="文件夹名称：">
          <el-input v-model="fileAdd.fileName" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddFile()">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" >
      <el-table-column prop="type" label="类型" >
        <template slot-scope="scope">
          <i :class="tableData[scope.$index].type==1?'el-icon-folder-opened':'el-icon-document-remove'"></i>
          <el-button type="text" size="small" @click="handleGetFile(tableData[scope.$index].id,tableData[scope.$index].type)">{{tableData[scope.$index].docName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="docName" label="名称"></el-table-column>
      <el-table-column prop="addTime" label="发布时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getFile, addFile} from '@/api/md';

  export default {
    data() {
      return {
        file: {
          searchName: null,
          parentId: 0
        },
        arr:[0],
        fileAdd: {
          parentId: 0,
          fileName: '',
          content: '',
        },
        dialogVisible: false,
        tableData: []
      }
    },
    created() {
      getFile(this.file.searchName, this.file.parentId).then(response => {
        this.tableData = response.data
        //alert(response.data[0].type)
      });
    },
    methods: {
      search(){
        getFile(this.file.searchName, this.file.parentId).then(response => {
          this.tableData = response.data
          //alert(response.data[0].type)
        });
      },
      handleAdd() {
        let parentId = this.arr[this.arr.length-1];
        this.$router.push({path: '/memorandum/article-editor',query:{id:parentId}});
      },
      back(){
        this.arr.pop()
        // alert(this.arr.length-1)
        getFile(this.file.searchName,this.arr[this.arr.length-1]).then(response => {
          this.tableData = response.data
          //alert(response.data[0].type)
        });
      },
      handleGetFile(parentId,type) {
        this.arr.push(parentId)
        if (0==type){
          this.$router.push({path: '/memorandum/article-preview',query:{id:parentId}});
          //this.$router.push({path:'/home',query: {id:'1'}})
        }
        getFile(this.file.searchName, parentId).then(response => {
          this.tableData = response.data
        });
      },
      handleAddFile() {
        // alert(this.arr[this.arr.length-1])
        addFile(this.arr[this.arr.length-1],this.fileAdd.fileName,this.fileAdd.content).then(response => {
          getFile(this.file.searchName, this.arr[this.arr.length-1]).then(response => {
            this.dialogVisible=false //关闭弹框
            this.tableData = response.data // 加载新数据
            this.fileAdd.fileName=null
          });
        })
      },
    }
  }
</script>
