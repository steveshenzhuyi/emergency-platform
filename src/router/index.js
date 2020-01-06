import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import 病人列表 from '@/components/login-A';
import increaseA from '@/components/increaseA';
import increaseA1 from '@/components/increaseA1';
import A1 from '@/components/A1';
import A2 from '@/components/A2';
import T1 from '@/components/T1';
import H1 from '@/components/H1';
import Z1 from '@/components/Z1';
import 资源详情 from '@/components/B1';
import C1 from '@/components/C1';
import D1 from '@/components/D1';
import D2 from '@/components/D2';
import D3 from '@/components/D3';
import E1 from '@/components/E1';
import confirm from '@/components/confirm';
import 转运列表 from '@/components/login-T';
import 医院病人列表 from '@/components/login-H';
import 专家病人列表 from '@/components/login-Z';
import 个人信息运输 from '@/components/个人信息运输';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login-A',
      name: '病人列表',
      component: 病人列表,
    },
    {
      path: '/login-T',
      name: '转运列表',
      component: 转运列表,
    },
    {
      path: '/login-H',
      name: '医院病人列表',
      component: 医院病人列表,
    },
    {
      path: '/login-Z',
      name: '专家病人列表',
      component: 专家病人列表,
    },
    // {
    //   path: '/CPR',
    //   name: 'CPR',
    //   component: CPR,
    // },
    {
      path: '/increaseA',
      name: 'increaseA',
      component: increaseA,
    },
    {
      path: '/increaseA1',
      name: 'increaseA1',
      component: increaseA1,
    },
    // {
    //   path: '/increaseB',
    //   name: 'increaseB',
    //   component: increaseB,
    // },
    // {
    //   path: '/increaseBT',
    //   name: 'increaseBT',
    //   component: increaseBT,
    // },
    // {
    //   path: '/increaseC',
    //   name: 'increaseC',
    //   component: increaseC,
    // },
    // {
    //   path: '/increaseCT',
    //   name: 'increaseCT',
    //   component: increaseCT,
    // },
    // {
    //   path: '/increaseCH',
    //   name: 'increaseCH',
    //   component: increaseCH,
    // },
    // {
    //   path: '/forget',
    //   name: 'forget',
    //   component: forget,
    // },
    {
      path: '/A1',
      name: 'A1',
      component: A1,
    },
    {
      path: '/A2',
      name: 'A2',
      component: A2,
    },
    {
      path: '/B1',
      name: '资源详情',
      component: 资源详情,
    },
    // {
    //   path: '/B2',
    //   name: 'B2',
    //   component: B2,
    // },
    {
      path: '/C1',
      name: 'C1',
      component: C1,
    },
    // {
    //   path: '/C2',
    //   name: 'C2',
    //   component: C2,
    // },
    // {
    //   path: '/C3',
    //   name: 'C3',
    //   component: C3,
    // },
    // {
    //   path: '/C4',
    //   name: 'C4',
    //   component: C4,
    // },
    {
      path: '/D1',
      name: 'D1',
      component: D1,
    },
    {
      path: '/D2',
      name: 'D2',
      component: D2,
    },
    {
      path: '/D3',
      name: 'D3',
      component: D3,
    },
    {
      path: '/E1',
      name: 'E1',
      component: E1,
    },
    {
      path: '/T1',
      name: 'T1',
      component: T1,
    },
    {
      path: '/H1',
      name: 'H1',
      component: H1,
    },
    {
      path: '/Z1',
      name: 'Z1',
      component: Z1,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: confirm,
    },
    {
      path: '/个人信息运输',
      name: '个人信息运输',
      component: 个人信息运输,
    },
  ],
});
