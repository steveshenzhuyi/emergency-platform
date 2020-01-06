<template>
  <div align="center" id="app" style="text-align: center;">
    <router-view v-if ="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true,
      exitAppTicker:0
    }
  },
  mounted(){
    this.backbutton()
    this.checkversion()
    window.localStorage.setItem("VIDEOUSERID",0)
    var that = this
    document.addEventListener("jpush.receiveNotification", function (event) {
      var alertContent = event.extras.type
      var videoid = Number(window.localStorage.getItem("VIDEOUSERID"))
      if(alertContent == 'video' && videoid != 0){
        // that.GLOBAL.changeVideoAlert(true)
        var scheme = 'com.tencent.trtc';
        var roomnumber = Number(event.extras.roomnumber);
        appAvailability.check(scheme,
          function() {
            var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":videoid
              });
            sApp.start(function() {
            }, function(error) {
              alert(error);
            });
          },
          function() {
            alert(scheme + ' is not available');
          }
        );
      }else if(alertContent == 'ver'){
        that.checkversion()
      }
      console.log(that.GLOBAL)
    }, false)

    document.addEventListener("jpush.openNotification", function (event) {
      var alertContent = event.extras.type
      var videoid = Number(window.localStorage.getItem("VIDEOUSERID"))
      
      if(alertContent == 'video' && videoid != 0){
        that.GLOBAL.changeVideoAlert(false)
        var scheme = 'com.tencent.trtc';
        var roomnumber = Number(event.extras.roomnumber);
        appAvailability.check(scheme,
          function() {
            var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":videoid
              });
            sApp.start(function() {
            }, function(error) {
              alert(error);
            });
          },
          function() {
            alert(scheme + ' is not available');
          }
        );
      }else if(alertContent == 'ver'){
        that.checkversion()
      }else if(alertContent == 'news'){
        var num = event.extras.MessageNo
       window.localStorage.setItem('MESSAGENO',num);
       that.$router.push({name:'C1'});
      }else if(alertContent == 'ECG'){
        var PatientId = event.extras.PatientId
        that.$router.push({name:'A1',params:{PATIENTID:PatientId,SELECTED1:"处置方案"}});
      }
    }, false)

  },
  methods: {

    backbutton(){
  var that=this
    document.addEventListener("deviceready",function(){
        document.addEventListener("backbutton", function(){
      console.log(navigator)
//     //         if(this.isHomePage()){
//        // console.log("222")
                if(that.exitAppTicker == 0){
                    that.exitAppTicker++;
Toast({
  message: '再按一次返回桌面',
  position: 'bottom',
  duration: 1000
});
                    setTimeout(function(){
                            that.exitAppTicker = 0;
                    },2000);
                }else if(that.exitAppTicker == 1){
//                     navigator.app.exitApp(); //退出app
 navigator.Backbutton.goHome(function() { //进入后台
                  // console.log('go home success');
              }, function() {
                  // console.log('go home fail');
              });
                }  
// //                 }else{
// //                     history.back();
// //                 }
        }, false);
    },false);
},
checkversion(){
  axios.get('/getNewestVersion',{}).then((response) => {
    if(response.data.results[0].AppVersion != this.GLOBAL.nowversion) {
      Toast("提示强制更新，系统将自动下载安装包，稍后请手动确认安装")
      setTimeout(function(){
        var fileTransfer = new FileTransfer()
        var uri = encodeURI('http://47.98.252.131:8001/apk/1.apk')
        var fileURL = 'cdvfile://localhost/temporary/1.apk'
        fileTransfer.download(
          uri, fileURL, function (entry) {
           Toast('下载完成')
           cordova.plugins.fileOpener2.open(
            'cdvfile://localhost/temporary/1.apk',
            'application/vnd.android.package-archive'
            )
         },
         function (error) {
          alert('download error: ' + error.source + error.target + error.code)
        },
        false, {
          headers: {
            'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
          }
        }
        )
      },2000);


    }
  })
},
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  components: {
  }
};
</script>