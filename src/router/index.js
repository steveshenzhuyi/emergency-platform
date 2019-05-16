import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import 病人列表 from '@/components/login-A';
import CPR from '@/components/CPR';
import increaseA from '@/components/increaseA';
import forget from '@/components/forget';
import increaseB from '@/components/increaseB';
import increaseBT from '@/components/increaseBT';
import increaseC from '@/components/increaseC';
import increaseCT from '@/components/increaseCT';
import increaseCH from '@/components/increaseCH';
import A1 from '@/components/A1';
import T1 from '@/components/T1';
import H1 from '@/components/H1';
import 资源详情 from '@/components/B1';
import B2 from '@/components/B2';
import C1 from '@/components/C1';
import C2 from '@/components/C2';
import C3 from '@/components/C3';
import confirm from '@/components/confirm';
import confirmt from '@/components/confirmt';
import confirmh from '@/components/confirmh';
import map from '@/components/map';
import 转运列表 from '@/components/login-T';
import 医院病人列表 from '@/components/login-H';
import 个人信息运输 from '@/components/个人信息运输';
import 接收病人 from '@/components/接收病人';

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
      path: '/CPR',
      name: 'CPR',
      component: CPR,
    },
    {
      path: '/increaseA',
      name: 'increaseA',
      component: increaseA,
    },
    {
      path: '/increaseB',
      name: 'increaseB',
      component: increaseB,
    },
    {
      path: '/increaseBT',
      name: 'increaseBT',
      component: increaseBT,
    },
    {
      path: '/increaseC',
      name: 'increaseC',
      component: increaseC,
    },
    {
      path: '/increaseCT',
      name: 'increaseCT',
      component: increaseCT,
    },
    {
      path: '/increaseCH',
      name: 'increaseCH',
      component: increaseCH,
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget,
    },
    {
      path: '/A1',
      name: 'A1',
      component: A1,
    },
    {
      path: '/B1',
      name: '资源详情',
      component: 资源详情,
    },
    {
      path: '/B2',
      name: 'B2',
      component: B2,
    },
    {
      path: '/C1',
      name: 'C1',
      component: C1,
    },
    {
      path: '/C2',
      name: 'C2',
      component: C2,
    },
    {
      path: '/C3',
      name: 'C3',
      component: C3,
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
      path: '/confirm',
      name: 'confirm',
      component: confirm,
    },
    {
      path: '/confirmt',
      name: 'confirmt',
      component: confirmt,
    },
    {
      path: '/confirmh',
      name: 'confirmh',
      component: confirmh,
    },
    {
      path: '/map',
      name: 'map',
      component: map,
    },
    {
      path: '/个人信息运输',
      name: '个人信息运输',
      component: 个人信息运输,
    },
    {
      path: '/接收病人',
      name: '接收病人',
      component: 接收病人,
    },
  ],
});
