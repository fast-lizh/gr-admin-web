<template>

  <!--<pdf
    ref="pdf"
    :src="pdfUrl"
    :page="currentPage"
  >

  </pdf>-->

  <div class="pdf" v-show="fileType === 'pdf'">
    <p class="arrow">
      <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}"><img :src="img_pdf_previous"
                                                                                        class="total-icon"></span>
      {{currentPage}} / {{pageCount}}


      <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}"> <img :src="img_pdf_next"
                                                                                                 class="total-icon"></span>
    </p>
    <pdf
      :src="pdfUrl"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    </pdf>
  </div>


</template>

<script>
  import pdf from 'vue-pdf'
  import img_pdf_next from '@/assets/images/next.svg';
  import img_pdf_previous from '@/assets/images/previous.svg';
  import {getDownload} from '@/api/resume';

  export default {
    /* name: "resume",
     components: {
       pdf
     },*/
    name: 'pdf',
    components: {
      pdf
    },
    name: 'resume',
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf', // 文件类型 http://39.108.12.213:81/group1/M00/00/00/rBrfdl8s8bKAQrUpAAJBYvsJ7aw489.pdf
        //pdfUrl: "http://file.dakawengu.com/file/2018-05-29/20180527-tianfeng.pdf",
        pdfUrl: "",
        img_pdf_next,
        img_pdf_previous,
      }
    },
    created() {
      getDownload().then(result => {
        this.pdfUrl = result.data.resumeUrl
      })
      this.pdfUrl = pdf.createLoadingTask(this.pdfUrl)

      alert(this.pdfUrl)

    },
    methods: {

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
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
        this.currentPage = 1 // 加载的时候先加载第一页
      },
      handleDateChange() {
        this.getData();
      }

    }
  }
</script>

<style scoped>

</style>
