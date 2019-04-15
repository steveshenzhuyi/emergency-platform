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

<<<<<<< HEAD

=======
//多一行注释
//develop
>>>>>>> 05f75d82c12e191d4c8e52c27f91ab4e57e558cd
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.use(MintUI);

Vue.prototype.$goRoute = function $goRoute(index) {
  this.$router.push(index);
};

Vue.config.productionTip = false;


/* eslint-disable no-new */
/* eslint-disable no-new */
// document.addEventListener('deviceready',function(){
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     render: h => h(App),
//     components: { App },
//     template: '<App/>',
//   })
//   window.navigator.splashscreen.hide()
// },false);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // store,
  components: { App },
  template: '<App/>',
});
