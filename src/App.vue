<template>
  <div align="center" id="app" style="text-align: center;">
    <router-view v-if ="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true
    }
  },
  mounted(){
    var that = this
    document.addEventListener("jpush.receiveNotification", function (event) {
      var alertContent
      alertContent = event.extras.type
      if(alertContent == 'video'){
        that.GLOBAL.changeVideoAlert(true)
      }
      console.log(that.GLOBAL)
    }, false)

    document.addEventListener("jpush.openNotification", function (event) {
      var alertContent = event.extras.type
      
      if(alertContent == 'video'){
        that.GLOBAL.changeVideoAlert(false)
        var scheme = 'com.tencent.trtc';
        appAvailability.check(scheme,
          function() {
            var sApp = startApp.set({"application":"com.tencent.trtc"});
            sApp.start(function() {
            }, function(error) {
              alert(error);
            });
          },
          function() {
            alert(scheme + ' is not available');
          }
        );
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