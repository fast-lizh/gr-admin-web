<template>

  <article>
    <div style="padding:20px" v-highlight>
      <h1 class="blog-title" v-text="title">{{title}}</h1>
      <!-- 用<mavon-editor>标签显示文章内容 -->

      <el-button size="mini" class="btn-add" @click="back()">返回<i class="el-icon-arrow-left el-icon--right"></i>
      </el-button>
      <mavon-editor v-html="Blog" style="padding:20px">
      </mavon-editor>
    </div>
  </article>
</template>
<script>
  // 导入组件 及 组件样式
  import {getFileContent} from '@/api/md';
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    components: {
      mavonEditor,
    },
    data() {
      return {
        Blog: '',
        title: ''
      }
    },
    methods: {
      getBlog() {
        //var NO = this.$route.params.nO;
        //const res = await this.$axios.get('/getBlog/'+NO)
        //将返回的数据赋值给Blog
        //alert(this.$route.query.id) //路由取参
        getFileContent(this.$route.query.id).then(response => {

          this.Blog = response.data.content,
            this.title=response.data.docName
        });
      }
    },
    created() {
      this.getBlog()
    }
  }
</script>
