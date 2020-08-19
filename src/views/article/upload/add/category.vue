<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="menu"
             :rules="rules"
             ref="menuFrom"
             label-width="150px">
      <el-form-item label="菜单名称：" prop="name">
        <el-input v-model="menu.name"></el-input>
      </el-form-item>

      <el-form-item label="菜单ICON：" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          name="file"
          action="string"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :show-file-list="true"
          :before-upload="beforeAvatarUpload"
          :http-request="handleAvatarSuccess"
        >
          <img v-if="this.menu.imageUrl" :src="this.menu.imageUrl" v-model="this.menu.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="createMenu('menuFrom')">提交</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
  import {softwareCreateMenu, softwareUpdateMenu, uploadIcon} from '@/api/softwareMenu';
  import {getDownload} from '@/api/download';


  export default {
    data() {
      return {
        menu: {
          name: '',
          imageUrl: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入软件名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传软件图标', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.$route.query.id != undefined) {
        getDownload(this.$route.query.id).then(response => {
          this.menu.name = response.data[0].menuName;
          this.menu.imageUrl = response.data[0].menuIconUrl;
        });
      }
    },
    methods: {
      createMenu(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if ("update" == this.$route.query.operation) {
              softwareUpdateMenu(this.$route.query.id, this.menu.name, this.menu.imageUrl).then(response => {
                if (response.code == 200) {
                  this.$message({
                    message: response.message,
                    center: true,
                    type: 'success'
                  });
                  this.$router.push({path: '/memorandum/article-upload'})
                }
              });
            } else {
              softwareCreateMenu(this.menu.name, this.menu.imageUrl).then(response => {
                if (response.code == 200) {
                  this.$router.push({path: '/memorandum/article-upload'})
                }
              });
            }
            this.$message({
              message: '验证成功',
              type: 'success',
              center: true,
              duration: 1000
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              center: true,
              duration: 1000
            });
            return false;
          }
        });

      },
      /*---------------图片上传*/
      handleAvatarSuccess(params) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        //alert(this.imageUrl)

        let fd = new FormData();
        fd.append("file", params.file);
        uploadIcon(fd)
          .then(res => {
            if (res.code == 200) {
              this.menu.imageUrl = res.data.path
            }
          })
          .catch(err => {
            alert("上传失败，请重新上传");
          });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/svg+xml';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是svg格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
