<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header fixed style="font-size:25px;height: 50px;" title="病人列表">
          <!-- <mt-button size="small" type="danger" slot="left"
            @click="$goRoute('/CPR')"><small>CPR</small></mt-button> -->
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseA')"><small>新增病人</small></mt-button>
          <hr>
        </mt-header>
        <br><br>  
        <div align="left"  style="width:80%;">
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3" :itemHeight='30'></mt-picker></div>
        <div align="right"><mt-button size="small" type="primary" style="position:relative;top:-60px"
        @click="getpagelist()">刷新</mt-button></div>
        <div v-for="(item,index) in dataclass1" align="left" style="position:relative;top:-40px">
            <hr><a @click="getpatient(index)">
            <div><span>{{item.PatientId}}</span>
            <span><small style="position:absolute;left:110px">{{item.CreateTime}}</small></span></div>
            <!-- <br> -->
            <div><span style="font-size:23px;" :style="{'color':(item.VIPTag == '1'?'red':'black')}">{{item.Name}}</span>
            <span style="position:absolute;left:110px;font-size:20px;" :class="item.Classification">{{item.Classification}}</span>
            <span style="position:absolute;left:220px;font-size:20px;" :class="item.StatusName">{{item.StatusName}}</span></div>
            <!-- <br> -->
            <div>
            <small style="color:grey">
            性别：{{item.Gender}}</small>
            <small style="color:grey;position:absolute;left:110px;">年龄：{{item.Age}}</small>
            <small style="width:15em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
            color:grey;position:absolute;left:220px;">症状：{{item.Diagnose}}</small></div>
            <div>
            <small style="color:grey">医院：{{item.OrganizationName}}</small>
            <small style="color:grey;position:absolute;left:110px;">车辆：{{item.CarName}}</small>
            <small style="color:grey;position:absolute;left:220px;">车号：{{item.CarId}}</small>
            <small style="color:grey;position:absolute;left:330px;">{{item.Time}}</small>
            </div></a>
        </div>
        <br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="资源">
        <mt-header fixed style="font-size:25px;height: 50px;" title="资源列表">
          <!-- <mt-button size="small" slot="right" @click="$goRoute('/increaseB')"><small>新增资源</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br>
        <div style="width:80%;">
        <mt-picker :slots="slots1" @change="onResourcelistChange" :visible-item-count="3" :itemHeight='30'></mt-picker>
        </div>
        <div align="right">
        <mt-button size="small" type="primary" style="position:relative;top:-60px" @click="getResourceList()">刷新</mt-button></div>
        <div v-for=" (item,index) in data2" :data2-index="{index}" align="left" style="position:relative;top:-40px">
          <hr><a @click="getResource(index)">
          <div style="font-size: 20px;">{{ item.ResourceNo }} &nbsp;&nbsp;&nbsp;
             {{item.ResourceName}}</div>
          <small style="color:grey">规格：{{item.Standard}}</small>
          <small style="color:grey;position:absolute;left:100px;">状态：{{item.Status}}</small>
          <small style="color:grey;position:absolute;left:192px;">数量：{{item.Amount}}</small>
        <small style="color:grey;position:absolute;left:280px;">单位：{{item.Unit}}</small></a>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header fixed style="font-size:25px;height: 50px;" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <mt-button slot="right" @click="oneClickNeedHelp()"><small>一键求助</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <h4 v-show="GLOBAL.showVideoAlert" style="color:red">您有视频通话邀请，请点击左上角进入</h4>
        <div style="width:80%;">
        <mt-picker :slots="slots2" @change="onMessagechange" :visible-item-count="3" :itemHeight='30'></mt-picker></div>
        <div align="right">
          <mt-button size="small" type="primary" style="position:relative;top:-60px" @click="getMessageList()">刷新</mt-button>
        </div>
        <div v-for=" (item,index) in data3" align="left" style="position:relative;top:-40px">
          <hr><a @click="getMessage(index)">
            <div>
              序号{{item.MessageNo}}<br></div>
              <div style="font-size: 20px;">{{item.MessageTitle}}<br></div>
              <small style="color:grey">发送时间：{{item.SendTime}}</small>
          </a>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="个人">
        <mt-header fixed style="font-size:25px;height: 50px;" title="个人信息">
          <!-- <mt-button slot="right" @click="edit"><small>修改</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br><br>
        <div style="text-align: left; margin-top: 10px">个人信息</div>
        <mt-field label="姓名" v-model="Name" disabled></mt-field>
        <mt-field label="性别" v-model="Gender" disabled></mt-field>
        <mt-field label="年龄" v-model="Age" disabled></mt-field>
        <mt-field label="手机" v-model="Phone" disabled></mt-field>
        <mt-field label="邮箱" v-model="Email" disabled></mt-field>
        <mt-field label="职称" v-model="TitleName" disabled></mt-field>
        <mt-field label="科室" v-model="DepartmentName" disabled></mt-field><hr>
        <div style="text-align: left; margin-top: 10px">角色：现场组</div>
        <mt-field label="所属小组" v-model="GroupName" disabled></mt-field>
        <mt-field label="组内职务" v-model="GroupPosition" disabled></mt-field>
        <mt-field label="责任区域" v-model="ManageArea" disabled></mt-field>
        <mt-field label="重点保障对象" v-model="GuaranteeObject" disabled></mt-field><hr>
        <mt-button size="large">修改密码</mt-button><br>
        <mt-button size="large" type="danger" @click="logout()">退出登录</mt-button><br><br><br><br>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="病人">
          <img slot="icon" src="./icon/病人.png"><div style="font-size:12px">病人</div>
        </mt-tab-item>
        <mt-tab-item id="资源">
         <img slot="icon" src="./icon/资源.png"><div style="font-size:12px">资源</div>
        </mt-tab-item>
        <mt-tab-item id="沟通">
          <img slot="icon" src="./icon/沟通.png"><div style="font-size:12px">沟通</div>
        </mt-tab-item>
        <mt-tab-item id="个人">
          <img slot="icon" src="./icon/个人.png"><div style="font-size:12px">个人</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {picker} from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  // inject:['reload'],
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      StatusName: '',
      selected: '沟通',
      mark: '',
      isshow1: false,
      isshow2: false,
      isshow3: false,
      isshow4: false,
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
      chooselevel: '选择分级',
      choosestate: '选择状态',
      choosekind: '全部',
      choosenumber: '编号正序',
      choosesituation: '全部',
      choosesort: '时间倒序',
      sortway: "时间排序",
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
            values: ['时间排序','分级排序'],
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
            values: ['时间倒序','时间正序'],
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
      videoalert:'',
      Longitude:0,
      Latitude:0,
      myPosition:'',
      hosList:[],
      carList:[],
      driving:'',
    };
  },
  mounted() {
    console.log(this.groupNo);
    this.selected=this.$route.params.SELECTED;
    console.log(this.selected);
    this.getpagelist()
    // this.getUserInfo()
    this.getMessageList()
    this.getResourceList()
    this.videoalert = this.showVideoAlert
  },
  methods: {
    getpagelist() {
      axios.post('/getPatientlistEmergencyClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        axios.post('/getPatientlistEmergencyCreatetime',{
          groupNo: this.groupNo
        }).then((response) => {
          this.PatientlistTime=response.data.results;
          this.refreshPatient();
          this.getUserInfo();
          setTimeout(()=>{
            this.addTimeToPatient()
          },1000)
        }).catch(function(error){
          console.log("error",error);
        })
      }).catch(function(error){
        console.log("error",error);
      })
    },
    addTimeToPatient(){
      for(var i=0; i<this.PatientlistClass.length;i++){
        if(this.PatientlistClass[i].Status == 'S03'){
          if(this.PatientlistClass[i].CarNo == "000"){
            for(var j=0; j<this.hosList.length; j++){
              if(this.PatientlistClass[i].HosNo == this.hosList[j].HosNo){
                this.PatientlistClass[i].Time = "预计到达时间"+Math.round(this.hosList[j].searchresult.routes[0].time/60)+"分钟";
                break;
              }
            }
          }else if(this.PatientlistClass[i].CarNo != "" || this.PatientlistClass[i].CarNo!= null){
            for(var k=0; k<this.carList.length; k++){
              if(this.PatientlistClass[i].CarNo == this.carList[k].CarNo){
                this.PatientlistClass[i].Time = "预计到达时间"+Math.round(this.carList[k].searchresult.routes[0].time/60)+"分钟";
                break;
              }
            }
          }else this.PatientlistClass[i].Time = '';
        }
      }

      for(var i=0; i<this.PatientlistTime.length;i++){
        if(this.PatientlistTime[i].Status == 'S03'){
          if(this.PatientlistTime[i].CarNo == "000"){
            for(var j=0; j<this.hosList.length; j++){
              if(this.PatientlistTime[i].HosNo == this.hosList[j].HosNo){
                this.PatientlistTime[i].Time = "预计到达时间"+Math.round(this.hosList[j].searchresult.routes[0].time/60)+"分钟";
                break;
              }
            }
          }else if(this.PatientlistTime[i].CarNo != "" || this.PatientlistTime[i].CarNo!= null){
            for(var k=0; k<this.carList.length; k++){
              if(this.PatientlistTime[i].CarNo == this.carList[k].CarNo){
                this.PatientlistTime[i].Time = "预计到达时间"+Math.round(this.carList[k].searchresult.routes[0].time/60)+"分钟";
                break;
              }
            }
          }else this.PatientlistTime[i].Time = '';
        }
      }
      console.log(this.PatientlistClass)
      console.log(this.PatientlistTime)
      this.refreshPatient();

    },
    getResourceList(){
      //获取资源列表
      axios.post('/getResourceListByGroup',{
        groupNo: this.groupNo
      }).then((response) => {
        this.resource=response.data.results
        for(var i=0; i<this.resource.length;i++) {
          if(this.resource[i].Status == "1"){
            this.resource[i].Status = "在库"
          }
        }
        this.refreshresource()
      }).catch(function(error){
        console.log("error",error);
      })
    },
    getMessageList(){
      //获取现场组信息列表
      axios.post('/getAssemblyMessage',{
        groupNo: this.groupNo
      }).then((response) => {
        this.message = response.data.results
        this.refreshMessage()
      }).catch(function(error){
        console.log("error",error);
      })
    },
    getUserInfo(){
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
        this.Latitude = response.data.results[0].Latitude;
        this.Longitude = response.data.results[0].Longitude;
        window.localStorage.setItem("Latitude",this.Latitude)
        window.localStorage.setItem("Longitude",this.Longitude)
        this.myPosition = new AMap.LngLat(this.Longitude, this.Latitude);
        var GN = this.groupNo;
        if(this.GroupPosition == '组长'){
          window.JPush.setTags({ sequence: 1, tags: [GN, 'groupLeader']},
          (result) => {
            var sequence = result.sequence
            var tags = result.tags
          }, (error) => {
            console.log(error)
          })
        }else{
          window.JPush.setTags({ sequence: 1, tags: [GN, 'worker']},
          (result) => {
            var sequence = result.sequence
            var tags = result.tags
          }, (error) => {
            console.log(error)
          })
        }

        axios.get('/getHosList',{}).then((response) => {
          this.hosList = response.data.results; 
          var that = this;
          AMap.plugin(['AMap.Driving'],function(){
            that.driving = new AMap.Driving({ //用不上
              policy: AMap.DrivingPolicy.LEAST_TIME
            })
          });
          for(var i=0;i<that.hosList.length;i++){
           (function(j){
           that.hosList[j].position = new AMap.LngLat(response.data.results[j].Longitude, response.data.results[j].Latitude)             
            new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME}).search(that.myPosition, that.hosList[j].position, function (status, result) {
              that.hosList[j].searchresult = result
            })
          })(i) 
        }
      }).catch(function(error){
        console.log("error",error);
      })

      axios.get('/getCarList',{}).then((response) => {
        var that = this;
        var carlist = response.data.results;
        var x  =carlist.shift()
        that.carList = response.data.results
        
        AMap.plugin(['AMap.Driving'],function(){
          that.driving = new AMap.Driving({
            policy: AMap.DrivingPolicy.LEAST_TIME
          })
        });
        for(var i=0;i<that.carList.length;i++){
         (function(j){
          that.carList[j].position = new AMap.LngLat(response.data.results[j].Longitude, response.data.results[j].Latitude)
          new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME}).search(that.carList[j].position,that.myPosition, function (status, result) {
            that.carList[j].searchresult = result
          })
        })(i)
      }
    }).catch(function(error){
      console.log("error",error);
    })




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
      window.localStorage.setItem('MESSAGENO',this.data3[index].MessageNo)
      this.$router.push({name: 'C1'});
    },
    getpatient:function(index){
      console.log(index)
      this.$router.push({name: 'A1',
      params:{PATIENTID:this.dataclass1[index].PatientId,STATUSNAME:this.dataclass1[index].StatusName,SELECTED1:"患者病历"}})
    },
    //刷新各指定页面
    refreshPatient() {
      this.dataclass1 = []
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
      this.data3 = []
      var x =this.message;
      if(this.choosesort == '时间正序') {
          x.reverse();
        }
      for(var i=0; i<x.length;i++) {
        if(this.choosesituation != '全部') {
          if(this.choosesituation == '普通消息'){
            this.mark = '0'
          }
          if(this.choosesituation == '紧急标识'){
            this.mark = '1'
          }
          if(this.mark != x[i].Mark) {
            continue;
          }
        }
        this.data3.push(x[i]);
      }
    },
    refreshresource() {
      this.data2=[];
      var tmp = this.resource;
      if(this.choosenumber == '编号倒序') {
          tmp.reverse();
        }
      for(var i=0; i<tmp.length; i++) {
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
          if(this.ResourceType != tmp[i].ResourceType) {
            continue;
          }
        }
        this.data2.push(tmp[i]);
      }
    },
    phone(){
      this.GLOBAL.changeVideoAlert(false)
      var scheme = 'com.tencent.trtc';
      appAvailability.check(scheme,
        function() {
          var sApp = startApp.set({"application":"com.tencent.trtc"
        });
        sApp.start(function() {
          }, function(error) {
            alert(error);
          });
        },
        function() {
          alert(scheme + ' is not available');
        }
      );     
    },
    oneClickNeedHelp(){
      axios.post('/oneClickNeedHelp',{
        groupNo: window.localStorage.getItem('GROUPNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast("成功上报指挥中心，请打开AR眼镜视频实况功能和本系统视频通话功能");
        }else{
          Toast("上报失败");
        }
      })
    },
    logout(){
      window.JPush.cleanTags({ sequence: 1 },
        (result) => {
          console.log(result)
          this.$router.push({name:'Home'})
        }, (error) => {
          console.log(err)
        })
    }
  },
};
</script>

<style>
  .I级{
    color:red;
  }
  .II级{
    color:orange;
  }
  .III级{
    color:#E6BD1A;
  }
  .IV级{
    color:blue;
  }
  .V级{
    color:blue;
  }
  .处置完成{
    color:green;
  }
  .已后送{
    color:green;
  }
  .待后送{
    color:red;
  }
  .处置中{
    color:red;
  }
</style>
