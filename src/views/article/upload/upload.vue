<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">软件菜单</span>
      <el-button
        class="btn-add"
        v-show="menuShow"
        @click="handleAddMenu()"
        size="mini">
        添加菜单
      </el-button>

      <el-button
        class="btn-add"
        v-show="softwareShow"
        @click="handleAddSoftware()"
        size="mini">
        上传软件
      </el-button>

    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{scope.row.menuName}}</template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <!--<el-table-column label="前端名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>-->
        <el-table-column label="前端图标" width="100" align="center">
          <template slot-scope="scope"><img :src="scope.row.menuIconUrl" width="50" height="50"></template>
        </el-table-column>

        <!-- <el-table-column label="是否显示" width="100" align="center">
           <template slot-scope="scope">
             <el-switch
               @change="handleHiddenChange(scope.$index, scope.row)"
               :active-value="0"
               :inactive-value="1"
               v-model="scope.row.hidden">
             </el-switch>
           </template>
         </el-table-column>-->

        <!--<el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>-->
        <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {fetchList, deleteMenu,} from '@/api/softwareMenu'

  export default {
    name: "menuList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        parentId: 0,
        menuShow: true, //软件菜单是否显示
        softwareShow: false,//软件上传是否显示
      }
    },
    created() {
      this.resetParentId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.resetParentId();
        this.getList();
      }
    },
    methods: {
      resetParentId() {
        this.listQuery.pageNum = 1;
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 0;
        }
      },
      handleAddMenu() {
        this.$router.push({path: '/memorandum/add-category'});
      },
      handleAddSoftware() {
        this.$router.push({path: '/memorandum/add-software', query: {"parentId": this.parentId}});
      },
      getList() {
        if (this.$route.query.parentId != undefined) {
          this.parentId = this.$route.query.parentId
        }
        if (this.parentId != 0) {
          this.softwareShow = true;
          this.menuShow = false;
        }

        fetchList(this.parentId, this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleHiddenChange(index, row) {
        /*updateHidden(row.id, {hidden: row.hidden}).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });*/
      },
      //查看下级
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/memorandum/article-upload', query: {parentId: row.id}})
      },
      handleUpdate(index, row) {
        if (row.level == 0) {//如果是菜单
          this.$router.push({path: '/memorandum/add-category', query: {"id": row.id,"operation":"update"}});
        }
        if (row.level == 1) {//如果是软件
          this.$router.push({path: '/memorandum/add-software', query: {"id": row.id,"operation":"update"}});
        }
        //this.$router.push({path: '/ums/updateMenu', query: {id: row.id}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            //重新加载
            fetchList(row.parentId, this.listQuery).then(response => {
              this.listLoading = false;
              this.list = response.data.list;
              this.total = response.data.total;
            });

          });
        });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 1) {
          return '二级';
        }
      },
      disableNextLevel(value) {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
