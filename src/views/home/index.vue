<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="6" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">个人简历</div>
            <div class="color-main address-content">
              <!--<img :src="img_home_project" class="total-icon"  @click="drawer = true">-->
              <div>
                <el-upload
                  class="upload-demo"
                  action="string"
                  :on-preview="handlePreview"
                  :show-file-list="true"
                  :before-upload="beforeAvatarUpload"
                  :http-request="handleAvatarSuccess"
                >
                  <el-button type="primary" icon="el-icon-edit" circle @click="updateResume()"></el-button>
                </el-upload>

                <el-button type="primary" icon="el-icon-document-copy" circle @click="dialogVisible=true"></el-button>
              </div>

            </div>
          </div>
        </el-col>

        <el-dialog
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose">


          <div class="pdf" v-show="fileType === 'pdf'">
            <p class="arrow">
              <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">
               <i class="el-icon-caret-left"></i>
                上一页
              </span>{{currentPage}} / {{pageCount}}
              <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">
                 下一页
                <i class="el-icon-caret-right"></i>
              </span>
            </p>
            <pdf
              :src="pdfUrl"
              :page="currentPage"
              @num-pages="pageCount=$event"
              @page-loaded="currentPage=$event"
              @loaded="loadPdfHandler">
            </pdf>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
           </span>
        </el-dialog>


        <el-col :span="6" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">GITHUB-WEB</div>
            <div class="color-main address-content">
              <a href="https://github.com/fast-lizh/gr-admin-web">
                <img :src="img_home_github" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <div class="out-border">
            <div class="layout-title">网盘-ggvu</div>
            <div class="color-main address-content">
              <a href="https://pan.baidu.com/s/1BerGmQb4DO06tgNZXJCeFw">
                <img :src="img_home_could" class="total-icon">
              </a>
            </div>
          </div>
        </el-col>

        <el-col :span="6" style="text-align: center">
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
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">200</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥5000.00</div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_week_amount" class="total-icon">
            <div class="total-title">近7天销售总额</div>
            <div class="total-value">￥50000.00</div>
          </div>
        </el-col>


        <!--近7天销售总额-->

        <!-- <el-col :span="6">
           <div class="total-frame">
             <svg-icon icon-class="total-week" class="total-icon">
             </svg-icon>
             <div class="total-title">近7天销售总额</div>
             <div class="total-value">￥50000.00</div>
           </div>
         </el-col>-->

      </el-row>
    </div>


    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">200</el-col>
                <el-col :span="6" class="color-danger overview-item-value">1000</el-col>
                <el-col :span="6" class="color-danger overview-item-value">5000</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>


</template>

<script>

  import pdf from 'vue-pdf'

  import {uploadIcon} from '@/api/softwareMenu';
  import {add} from '@/api/resume';
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_github from '@/assets/images/github.svg';
  import img_home_could from '@/assets/images/could.svg';
  import img_home_zhihu from '@/assets/images/zhihu.svg';
  import img_home_project from '@/assets/images/project.svg';
  import img_home_select from '@/assets/images/select.svg';
  import img_home_update from '@/assets/images/update.svg';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import img_home_week_amount from '@/assets/images/count.svg';
  import img_pdf_next from '@/assets/images/next.svg';
  import img_pdf_previous from '@/assets/images/previous.svg';
  import {getDownload} from '@/api/resume';


  const DATA_FROM_BACKEND = {
    columns: ['date', 'orderCount', 'orderAmount'],
    rows: [
      {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
      {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
      {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
      {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
      {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
      {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
      {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
      {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
      {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
      {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
      {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
      {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
      {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
    ]
  };
  export default {
    name: 'Pdf',
    components: {
      pdf
    },
    name: 'home',
    data() {
      return {

        dialogVisible: false,
        visible: false,
        drawer: false,
        direction: 'rtl',
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf', // 文件类型
        pdfUrl: "",
        img_pdf_next,
        img_pdf_previous,

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area: true,
          axisSite: {right: ['orderAmount']},
          labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}
        },
        chartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_github,
        img_home_could,
        img_home_zhihu,
        img_home_project,
        img_home_select,
        img_home_update,
        img_home_today_amount,
        img_home_yesterday_amount,
        img_home_week_amount
      }
    }
    ,
    created() {
      this.initOrderCountDate();
      this.getData();
      getDownload().then(result => {
        this.pdfUrl = result.data.resumeUrl
      })
      this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)
    }
    ,
    methods: {
      // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      changePdfPage(val) {
        // console.log(val)
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
          // console.log(this.currentPage)
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
          // console.log(this.currentPage)
        }
      },

      // pdf加载时
      loadPdfHandler(e) {
        alert(e)
        this.currentPage = 1 // 加载的时候先加载第一页
      },
      handleDateChange() {
        this.getData();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'pdf' || file.type === 'application/pdf';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是pdf格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(params) {
        let fd = new FormData();
        fd.append("file", params.file);
        uploadIcon(fd).then(res => {
          if (res.code == 200) {
            add(res.data.fileName, res.data.path).then(result => {
              if (result.code == 200) {
                this.$router.push({path: '/memorandum/article-resume'});
              }
            })
          }
        })
          .catch(err => {
            alert("上传失败，请重新上传");
          });
      },
      getResume() { //获取个人简历
        //this.open()
        this.$router.push({path: '/memorandum/article-resume'});


      },
      updateResume() { //修改个人简历
      },
      // pdf加载时
      loadPdfHandler(e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      },
      handleDateChange() {
        this.getData();
      }
      ,
      initOrderCountDate() {
        let start = new Date();
        start.setFullYear(2018);
        start.setMonth(10);
        start.setDate(1);
        const end = new Date();
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate = [start, end];
      }
      ,
      getData() {
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount', 'orderAmount'],
            rows: []
          };
          for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
            let item = DATA_FROM_BACKEND.rows[i];
            let currDate = str2Date(item.date);
            let start = this.orderCountDate[0];
            let end = this.orderCountDate[1];
            if (currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false
        }, 1000)
      }
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
