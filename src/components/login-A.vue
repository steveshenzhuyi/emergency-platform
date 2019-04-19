<template>
  <div align="center">
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header style="font-size:20px" title="病人列表">
          <mt-button size="small" type="danger" slot="left"
            @click="$goRoute('/CPR')"><small>CPR</small></mt-button>
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseA')"><small>新增病人</small></mt-button>
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="false">{{chooselevel}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosestate}}&nbsp;&nbsp;&nbsp;&nbsp;{{sortway}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshPatient()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker>
        <div v-for="(item,index) in dataclass1" align="left">
            <hr><a @click="getpatient(index)">
            <b class="first">{{item.PatientId}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;<small>{{item.CreateTime}}</small><br>
            <b class="second">{{item.Name}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>
            {{item.Classification}} &nbsp;
            {{item.StatusNameCar}}</b><br><small>
            性别：{{item.Gender}} &nbsp; 
            年龄：{{item.Age}} &nbsp;&nbsp;&nbsp;&nbsp;
            {{item.OrganizationName}}&nbsp;&nbsp; 
            {{item.CarName}}&nbsp;
            {{item.CarId}}
            {{item.Pcost}}</small></a>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="资源">
        <mt-header style="font-size:20px" title="资源列表">
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseB')"><small>新增资源</small></mt-button>
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="false">{{choosekind}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosenumber}}&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshresource()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots1" @change="onResourcelistChange" :visible-item-count="3"></mt-picker>
        <div v-for=" (item,index) in data2" :data2-index="{index}" align="left">
          <hr><a @click="getResource(index)">
          <b>{{ item.ResourceNo }} &nbsp;&nbsp;
             {{item.ResourceName}}</b><br>
          <small>规格：{{item.Standard}} &nbsp;&nbsp;
                 {{item.Sstate}}状态：在库 &nbsp;&nbsp;
                 数量：{{item.Amount}}</small></a>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header style="font-size:20px" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <!-- <mt-button slot="right" @click="$goRoute('/increaseC')"><small>新增信息</small></mt-button> -->
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="false">{{choosesituation}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosesort}}&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshMessage()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots2" @change="onMessagechange" :visible-item-count="3"></mt-picker>
        <div v-for=" (item,index) in data3" align="left">
          <hr><a @click="getMessage(index)">
            <big><b>
              序号{{item.MessageNo}}</b></big><br>
              <b>{{item.MessageTitle}}</b><br>
           <!--  <small>{{item.MessageDetail}}&nbsp;<br> -->
              发送时间：{{item.SendTime}}</small>
          </a>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="个人">
        <mt-header style="font-size:20px" title="个人信息">
          <!-- <mt-button slot="right" @click="edit"><small>修改</small></mt-button> -->
          <hr>
        </mt-header>
        <p style="text-align: left">个人信息</p>
        <mt-field label="姓名" v-model="Name" disabled="true"></mt-field>
        <mt-field label="性别" v-model="Gender" disabled="true"></mt-field>
        <mt-field label="年龄" v-model="Age" disabled="true"></mt-field>
        <mt-field label="手机" v-model="Phone" disabled="true"></mt-field>
        <mt-field label="邮箱" v-model="Email" disabled="true"></mt-field>
        <mt-field label="职称" v-model="TitleName" disabled="true"></mt-field>
        <mt-field label="科室" v-model="DepartmentName" disabled="true"></mt-field><hr>
        <p style="text-align: left">角色：现场组</p>
        <mt-field label="所属小组" v-model="GroupName" disabled="true"></mt-field>
        <mt-field label="组内职务" v-model="GroupPosition" disabled="true"></mt-field>
        <mt-field label="责任区域" v-model="ManageArea" disabled="true"></mt-field>
        <mt-field label="重点保障对象" v-model="GuaranteeObject" disabled="true"></mt-field><hr>
        <mt-button size="large">修改密码</mt-button><br>
        <mt-button size="large" type="danger" @click="$goRoute('/Home')">退出登录</mt-button><br><br><br><br>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="病人">
          <img slot="icon" src="./icon/病人.png"><b style="font-size:15px">病人</b>
        </mt-tab-item>
        <mt-tab-item id="资源">
         <img slot="icon" src="./icon/资源.png"><b style="font-size:15px">资源</b>
        </mt-tab-item>
        <mt-tab-item id="沟通">
          <img slot="icon" src="./icon/沟通.png"><b style="font-size:15px">沟通</b>
        </mt-tab-item>
        <mt-tab-item id="个人">
          <img slot="icon" src="./icon/个人.png"><b style="font-size:15px">个人</b>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {picker} from 'mint-ui';
import axios from 'axios';

export default {
  inject:['reload'],
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      StatusName: '',
      selected: '',
      mark: '',
      ResourceType: '',
      search: '',
      search1: '',
      Name: '',
      Gender: '',
      Age: '',
      Phone: '',
      Email: '',
      TitleName: '',
      DepartmentName: '',
      GroupName: '',
      GroupPosition: '', 
      ManageArea: '',
      GuaranteeObject: '',
      chooselevel: '',
      choosestate: '',
      choosekind: '',
      choosenumber: '',
      choosesituation: '',
      choosesort: '',
      sortway: '',
      resourceNo: '',
      Selected: '',
      slots: [
          { 
            flex: 1,
            values: ['选择分级','I级', 'II级', 'III级', 'IV级','V级'],
            textAlign: 'left',
            className: 'slot1',
          },
          {
            flex: 1,
            values: ['选择状态','处置中','待后送','已后送','处置完成'],
            className: 'slot2',
          },
          { 
            flex: 1,
            values: ['分级排序','时间排序'],
            textAlign: 'right',
            className: 'slot3',
          },
        ],
      slots1: [
          {
            flex: 2,
            values: ['全部','药品', '器材', '其他'],
            className: 'slot4',
          },
          { 
            flex: 2,
            values: ['编号正序', '编号倒序'],
            className: 'slot5',
          },
        ],
      slots2: [
          {
            flex: 3,
            values: ['全部','紧急标识', '普通消息'],
            className: 'slot6',
          },
          { 
            flex: 3,
            values: ['时间正序','时间倒序'],
            className: 'slot8',
          },
        ],
      PatientlistClass: [],
      PatientlistTime: [],
      dataclass1: [
        {},  
      ],
      datatime1: [
        {},
      ],
      data2: [
        {},
      ],
      data3: [
        {},
      ],
      message: [],
      resource: [],
    };
  },
  mounted() {
    this.getpagelist()
  },
  methods: {
    getpagelist() {
      console.log(this.groupNo);
      this.selected=this.$route.params.SELECTED;
      console.log(this.selected);
      //获取病人列表分级
      axios.post('/getPatientlistEmergencyClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        this.dataclass1=this.PatientlistClass
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取病人列表时间排序
      axios.post('/getPatientlistEmergencyCreatetime',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistTime=response.data.results;
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取资源列表
      axios.post('/getResourceListByGroup',{
        groupNo: this.groupNo
      }).then((response) => {
        this.resource=response.data.results
        this.data2=this.resource
        console.log(response);
        console.log(this.data2);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取现场组信息列表
      axios.post('/getAssemblyMessage',{
        groupNo: this.groupNo
      }).then((response) => {
        this.message = response.data.results
        this.data3=this.message
        console.log(response);
        console.log(this.data3);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取用户个人信息
      axios.post('/getUserInfo',{
        userId: this.userId
      }).then((response) => {
        this.TitleName=response.data.results[0].TitleName;
        this.Name=response.data.results[0].Name;
        this.DepartmentName=response.data.results[0].DepartmentName;
        this.Gender=response.data.results[0].Gender;
        this.Age=response.data.results[0].Age;
        this.Phone=response.data.results[0].Phone;
        this.Email=response.data.results[0].Email;
      })
      axios.post('/getUserGroup',{
        userId: this.userId
      }).then((response) => {
        this.GuaranteeObject=response.data.results[0].GuaranteeObject;
        this.ManageArea=response.data.results[0].ManageArea;
        this.GroupName=response.data.results[0].GroupName;
        this.GroupPosition=response.data.results[0].GroupPosition;
      })
    },
    //病人列表排序方法
    onPatientlistChange(picker, values) {
      this.chooselevel = values[0];
      this.choosestate = values[1];
      this.sortway = values[2];
    },
    onResourcelistChange(picker,values) {
      this.choosekind = values[0];
      this.choosenumber = values[1];
    },
    onMessagechange(picker,values) {
      this.choosesituation = values[0];
      this.choosesort = values[1];
    },
    //获取单一资源信息
    getResource:function(index){
      console.log(index)
      this.$router.push({name: '资源详情',params:{RESOURCENO:this.data2[index].ResourceNo}});
    },
    getMessage:function(index){
      console.log(index)
      this.$router.push({name: 'C1',params:{MESSAGENO:this.data3[index].MessageNo}});
    },
    getpatient:function(index){
      console.log(index)
      this.$router.push({name: 'A1',
      params:{PATIENTID:this.dataclass1[index].PatientId,STATUSNAME:this.dataclass1[index].StatusName,SELECTED1:"患者病历"}})
    },
    //刷新各指定页面
    refreshPatient() {
      if(this.sortway == "时间排序") {
        this.dataclass1=this.PatientlistTime
      }else if(this.sortway == "分级排序"){
        this.dataclass1=this.PatientlistClass
      }
      var tmp = new Array();
      for(var i=0; i<this.dataclass1.length;i++) {
        if (this.chooselevel != '选择分级') {
          if (this.chooselevel != this.dataclass1[i].Classification) {
            continue;
          }
        }
        if (this.choosestate != '选择状态') {
          if (this.choosestate != this.dataclass1[i].StatusName) {
            continue;
          }
        }
        tmp.push(this.dataclass1[i]);
      }
      this.dataclass1 = tmp;
    },
    refreshMessage() {
      this.data3=this.message;
      var tmp = new Array();
      for(var i=0; i<this.data3.length;i++) {
        if(this.choosesituation != '全部') {
          if(this.choosesituation == '普通消息'){
            this.mark = '0'
          }
          if(this.choosesituation == '紧急标识'){
            this.mark = '1'
          }
          if(this.mark != this.data3[i].Mark) {
            continue;
          }
        }
        tmp.push(this.data3[i]);
      }
      this.data3 = tmp;
    },
    refreshresource() {
      this.data2=this.resource;
      var tmp = new Array();
      for(var i=0; i<this.data2.length; i++) {
        if(this.choosekind != '全部') {
          if(this.choosekind == '药品') {
            this.ResourceType = '1'
          }
          if(this.choosekind == '器材') {
            this.ResourceType = '2'
          }
          if(this.choosekind == '其他') {
            this.ResourceType = '3'
          }
          if(this.ResourceType != this.data2[i].ResourceType) {
            continue;
          }
        }
        tmp.push(this.data2[i]);
      }
      this.data2 = tmp;
    }
  },
};
</script>

<style>
  b.second{
    font-size:20px;
  };
  b.first{
    font-size:15px;
  }
</style>
