<template>
    <div>
      <mt-header fixed style="font-size:20px" title="心肺复苏指导">
        <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      <mt-button size="small" slot="right"
            @click="takephoto()"><small>拍照</small></mt-button>
      </mt-header>
      <br><br>
      <div><img id="image" height="300px"></img></div>
    <router-view></router-view>
    </div>
</template>

<script>
export default {
  methods: {
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
    },
    choosephoto() {
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        document.getElementById('image').src =imageData;
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    takephoto() {
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        document.getElementById('image').src =imageData;
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    uploadPicture() {
      var temp_photoaddress = Storage.get('USERID') + '_' + new Date().getTime() + 'test.jpg'
      var uri = encodeURI("101.132.140.25:3000")
      var options = {
        fileKey: 'file',
        fileName: temp_photoaddress,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      var ft = new FileTransfer();
      ft.upload(imgURI, uri, success, fail, options)
      var success = function (r) {
        alert("上传成功! Code = " + r.responseCode);
      }
      var fail = function (error) {
        alert("上传失败! Code = " + error.code);
      }
    },

  },
}
</script>

