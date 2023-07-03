<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div class="avatar-uploader">
      <div class="avatar-box">
        <el-avatar :size="40" :src="formData.url" class="avatar"/>
        <div class="avatar-hover" @click="uploadPicture(formData.url)">更换</div>
      </div>
    </div>
    <el-dialog
        title="裁剪图片"
        :visible.sync="cropperModel"
        width="950px"
        :close-on-click-modal="false"
        center
    >
      <cropperImage :Name="cropperName" @uploadImgSuccess="handleUploadSuccess" ref="child"></cropperImage>
    </el-dialog>
  </div>
</template>

<script>
import cropperImage from "@/components/cropperImage.vue";

export default {
  components: {
    cropperImage
  },
  data() {
    return {
      cropperName: '',
      cropperModel: false,
      formData: {}
    }
  },
  methods: {
    handleUploadSuccess(data) {
      //在此处调文件上传的接口
    },
    uploadPicture(name) {
      this.cropperName = name;
      this.cropperModel = true;
    },
  }
}
</script>
