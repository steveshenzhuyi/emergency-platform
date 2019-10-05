<template>
  <div align="center">
    <img src="./pictrue/logo.png">
    <h2>第六届世界互联网大会</h2>
    <h2>急救保障系统指挥端</h2><hr>
    <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="userId"></mt-field> -->
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
    <hr>
    <br>
    <mt-button size="large" type="primary" @click="check()">登录</mt-button>
    <br>
    <!-- <mt-button size="large" type="danger" @click="">忘记密码</mt-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      userId: '',
      pwd: '',
    };
  },
  methods: {
    check() {
     if(this.pwd == '123'){
      this.$router.push({name:'command',params:{SELECTED:"指挥",SELECTED1:'1'}});
     }else{
      Toast('密码错误');
     }
    },
    
  }
};
</script>

