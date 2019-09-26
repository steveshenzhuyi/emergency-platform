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
import './assets/iconfont3.js';
import QRCode from 'qrcodejs2';
import gallery from 'img-vuer';
import global_ from './components/global.vue';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

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
