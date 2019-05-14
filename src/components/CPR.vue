<template>
    <div>
      <mt-header fixed style="font-size:20px" title="心肺复苏指导">
        <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      <mt-button size="small" slot="right"
            @click="choosephoto()"><small>拍照</small></mt-button>
      </mt-header>
      <br><br>
      <div><img v-gallery id="image" style="max-height: 200px; max-width: 90%;" ></img></div>
      <mt-button type="primary" @click="uploadPicture()"><small>上传</small></mt-button>
      <div><img id="image1" v-gallery style="max-height: 200px; max-width: 90%;" :src="photosrc" ></img></div>
      <!-- <mt-button type="primary" @click="startRecord()"><small>开始</small></mt-button>
      <mt-button type="primary" @click="stopRecord()"><small>结束</small></mt-button>
      <mt-button type="primary" @click="start()"><small>播放</small></mt-button>
      <mt-button type="primary" @click="stop()"><small>停止</small></mt-button>
      <mt-button type="primary" @click="uploadRecord()"><small>上传</small></mt-button>
      <mt-button type="primary" @click="convertRecord()"><small>识别</small></mt-button> -->
    <router-view></router-view>
    </div>
</template>

<script>
import global from './global.vue'
export default {
  data(){
    return {
      photosrc: global.photoUrl+"zyh_1557216080825test.jpg",
      // mediaRec:{},
      // mediaRec1:{}
    }
  },
  mounted(){
    //this.initaudio()
  },
  methods: {
    // initaudio(){
    //   var src = "myrecording.mp3";
    // this.mediaRec = new Media(src,
    //     // success callback
    //     function() {
    //         console.log("recordAudio():Audio Success");
    //     },
 
    //     // error callback
    //     function(err) {
    //         console.log("recordAudio():Audio Error: "+ err.code);
    //     });
    // resolveLocalFileSystemURL(cordova.file.externalRootDirectory+"myrecording.mp3",function(entry) {
    //     console.log('cdvfile URI: ' + entry.toInternalURL());
    //     console.log('URI: ' + entry.toURL());
    //     var audioURI = entry.toURL();
    //     this.mediaRec1 = new Media(audioURI,
    //     // success callback
    //     function() {
    //         console.log("Audio Success");
    //     },
 
    //     // error callback
    //     function(err) {
    //         console.log("Audio Error: "+ err.code);
    //     });

    //   }, function (err) {
    //     console.log(err)
    //   });

    

    
    // },

    // uploadRecord(){
    //   var audioURI;
    //   resolveLocalFileSystemURL(cordova.file.externalRootDirectory+"myrecording.mp3",function(entry) {
    //     console.log('cdvfile URI: ' + entry.toInternalURL());
    //     console.log('URI: ' + entry.toURL());
    //     audioURI = entry.toURL();
    //   }, function (err) {
    //     console.log(err)
    //   });

    //   // var path = cordova.file.externalRootDirectory
    //   // audioURI = path+this.mediaRec.src
    //   console.log(audioURI)

    //   var audioname = window.localStorage.getItem('USERID') + '_' + new Date().getTime() + 'test.jpg'
    //   //上传接口
    //   var uri = encodeURI(global.uploadUrl)
    //   var options = {
    //     fileKey: 'file',
    //     fileName: audioname,
    //     chunkedMode: true,
    //     mimeType: 'audio/mpeg'
    //   }
    //   function success(r) {
    //     console.log(r)
    //     alert("上传成功! Code = " + r.responseCode);
    //   }
    //   function fail(error) {
    //     alert("上传失败! Code = " + error.code);
    //   }
    //   var ft = new FileTransfer();
    //   ft.upload(audioURI, uri, success, fail, options)
      
    // },
    // startRecord(){
    //   this.mediaRec.startRecord()
    // },
    // stopRecord(){
    //   this.mediaRec.stopRecord()
    // },
    // start(){
    //   this.mediaRec1.play()
    // },
    // stop(){
    //   this.mediaRec1.stop()
    // },
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
        console.log(imageData)
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    uploadPicture() {
      //获取元素中的图片uri
      var imgURI = document.getElementById('image').src
      console.log(imgURI)
      //文件命名
      var photoname = window.localStorage.getItem('USERID') + '_' + new Date().getTime() + 'test.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        console.log(r)
        alert("上传成功! Code = " + r.responseCode);
      }
      function fail(error) {
        alert("上传失败! Code = " + error.code);
      }
      var ft = new FileTransfer();
      ft.upload(imgURI, uri, success, fail, options)
      
    },

  },
}
</script>

