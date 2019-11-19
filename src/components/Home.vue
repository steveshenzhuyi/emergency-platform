<template>
  <div align="center">
    <img src="./pictrue/logo.png">
    <h2>第五届世界浙商大会</h2>
    <h2>医疗保障系统</h2><hr>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="userId"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
    <div align="center">
    <mt-checklist title="" v-model="savepwdcheck" :options="['保存密码']" style="margin-left: 0px"></mt-checklist>
    </div>
    <hr>
    <br>
    <mt-button size="large" type="primary" @click="check()">登录</mt-button>
    <br>
    <br>
    <br>
    <small style="color: grey">{{version}}</small>
    <!-- <mt-button size="large" type="danger" @click="">忘记密码</mt-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import global from './global.vue'

export default {
  data() {
    return {
      userId: '',
      pwd: '',
      groupNo: '',
      RoleCode:'',
      version:'版本号：v'+global.nowversion,
      savepwd:false,
      savepwdcheck:[]
    };
  },
  mounted(){
    if(window.localStorage.getItem('USERID')!=null && window.localStorage.getItem('USERID')!=undefined){
      this.userId = window.localStorage.getItem('USERID')
    }
    if(window.localStorage.getItem('PWD')!=null && window.localStorage.getItem('PWD')!=undefined){
      this.pwd = window.localStorage.getItem('PWD')
      this.savepwdcheck = ['保存密码']
    }
  },
  methods: {
    check() {
<<<<<<< HEAD
      console.log(this.userId)
      axios.post('/getUserGroup',{
        userId: this.userId
      })
      .then((response) => {
        console.log(response);
        if(response.data.results.length == 0) {
          Toast('用户名错误！')
          return;
        } 
        this.RoleCode = response.data.results[0].RoleCode
        window.localStorage.setItem("VIDEOUSERID",response.data.results[0].VideoId)
        if (response.data.results[0].RoleCode == "R01") {
          //现场组登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          var GN = this.groupNo;
          console.log(response.data.results[0]);
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              window.localStorage.setItem('ROLECODE',this.RoleCode);
              if(this.savepwdcheck[0] == '保存密码'){
                window.localStorage.setItem('PWD',this.pwd)
              }else{
                window.localStorage.removeItem("PWD");
              }
              this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
            }else{
              Toast('密码错误');
            }
          }).catch(function(error){
            console.log("error",error);
          });
        } else if (response.data.results[0].RoleCode == "R02"){
          //运输组登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          var GN = this.groupNo;
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              window.localStorage.setItem('ROLECODE',this.RoleCode);
              if(this.savepwdcheck[0] == '保存密码'){
                window.localStorage.setItem('PWD',this.pwd)
              }else{
                window.localStorage.removeItem("PWD");
              }
  //             window.JPush.setTags({ sequence: 1, tags: [GN] },
  // (result) => {
  //   var sequence = result.sequence
  //   var tags = result.tags  // 数组类型
  //   // alert(sequence)
  //   // alert(tags)
  // }, (error) => {
  //   var sequence = error.sequence
  //   var errorCode = error.code
  // })
              this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
            }else{
              // MessageBox.alert('用户名或密码错误!', '提示');
              Toast('密码错误');
              // alert("用户名或密码错误！");
            }
          }).catch(function(error){
            console.log("error",error);
          });
        } else if (response.data.results[0].RoleCode == "R03"){
          //医院端登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          var GN = this.groupNo;
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              window.localStorage.setItem('ROLECODE',this.RoleCode);
              if(this.savepwdcheck[0] == '保存密码'){
                window.localStorage.setItem('PWD',this.pwd)
              }else{
                window.localStorage.removeItem("PWD");
              }
  //             window.JPush.setTags({ sequence: 1, tags: [GN] },
  // (result) => {
  //   var sequence = result.sequence
  //   var tags = result.tags  // 数组类型
  //   // alert(sequence)
  //   // alert(tags)
  // }, (error) => {
  //   var sequence = error.sequence
  //   var errorCode = error.code
  // })
              this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
            }else{
              // MessageBox.alert('用户名或密码错误!', '提示');
              Toast('密码错误');
              // alert("用户名或密码错误");
            }
          }).catch(function(error){
            console.log("error",error);
          })
        } else if (response.data.results[0].RoleCode == "R04"){
          //专家端登录
          this.groupNo = response.data.results[0].GroupNo;
          window.localStorage.setItem('GROUPNO',this.groupNo);
          var GN = this.groupNo;
          axios.post('/checkPassword',{
            userId: this.userId,
            pwd: this.pwd
          }).then((response) => {
            if (response.data.results == "密码正确") {
              window.localStorage.setItem('USERID',this.userId);
              window.localStorage.setItem('ROLECODE',this.RoleCode);
              if(this.savepwdcheck[0] == '保存密码'){
                window.localStorage.setItem('PWD',this.pwd)
              }else{
                window.localStorage.removeItem("PWD");
              }
  //             window.JPush.setTags({ sequence: 1, tags: [GN] },
  // (result) => {
  //   var sequence = result.sequence
  //   var tags = result.tags  // 数组类型
  //   // alert(sequence)
  //   // alert(tags)
  // }, (error) => {
  //   var sequence = error.sequence
  //   var errorCode = error.code
  // })
              this.$router.push({name: '专家病人列表',params:{SELECTED2:"病人"}});
            }else{
              // MessageBox.alert('用户名或密码错误!', '提示');
              Toast('密码错误');
              // alert("用户名或密码错误");
            }
          }).catch(function(error){
            console.log("error",error);
          })
        }
      })
=======
     if(this.pwd == '123'){
      this.$router.push({name:'command',params:{SELECTED:"指挥",SELECTED1:'1'}});
     }else{
      Toast('密码错误');
     }
>>>>>>> 2137f39155c985cc4cf9c3d42da9e81baac3cdbe
    },
    
  }
};
</script>

