<template>
  <div>
    <h2>重大活动急救保障平台</h2><hr>
    <img src="./pictrue/logo.png">
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="密码" placeholder="确认密码" type="password" v-model="cfmpassword"></mt-field>
    <hr>
    <br>
    <mt-button size="large" type="primary" @click="$goRoute('/Home')">提交</mt-button>
    <br>
    <mt-field label="验证码" placeholder="输入验证码" type="text" v-model="check"></mt-field>
    <mt-button size="large" @click="$goRoute('/forget')">获取验证码</mt-button>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
      cfmpassword: '',
      check: '',
    };
  },
};
</script>

