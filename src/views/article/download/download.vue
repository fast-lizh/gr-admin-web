<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="4" style="text-align: center" >
          <div class="out-border" >
            <div class="layout-title">数据库</div>
            <div class="color-main address-content">
              <!--<img :src="img_home_project" class="total-icon"  @click="drawer = true">-->
              <img :src="download_db" class="total-icon"  @click="getResume()">
            </div>
          </div>
        </el-col>

        <!-- <el-drawer
           title="个人简历"
           :visible.sync="drawer"
           :direction="direction"
           :before-close="handleClose"
           size="30%">

           &lt;!&ndash;<pdf
             ref="pdf"
             :src="pdfUrl"
             :page="currentPage"
           >

           </pdf>&ndash;&gt;

           <div class="pdf" v-show="fileType === 'pdf'">
             <p class="arrow">
               <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>
               {{currentPage}} / {{pageCount}}

               <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>
             </p>
             <pdf
               :src="pdfUrl"
             :page="currentPage"
             @num-pages="pageCount=$event"
             @page-loaded="currentPage=$event"
             @loaded="loadPdfHandler">
             </pdf>
           </div>

         </el-drawer>-->

        <!-- <el-drawer
           title="个人简历"
           :visible.sync="drawer"
           :with-header="false">
           &lt;!&ndash;<span>我来啦!</span>&ndash;&gt;
           <pdf
             ref="pdf"
             :src="pdfUrl">
           </pdf>
         </el-drawer>-->

        <el-col :span="4" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">GITHUB-WEB</div>
            <div class="color-main address-content">
              <a href="https://github.com/fast-lizh/gr-admin-web">
                <img :src="img_home_github" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">网盘-ggvu</div>
            <div class="color-main address-content">
              <a href="https://pan.baidu.com/s/1BerGmQb4DO06tgNZXJCeFw">
                <img :src="img_home_could" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>

        <el-col :span="4" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">知乎主页</div>
            <div class="color-main address-content">
              <a href="https://www.zhihu.com/people/lizhihe-81-83">
                <img :src="img_home_zhihu" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>

        <el-col :span="4" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">知乎主页</div>
            <div class="color-main address-content">
              <a href="https://www.zhihu.com/people/lizhihe-81-83">
                <img :src="img_home_zhihu" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>



        <el-col :span="4" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">知乎主页</div>
            <div class="color-main address-content">
              <a href="https://www.zhihu.com/people/lizhihe-81-83">
                <img :src="img_home_zhihu" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
    <!--<div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">200</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="total-frame">
            <img :src="img_home_week_amount" class="total-icon">
            <div class="total-title">近7天销售总额</div>
            <div class="total-value">￥50000.00</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="total-frame">
            <img :src="img_home_week_amount" class="total-icon">
            <div class="total-title">近7天销售总额</div>
            <div class="total-value">￥50000.00</div>
          </div>
        </el-col>


        &lt;!&ndash;近7天销售总额&ndash;&gt;

        &lt;!&ndash; <el-col :span="6">
           <div class="total-frame">
             <svg-icon icon-class="total-week" class="total-icon">
             </svg-icon>
             <div class="total-title">近7天销售总额</div>
             <div class="total-value">￥50000.00</div>
           </div>
         </el-col>&ndash;&gt;


      </el-row>
    </div>-->

  </div>


</template>

<script>

  import pdf from 'vue-pdf'
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_github from '@/assets/images/github.svg';
  import img_home_could from '@/assets/images/could.svg';
  import img_home_zhihu from '@/assets/images/zhihu.svg';
  import img_home_project from '@/assets/images/project.svg';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import img_home_week_amount from '@/assets/images/count.svg';
  //DB
  import download_db from '@/assets/images/download/db.svg';



  export default {
    name: 'Pdf',
    components: {
      pdf
    },
    name: 'home',
    data() {
      return {
        download_db,

        img_home_order,
        img_home_github,
        img_home_could,
        img_home_zhihu,
        img_home_project,
        img_home_today_amount,
        img_home_yesterday_amount,
        img_home_week_amount
      }
    }
    ,
    created() {

    }
    ,
    methods: {
      getResume(){ //个人简历
       // this.$router.push({path: '/memorandum/article-resume'});
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
