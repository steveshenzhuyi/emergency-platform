// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MintUI from 'mint-ui';
// import store from './store';
import axios from 'axios';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import '../settings.js';
import VueQr from 'vue-qr';
import './assets/iconfont.js';
import QRCode from 'qrcodejs2';
import gallery from 'img-vuer';
import global_ from './components/global.vue'

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios;

Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false;

Vue.use(MintUI);
Vue.use(gallery);

Vue.prototype.$goRoute = function $goRoute(index) {
  this.$router.push(index);
};

Vue.config.productionTip = false;

document.addEventListener('deviceready',function(){
  //alert('Device is Ready!');
  new Vue({
    el: '#app',
    router,
    // store,
    render: h => h(App),
    components: { App },
    template: '<App/>',
  })
  // navigator.splashscreen.hide()
document.addEventListener('jpush.receiveRegistrationId', function(event) {
        alert("receiveRegistrationId" + JSON.stringify(event));
    }, false)

initiateUI()

// document.addEventListener("jpush.openNotification", function (event) {
//   if(device.platform == "Android") {
//     if(window.localStorage.getItem('ROLECODE')=="R01"){
//       router.push({name:'病人列表',params:{SELECTED:"沟通"}});
//     }else if(window.localStorage.getItem('ROLECODE')=="R02"){
//       router.push({name:'转运列表',params:{SELECTED:"沟通"}});
//     }else if(window.localStorage.getItem('ROLECODE')=="R03"){
//       router.push({name:'医院病人列表',params:{SELECTED:"沟通"}});
//     }else if(window.localStorage.getItem('ROLECODE')=="R04"){
//       router.push({name:'专家病人列表',params:{SELECTED:"沟通"}});
//     }else alert("无角色")

//   } else {
//     alertContent = event.aps.alert
//     alert('openNotification err')
//   }
// }, false)



// JPush.getUserNotificationSettings(function(result) {
//   if(result == 0) {
//     alert("系统不允许推送")
//     // 系统设置中已关闭应用推送。
//   } else if(result > 0) {
//     // 系统设置中打开了应用推送。
//     alert("系统允许推送")
//   }
//  })

},false);


function initiateUI() {
    try {
       // window.JPush.setDebugMode(true);
        JPush.init();
        //setTimeout(getRegistrationID, 10000);
 
        if (device.platform != "Android") {
            JPush.setApplicationIconBadgeNumber(0);
        }
    } catch (exception) {
        alert('An exception has been occured when init JPush plugin.' + exception);
    }
}
 
function getRegistrationID() {
   //alert('Device getRegistrationID!');

    JPush.getRegistrationID(onGetRegistrationID)
}
 
function onGetRegistrationID(data) {
    try {
        if (data.length === 0) {
            alert('id is null')
            var t1 = setTimeout(getRegistrationID, 5000);
        } else {
            alert(data)
        }
    } catch (exception) {
        console.log(exception);
    }
}
    

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // store,
  components: { App },
  template: '<App/>',
});
