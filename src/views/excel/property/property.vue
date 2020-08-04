<template>


  <el-form :inline="true" :model="input" class="demo-form-inline" >
    <el-form-item >
      <el-input v-model="title" placeholder="文章标题" style="width: 600px" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-form-item>
    <div class="markdown">
      <div class="container">
        <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
      </div>
    </div>
  </el-form>

</template>

<script>
  import {addArticle} from '@/api/md';
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: "",
    props: [],
    components: {
      mavonEditor,
    },
    data() {
      return {
        content:'',
        html:'',
        configs: {},
        title: '',
      }
    },
    methods: {
      // 将图片上传到服务器，返回地址替换到md中
      $imgAdd(pos, $file){
        let formdata = new FormData();

        this.$upload.post('/上传接口地址', formdata).then(res => {
          console.log(res.data);
          this.$refs.md.$img2Url(pos, res.data);
        }).catch(err => {
          console.log(err)
        })
      },
      // 所有操作都会被解析重新渲染
      change(value, render){
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      // 提交
      submit(){
       // console.log(this.content);
       // console.log(this.html);
        addArticle(this.title,this.html)
        this.$message.success('提交成功，已打印至控制台！');
      }
    },
    mounted() {

    }
  }
</script>
