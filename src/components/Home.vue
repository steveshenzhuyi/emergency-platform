<template>
  <div align="center">
    <img src="./pictrue/logo.png">
    <h2>之江实验室</h2>
    <h2>重大活动急救保障平台</h2><hr>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="userId"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
    <hr>
    <br>
    <mt-button size="large" type="primary" @click="check()">登录</mt-button>
    <br>
    <mt-button size="large" @click="$goRoute('/forget')">忘记密码</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      userId: '',
      pwd: '',
      groupNo: '',
    };
  },
  methods: {
    //先判断用户的小组
    check() {
      console.log(this.userId)
      axios.post('/getUserGroup',{
        userId: this.userId
      })
      .then((response) => {
        console.log(response);
        if (response.data.results[0].RoleCode == "R01") {
          //现场组登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          console.log(response.data.results[0]);
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
            }else{
              Toast('用户名或密码错误！')
            }
          }).catch(function(error){
            console.log("error",error);
          });
        } else if (response.data.results[0].RoleCode == "R02"){
          //运输组登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
            }else{
              Toast('用户名或密码错误！')
            }
          }).catch(function(error){
            console.log("error",error);
          });
        } else if (response.data.results[0].RoleCode == "R03"){
          //医院端登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
            }else{
              Toast('用户名或密码错误！')
            }
          }).catch(function(error){
            console.log("error",error);
          })
        }
      })
    },
    hospital() {
      this.$router.push({name: '医院病人列表'});
    },
    trans() {
      this.$router.push({name: '转运列表'});
    }
  }
};
</script>
