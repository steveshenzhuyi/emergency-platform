<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header fixed style="font-size:20px" title="病人列表">
          <mt-button size="small" slot="right"
            @click="SEE()"><small>接收病人</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <mt-cell>
          <p v-show="flase">{{chooselevel}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosestate}}&nbsp;&nbsp;&nbsp;&nbsp;{{sortway}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshpatient()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker>
        <div v-for="(item,index) in dataclass1" align="left">
            <hr><a @click="getpatient(index)">
            <b class="first">{{item.PatientId}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;<small>{{item.CreateTime}}</small><br>
            <b class="second">{{item.Name}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>
            {{item.Classification}} &nbsp;
            {{item.StatusNameHos}}</b><br><small>
            性别：{{item.Gender}} &nbsp; 
            年龄：{{item.Age}} &nbsp;&nbsp;&nbsp;&nbsp;
            {{item.OrganizationName}}&nbsp;&nbsp;
            {{item.CarName}}&nbsp;
            {{item.CarId}}
            {{item.Pcost}}</small></a>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header fixed style="font-size:20px" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <hr>
          <!-- <mt-button slot="right" @click="$goRoute('/increaseCH')"><small>新增信息</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br>
        <mt-cell>
          <p v-show="flase">{{choosesituation}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosesort}}&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshmessage()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots1" @change="onMessagechange" :visible-item-count="3"></mt-picker>
        <div v-for=" (item,index) in data3" align="left">
          <hr><a @click="getMessage(index)">
            <big><b>
              序号{{item.MessageNo}}</b></big><br>
              <b>{{item.MessageTitle}}</b><br>
            <small>{{item.MessageDetail}}&nbsp;<br>
              发送时间：{{item.SendTime}}</small>
          </a>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="个人">
        <mt-header fixed style="font-size:20px" title="个人信息">
          <!-- <mt-button slot="right" @click="edit">修改</mt-button> -->
        </mt-header>
        <br><br>
        <br>
        <p style="text-align: left">个人信息</p>
          <mt-field label="姓名" v-model="Name" disabled="true"></mt-field>
          <mt-field label="性别" v-model="Gender" disabled="true"></mt-field>
          <mt-field label="年龄" v-model="Age" disabled="true"></mt-field>
          <mt-field label="手机" v-model="Phone" disabled="true"></mt-field>
          <mt-field label="邮箱" v-model="Email" disabled="true"></mt-field>
          <mt-field label="单位" v-model="DepartmentName" disabled="true"></mt-field>
          <mt-field label="职称" v-model="TitleName" disabled="true"></mt-field>
          <hr>
          <p style="text-align: left">角色：医院组</p>
          <mt-field label="所属小组" v-model="GroupName" disabled="true"></mt-field>
          <mt-field label="组内职务" v-model="GroupPosition" disabled="true"></mt-field>
          <mt-field label="责任区域" v-model="ManageArea" disabled="true"></mt-field>
          <mt-field label="重点保障对象" v-model="GuaranteeObject" disabled="true"></mt-field><hr>
          <mt-button size="large">修改密码</mt-button><br>
          <mt-button size="large"  type="danger" @click="$goRoute('/Home')">退出登录</mt-button><br>
          <hr>
          <br><br>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="病人">
          <img slot="icon" src="./icon/病人.png"><b style="font-size:15px">病人</b>
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
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      selected: '',
      value: '',
      value1: '',
      Name: '',
      TitleName: '',
      DepartmentName: '',
      Gender: '',
      Age: '',
      Phone: '',
      Email: '',
      GuaranteeObject: '',
      GroupPosition: '',
      GroupName: '',
      ManageArea: '',
      chooselevel: '',
      choosestate: '',
      choosesituation: '',
      choosesort: '',
      sortway: '',
      resourceNo: '',
      mark: '',
      OrganizationCode: '',
      slots1: [
          {
            flex: 3,
            values: ['全部','紧急标识', '普通消息'],
            className: 'slot6',
          },
          { 
            flex: 3,
            values: ['时间倒序','时间正序'],
            className: 'slot8',
          },
        ],
      slots: [
          { 
            flex: 1,
            values: ['选择分级','I级', 'II级', 'III级', 'IV级','V级'],
            textAlign: 'left',
            className: 'slot1',
          },
          {
            flex: 1,
            values: ['选择状态','待后送','后送中','已入院','已出院'],
            className: 'slot2',
          },
          { 
            flex: 1,
            values: ['时间排序','分级排序'],
            textAlign: 'right',
            className: 'slot3',
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
      message: [],
      data3: [
        {},
      ],
    };
  },
  mounted() {
    this.getpagelist()
  },
  methods: {
     SEE(){
      var that = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var res = result.text
        that.$router.push({name: 'confirmh',params:{PATIENTID:res}});
        },
        function (error) {
          alert(error)
        }
      )

    },
    getpagelist() {
      console.log(this.groupNo);
      this.selected=this.$route.params.SELECTED2;
      //获取病人列表分级
      axios.post('/getPatientListHospitalClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取病人列表时间排序
      axios.post('/getPatientListHospitalCreatetime',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistTime=response.data.results;
        this.dataclass1=this.PatientlistClass
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取医院组信息列表
      axios.post('/getHosMessage',{
        groupNo: this.groupNo
      }).then((response) => {
        this.message=response.data.results
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
        this.Name=response.data.results[0].Username;
        this.DepartmentName=response.data.results[0].DepartmentName;
        this.Gender=response.data.results[0].Gender;
        this.Age=response.data.results[0].Age;
        this.Phone=response.data.results[0].Phone;
        this.Email=response.data.results[0].Email;
        console.log(response)
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
    onMessagechange(picker,values) {
      this.choosesituation = values[0];
      this.choosesort = values[1];
    },
    //获取单一资源信息
    // getResource:function(index){
    //   console.log(index)
    //   this.$router.push({name: 'B3',params:{RESOURCENO:this.data2[index].ResourceNo}});
    // },
    getMessage:function(index){
      console.log(index)
      this.$router.push({name: 'C3',params:{MESSAGENO:this.data3[index].MessageNo}});
    },
    getpatient:function(index){
      console.log(index)
      this.$router.push({name: 'H1',params:{PATIENTID:this.dataclass1[index].PatientId}})
    },
    refreshpatient() {
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
          if (this.choosestate != this.dataclass1[i].StatusNameHos) {
            continue;
          }
        }
        tmp.push(this.dataclass1[i]);
      }
      this.dataclass1 = tmp;
    },
    refreshmessage() {
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
    phone(){
      Toast('开发中！');
    }
  },
};
</script>

<style>
  b{
    font-size:20px;
  }
</style>