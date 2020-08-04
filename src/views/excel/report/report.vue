<template>
  <article>
    <div style="padding:20px" v-highlight>
      <h1 class="blog-title" v-text="Blog.title"></h1>
      <!-- 用<mavon-editor>标签显示文章内容 -->
      <mavon-editor v-html="Blog" style="padding:20px">
      </mavon-editor>
    </div>
  </article>
</template>
<script>
  // 导入组件 及 组件样式
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    components: {
      mavonEditor,
    },
    data () {
      return {
        Blog:''
      }
    },
    methods: {
       getBlog(){
        //var NO = this.$route.params.nO;
        //const res = await this.$axios.get('/getBlog/'+NO)
        //将返回的数据赋值给Blog
        this.Blog = '<h1><a id="_0"></a>测试</h1>'
         this.Blog.title ='aaaa'
       }
    },
    created(){
      this.getBlog()
    }
  }
</script>
