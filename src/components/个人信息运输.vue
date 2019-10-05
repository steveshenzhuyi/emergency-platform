<template>
  <div>
    <mt-header fixed style="font-size:25px;height: 50px;" title="个人信息">
      <mt-button slot="left" icon="back" @click="returnT()"><small>返回</small></mt-button>
      <!-- <mt-button slot="right" @click="edit">修改</mt-button> -->
      <hr>
    </mt-header>
    <br><br><br>
        <div style="text-align: left; margin-top: 10px">个人信息</div>
        <mt-field label="姓名" v-model="name" disabled></mt-field>
        <mt-field label="性别" v-model="sex" disabled></mt-field>
        <mt-field label="年龄" v-model="age" disabled></mt-field>
        <mt-field label="手机" v-model="phone" disabled></mt-field>
        <mt-field label="邮箱" v-model="email" disabled></mt-field>
        <mt-field label="单位" v-model="company" disabled></mt-field>
        <mt-field label="职称" v-model="title" disabled></mt-field>
        <hr>
        <div style="text-align: left; margin-top: 10px">角色：运输组</div>
        <mt-field label="所属小组" v-model="groupname" disabled></mt-field>
        <mt-field label="组内职务" v-model="work" disabled></mt-field>
        <mt-field label="责任区域" v-model="region" disabled></mt-field>
        <mt-field label="重点保障对象" v-model="target" disabled></mt-field><hr>
        <mt-button size="large" @click="showchangepwd=true">修改密码</mt-button><br>
        <mt-field label="新密码" v-model="pwd1" v-show="showchangepwd"></mt-field>
        <mt-field label="确认密码" v-model="pwd2" v-show="showchangepwd"></mt-field>
        <mt-button v-show="showchangepwd" size="small" style="margin-right:40px" @click="showchangepwd=false">取消</mt-button>
        <mt-button v-show="showchangepwd" size="small" type="primary" @click="changepwd()">确定</mt-button>
        <hr v-show="showchangepwd">
        <mt-button size="large" type="danger" @click="logout()">退出登录</mt-button><br>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      name: '',
      sex: '',
      age: '',
      phone: '',
      email: '',
      company: '',
      title: '',
      department: '',
      groupname: '',
      work: '',
      region: '',
      target: '',
      showchangepwd:false,
      pwd2:'',
      pwd1:''
    };
  },
  mounted() {
    this.getuserinfo()
  },
  methods: {
    getuserinfo() {
      //获取用户个人信息
      axios.post('/getUserInfo',{
        userId: this.userId
      }).then((response) => {
        this.title=response.data.results[0].TitleName;
        this.name=response.data.results[0].Username;
        this.company=response.data.results[0].DepartmentName;
        this.sex=response.data.results[0].Gender;
        this.Age=response.data.results[0].Age;
        this.phone=response.data.results[0].Phone;
        this.Email=response.data.results[0].Email;
        console.log(response)
      })
      axios.post('/getUserGroup',{
        userId: this.userId
      }).then((response) => {
        this.target=response.data.results[0].GuaranteeObject;
        this.region=response.data.results[0].ManageArea;
        this.groupname=response.data.results[0].GroupName;
        this.work=response.data.results[0].GroupPosition;
        console.log(response)
      })
    },
    returnT() {
      this.$router.push({name: '转运列表',params:{SELECTED1:"个人"}});
    },
    logout(){
      window.JPush.cleanTags({ sequence: 1 },
        (result) => {
         this.$router.push({name:'Home'})
        }, (error) => {
          console.log(err)
        })
    },
    changepwd(){
      if(this.pwd1==this.pwd2){
         axios.post('/changePwd',{
        userId:window.localStorage.getItem('USERID'),
        pwd:this.pwd2
      }).then((response) => {
        if(response.data.results == "修改成功") {
          Toast("修改成功");
          this.pwd1 = ''
          this.pwd2 = ''
          this.showchangepwd = false
        }else{
          Toast("修改失败");
        }
      })
      }else{
        Toast("两次密码不一致");
      }
    }
  }
};
</script>
