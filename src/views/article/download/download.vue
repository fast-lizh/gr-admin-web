<template>
  <div class="app-container">
    <div class="address-layout">

      <el-row :gutter="20">
        <template v-for="(items,index) in this.softwareList">
          <el-col :span="4" style="text-align: center">
            <div class="out-border">
              <div class="layout-title">{{items.menuName}}</div>
              <div class="color-main address-content">
                <!--<img :src="img_home_project" class="total-icon"  @click="drawer = true">-->
                <img :src="items.menuIconUrl" class="total-icon" @click="getResume(items.id,items.level)">
              </div>
            </div>
          </el-col>


          <el-drawer
            :visible.sync="table"
            direction="ttb"
            size="50%"
            align="center"
          >
            <el-table :data="downloadResources" >
              <el-table-column property="menuName" label="软件名称" align="center"></el-table-column>

              <el-table-column label="软件图标" width="100" align="center">
                <template slot-scope="scope"><img :src="scope.row.menuIconUrl" width="50" height="50"></template>
              </el-table-column>

              <el-table-column property="downloadUrl" label="下载地址" align="center">
                <template slot-scope="scope">
                  <!--<img :src="scope.row.downloadUrl" width="50" height="50">-->
                  <el-link class="el-icon-download" :href="scope.row.downloadUrl" type="primary"></el-link>
                </template>
              </el-table-column>

              <el-table-column property="operationUser" label="上传用户" align="center"></el-table-column>

            </el-table>
          </el-drawer>

        </template>
      </el-row>
    </div>
  </div>


</template>

<script>

  import pdf from 'vue-pdf'
  import {fetchList,getDownload} from '@/api/download';

  export default {
    name: 'Pdf',
    components: {
      pdf
    },
    name: 'home',
    data() {
      return {
        table: false,
        dialog: false,
        loading: false,
        parentId: 0,
        softwareList: [],
        downloadResources:[
          {
            id:'',
            parentId:'',
            level:'',
            menuName:'',
            menuIconUrl:'',
            downloadUrl:'',
            operationUser:''
          }
        ]
      }
    }
    ,
    created() {
      fetchList(this.parentId).then(response => {
        this.softwareList = response.data // 加载新数据
      });
    }
    ,
    methods: {
      getResume(id,level) {
        if (level===0){
          fetchList(id).then(response => {
            this.softwareList = response.data // 加载新数据
          });
        }else {
          this.table=true;
          //获取下载
          getDownload(id).then(response => {
            this.downloadResources=response.data // 加载新数据
          });
        }
      },

    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }

  .address-content {
    padding: 20px;
    font-size: 18px
  }
</style>
