<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="menu"
             :rules="rules"
             ref="softwareFrom"
             label-width="150px">
      <el-form-item label="软件名称:" prop="name">
        <el-input v-model="menu.name" placeholder="此名称将用于展示" :disabled="this.isDisabled"></el-input>
      </el-form-item>

      <el-form-item label="软件图标：" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          name="file"
          action="string"
          limit="1"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :show-file-list="true"
          :before-upload="beforeAvatarUpload"
          :http-request="handleAvatarSuccess"
        >
          <img v-if="menu.imageUrl" :src="menu.imageUrl" v-model="menu.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>


      <el-form-item label="软件包：" prop="downloadUrl">
        <el-upload
          class="upload-demo"
          drag
          action="string"
          limit="1"
          :http-request="handleSoftwareSuccess"
          multiple v-model="menu.downloadUrl">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="createSoftware('softwareFrom')">提交</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
  import {uploadSoftware, updateSoftware, uploadIcon} from '@/api/softwareMenu';
  import {getDownload} from '@/api/download';


  export default {
    data() {
      return {
        operation: '',
        isDisabled: true,
        menu: {
          name: '',
          imageUrl: '',
          downloadUrl: ''
        },
        parentId: 0,
        rules: {
          name: [
            {required: true, message: '请输入软件名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传软件图标', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          downloadUrl: [
            {required: true, message: '请上传软件包', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.parentId = this.$route.query.parentId;
      this.operation = this.$route.query.operation;
      if ("update" == this.operation) {
        getDownload(this.$route.query.id).then(response => {
          this.menu.name=response.data[0].menuName
          this.menu.imageUrl=response.data[0].menuIconUrl
          this.menu.downloadUrl=response.data[0].downloadUrl
        });
      }


    },
    watch: {},
    methods: {
      createSoftware(formName) {
        this.$refs[formName].validate((valid) => {
          if ("update" != this.operation) {
            if (valid) {
              uploadSoftware(this.parentId, this.menu.name, this.menu.imageUrl, this.menu.downloadUrl).then(response => {
                this.$router.push({path: '/memorandum/article-upload', query: {parentId: this.parentId}})
              });
              this.$message({
                message: '验证成功',
                type: 'success',
                duration: 1000
              });
            } else {
              this.$message({
                message: '验证失败',
                type: 'error',
                duration: 1000
              });
              return false;
            }
          }
          //修改
          if ("update" == this.operation) {
            if (valid) {
              alert("修改")
              updateSoftware(this.$route.query.id, this.menu.name, this.menu.imageUrl, this.menu.downloadUrl).then(response => {
                this.$router.push({path: '/memorandum/article-upload', query: {parentId: this.parentId}})
              });
              this.$message({
                message: '验证成功',
                type: 'success',
                duration: 1000
              });
            } else {
              this.$message({
                message: '验证失败',
                type: 'error',
                duration: 1000
              });
              return false;
            }
          }
          /*------------------------*/
        });


      },
      /*---------------图片上传*/
      handleAvatarSuccess(params) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        //alert(this.imageUrl)
        let fd = new FormData();
        fd.append("file", params.file);
        uploadIcon(fd).then(res => {
          if (res.code == 200) {
            this.menu.imageUrl = res.data.path;
          }
        })
          .catch(err => {
            alert("上传失败，请重新上传");
          });
      },
      handleSoftwareSuccess(params) {
        let fd = new FormData();
        fd.append("file", params.file);
        uploadIcon(fd)
          .then(res => {
            if (res.code == 200) {
              this.menu.downloadUrl = res.data.path;
              this.menu.name = res.data.fileName;
              if (this.menu.name != null) {
                this.isDisabled = false
              }
            }
          })
          .catch(err => {
            alert("上传失败，请重新上传");
          });
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      uploadFile(file) {
        uploadIcon(file)
      }
    }
  }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
