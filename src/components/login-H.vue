<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header fixed style="font-size:25px;height: 50px;" title="病人列表">
          <mt-button size="small" slot="left"
            @click="$goRoute('/CPR')"><small>今日统计</small></mt-button>
          <mt-button size="small" slot="right"
            @click="SEE()"><small>接收病人</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div  style="width:80%;">
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3" :itemHeight='30'></mt-picker></div>
        <div align="right"><mt-button size="small" type="primary" style="position:relative;top:-60px"
        @click="getpagelist()">刷新</mt-button></div>
        <div v-for="(item,index) in dataclass1" align="left" style="position:relative;top:-40px">
            <hr><a @click="getpatient(index)">
            <div><span>{{item.PatientId}}</span>
            <span><small style="position:absolute;left:110px">{{item.CreateTime}}</small></span></div>
            <!-- <br> -->
            <div><span style="font-size:23px;">{{item.Name}}</span>
            <span style="position:absolute;left:110px;font-size:20px;" :class="item.Classification">{{item.Classification}}</span>
            <span style="position:absolute;left:220px;font-size:20px;" :class="item.StatusNameHos">{{item.StatusNameHos}}</span></div>
            <!-- <br> -->
            <div>
            <small style="color:grey">
            性别：{{item.Gender}}</small>
            <small style="color:grey;position:absolute;left:110px;">年龄：{{item.Age}}</small>
            <small style="width:9em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;
            color:grey;position:absolute;left:220px;">症状：{{item.Diagnose}}</small></div>
            <div>
            <small style="color:grey">医院：{{item.OrganizationName}}</small>
            <small style="color:grey;position:absolute;left:110px;">车辆：{{item.CarName}}</small>
            <small style="color:grey;position:absolute;left:220px;">车号：{{item.CarId}}</small>
            <small style="color:red;position:absolute;left:330px;">{{item.Time}}</small>
            </div></a>
        </div>
        <br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header fixed style="font-size:25px;height: 50px;" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <hr>
          <!-- <mt-button slot="right" @click="$goRoute('/increaseCH')"><small>新增信息</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br>
        <!-- <h4 v-show="GLOBAL.showVideoAlert" style="color:red">您有视频通话邀请，请点击左上角进入</h4> -->
        <div style="width:80%">
        <mt-picker :slots="slots1" @change="onMessagechange" :visible-item-count="3"></mt-picker></div>
        <div align="right">
        <mt-button size="small" type="primary" @click="getMessageList()" style="position:relative;top:-70px">刷新</mt-button></div>
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
          <!-- <mt-button slot="right" @click="edit">修改</mt-button> -->
        </mt-header>
        <br><br><br>
        <div style="text-align: left; margin-top: 10px">个人信息</div>
          <mt-field label="姓名" v-model="Name" disabled></mt-field>
          <mt-field label="性别" v-model="Gender" disabled></mt-field>
          <mt-field label="年龄" v-model="Age" disabled></mt-field>
          <mt-field label="手机" v-model="Phone" disabled></mt-field>
          <mt-field label="邮箱" v-model="Email" disabled></mt-field>
          <mt-field label="单位" v-model="DepartmentName" disabled></mt-field>
          <mt-field label="职称" v-model="TitleName" disabled></mt-field>
          <hr>
          <div style="text-align: left; margin-top: 10px">角色：医院组</div>
          <mt-field label="所属小组" v-model="GroupName" disabled></mt-field>
          <mt-field label="组内职务" v-model="GroupPosition" disabled></mt-field>
          <mt-field label="责任区域" v-model="ManageArea" disabled></mt-field>
          <mt-field label="重点保障对象" v-model="GuaranteeObject" disabled></mt-field><hr>
          <mt-button size="large" @click="showchangepwd=true">修改密码</mt-button><br>
        <mt-field label="新密码" v-model="pwd1" v-show="showchangepwd"></mt-field>
        <mt-field label="确认密码" v-model="pwd2" v-show="showchangepwd"></mt-field>
        <mt-button v-show="showchangepwd" size="small" style="margin-right:40px" @click="showchangepwd=false">取消</mt-button>
        <mt-button v-show="showchangepwd" size="small" type="primary" @click="changepwd()">确定</mt-button>
        <hr v-show="showchangepwd">
          <mt-button size="large"  type="danger" @click="logout()">退出登录</mt-button><br><br><br><br>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="病人">
          <img slot="icon" src="./icon/病人.png"><div style="font-size:12px">病人</div>
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
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  // inject:['reload'],
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      selected: '沟通',
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
      chooselevel: '选择分级',
      choosestate: '选择状态',
      choosesituation: '全部',
      choosesort: '时间倒序',
      sortway: "时间排序",
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
      Longitude:0,
      Latitude:0,
      myPosition:'',
      assList:[],
      carList:[],
      driving:'',
       showchangepwd:false,
      pwd2:'',
      pwd1:''
    };
  },
  mounted() {
   this.selected=this.$route.params.SELECTED2;
   this.getpagelist()
   // this.getUserInfo()
   this.getMessageList()
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
      axios.post('/getPatientListHospitalClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        axios.post('/getPatientListHospitalCreatetime',{
          groupNo: this.groupNo
        }).then((response) => {
          this.PatientlistTime=response.data.results;
          this.refreshPatient();
          this.getUserInfo();
          setTimeout(()=>{
            console.log(this.assList)
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
        if(this.PatientlistClass[i].Status == 'S04'){
          if(this.PatientlistClass[i].CarNo == "000"){
            for(var j=0; j<this.assList.length; j++){
              if(this.PatientlistClass[i].LocationNo == this.assList[j].LocationNo){
                this.PatientlistClass[i].Time = "预计到达时间"+Math.round(this.assList[j].searchresult.routes[0].time/60)+"分钟";
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
        // else if(this.PatientlistClass[i].Status == 'S03'){
        //   for(var j=0; j<this.assList.length; j++){
        //       if(this.PatientlistClass[i].LocationNo == this.assList[j].LocationNo){
        //         this.PatientlistClass[i].Time = "预计到达时间"+Math.round(this.assList[j].searchresult.routes[0].time/60)+"分钟";
        //         break;
        //       }
        //     }
        // }
        else this.PatientlistClass[i].Time = '';
      }

      for(var i=0; i<this.PatientlistTime.length;i++){
        if(this.PatientlistTime[i].Status == 'S04'){
          if(this.PatientlistTime[i].CarNo == "000"){
            for(var j=0; j<this.assList.length; j++){
              if(this.PatientlistTime[i].LocationNo == this.assList[j].LocationNo){
                this.PatientlistTime[i].Time = "预计到达时间"+Math.round(this.assList[j].searchresult.routes[0].time/60)+"分钟";
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
        // else if(this.PatientlistTime[i].Status == 'S03'){
        //   for(var j=0; j<this.assList.length; j++){
        //       if(this.PatientlistTime[i].LocationNo == this.assList[j].LocationNo){
        //         this.PatientlistTime[i].Time = "预计到达时间"+Math.round(this.assList[j].searchresult.routes[0].time/60)+"分钟";
        //         break;
        //       }
        //     }
        // }
        else this.PatientlistTime[i].Time = '';
      }
      console.log(this.PatientlistClass)
      console.log(this.PatientlistTime)
      this.refreshPatient();

    },
    getMessageList(){
      //获取现场组信息列表
      axios.post('/getHosMessage',{
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
        this.Latitude = response.data.results[0].Latitude;
        this.Longitude = response.data.results[0].Longitude;
        window.localStorage.setItem("Location",response.data.results[0].Location)
        window.localStorage.setItem("Latitude",this.Latitude)
        window.localStorage.setItem("Longitude",this.Longitude)
        var GN = this.groupNo;
        var videoid = window.localStorage.getItem("VIDEOUSERID")
        this.myPosition = new AMap.LngLat(this.Longitude, this.Latitude);
        console.log(this.myPosition)
        if(this.GroupPosition == '组长'){
          window.JPush.setTags({ sequence: 1, tags: [GN, 'groupLeader', 'R03', videoid]},
          (result) => {
            var sequence = result.sequence
            var tags = result.tags
          }, (error) => {
            console.log(error)
          })
        }else{
          window.JPush.setTags({ sequence: 1, tags: [GN, 'worker', 'R03', videoid]},
          (result) => {
            var sequence = result.sequence
            var tags = result.tags
          }, (error) => {
            console.log(error)
          })
        }
        axios.get('/getAssemblyList',{}).then((response) => {
          this.assList = response.data.results; 
          var that = this;
          AMap.plugin(['AMap.Driving'],function(){
            that.driving = new AMap.Driving({ //用不上
              policy: AMap.DrivingPolicy.LEAST_TIME
            })
          });
          for(var i=0;i<that.assList.length;i++){
           (function(j){
           that.assList[j].position = new AMap.LngLat(response.data.results[j].Longitude, response.data.results[j].Latitude)             
            new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME}).search(that.assList[j].position,that.myPosition, function (status, result) {
              that.assList[j].searchresult = result
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
      window.localStorage.setItem('MESSAGENO',this.data3[index].MessageNo)
      this.$router.push({name: 'C1'});
    },
    getpatient:function(index){
      console.log(index)
      this.$router.push({name: 'H1',params:{PATIENTID:this.dataclass1[index].PatientId,SELECTED:"既往病历"}})
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
          if (this.choosestate != this.dataclass1[i].StatusNameHos) {
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
    logout(){
      window.JPush.cleanTags({ sequence: 1 },
        (result) => {
          console.log(result)
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
  .已出院{
    color:green;
  }
  .处置完成{
    color:green;
  }
  .已入院{
    color:#E6BD1A;
  }
  .待后送{
    color:red;
  }
  .后送中{
    color:red;
  }
</style>