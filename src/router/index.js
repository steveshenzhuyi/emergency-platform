import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import command from '@/components/command';
// import 病人列表 from '@/components/login-A';
// import CPR from '@/components/CPR';
// import increaseA from '@/components/increaseA';
// import forget from '@/components/forget';
// import increaseB from '@/components/increaseB';
// import increaseBT from '@/components/increaseBT';
// import increaseC from '@/components/increaseC';
// import increaseCT from '@/components/increaseCT';
// import increaseCH from '@/components/increaseCH';
// import A1 from '@/components/A1';
// import T1 from '@/components/T1';
// import H1 from '@/components/H1';
// import Z1 from '@/components/Z1';
// import 资源详情 from '@/components/B1';
// import B2 from '@/components/B2';
// import C1 from '@/components/C1';
// import C2 from '@/components/C2';
// import C3 from '@/components/C3';
// import C4 from '@/components/C4';
// import confirm from '@/components/confirm';
// import confirmt from '@/components/confirmt';
// import confirmh from '@/components/confirmh';
// import map from '@/components/map';
// import 转运列表 from '@/components/login-T';
// import 医院病人列表 from '@/components/login-H';
// import 专家病人列表 from '@/components/login-Z';
// import 个人信息运输 from '@/components/个人信息运输';
// import 接收病人 from '@/components/接收病人';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/command',
      name: 'command',
      component: command,
    },
    
  ],
});
