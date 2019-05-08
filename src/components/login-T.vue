<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header fixed style="font-size:20px" title="转运列表">
          <mt-button size="small" slot="right"
            @click="SEE()"><small>扫描</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div  style="width:80%;">
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker></div>
        <div align="right"><mt-button size="small" type="primary" style="position:relative;top:-70px"
        @click="refreshPatient()">刷新</mt-button></div>
          <div style="position:relative;top:-40px;color: red">{{nowstate}}{{patientId1}}{{文字}}</div>
        <div v-for="(item,index) in dataclass1" align="left" style="position:relative;top:-40px">
            <hr><a @click="getpatient(index)">
            <div>{{item.PatientId}}
            <small style="position:absolute;left:100px">{{item.CreateTime}}</small><br></div>
            <div><code style="font-size:18px;font-family:'Avenir', Helvetica, Arial, sans-serif">{{item.Name}}</code>
            <code style="position:absolute;left:100px;font-size:18px;font-family:'Avenir', Helvetica, Arial, sans-serif">{{item.Classification}}</code>
            <code style="position:absolute;left:200px;font-size:18px;font-family:'Avenir', Helvetica, Arial, sans-serif">{{item.StatusNameCar}}</code><br>
            </div>
            <small style="color:grey">
            性别：{{item.Gender}}</small>
            <small style="color:grey;position:absolute;left:100px">年龄：{{item.Age}}</small>
            <small style="color:grey;position:absolute;left:200px">症状：{{item.Diagnose}}</small><br>
            <small style="color:grey">医院：{{item.OrganizationName}}</small>
            <small style="color:grey;position:absolute;left:100px">车辆：{{item.CarName}}</small>
            <small style="color:grey;position:absolute;left:200px">车号：{{item.CarId}}</small>
            {{item.Pcost}}</a>
        </div><hr>
      </mt-tab-container-item>
      <mt-tab-container-item id="资源">
        <mt-header fixed style="font-size:20px" title="资源列表">
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseBT')"><small>新增资源</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div style="width:80%;">
        <mt-picker :slots="slots1" @change="onResourcelistChange" :visible-item-count="3"></mt-picker>
        </div>
        <div align="right">
        <mt-button size="small" type="primary" style="position:relative;top:-70px" @click="refreshresource()">刷新</mt-button></div>
        <div v-for=" (item,index) in data2" :data2-index="{index}" align="left" style="position:relative;top:-40px">
          <hr><a @click="getResource(index)">
          <div>{{ item.ResourceNo }} &nbsp;&nbsp;&nbsp;
             {{item.ResourceName}}</div>
          <small style="color:grey">规格：{{item.Standard}}</small>
          <small style="color:grey;position:absolute;left:100px">  状态：{{item.Status}}</small>
          <small style="color:grey;position:absolute;left:175px">  数量：{{item.Amount}}</small></a>
        </div><hr>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header fixed style="font-size:20px" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div style="width:80%;">
          <mt-picker :slots="slots2" @change="onMessagechange" :visible-item-count="3"></mt-picker>
        </div>
        <div align="right">
          <mt-button size="small" type="primary" @click="refreshmessage()" style="position:relative;top:-70px">刷新</mt-button>
        </div>
        <div v-for=" (item,index) in data3" align="left" style="position:relative;top:-40px">
          <hr><a @click="getMessage(index)">
           <div>
              序号{{item.MessageNo}}<br>
              {{item.MessageTitle}}<br></div>
              <small style="color:grey">发送时间：{{item.SendTime}}</small>
          </a>
        </div><hr>
      </mt-tab-container-item>
      <mt-tab-container-item id="个人">
        <mt-header fixed style="font-size:20px" title="本车信息">
      </mt-header>
        <br><br>
        <br>
        <mt-cell title>
          <!-- <img slot="icon" src="./icon/个人.png"> -->
        </mt-cell>
        <p>本车信息</p>
        <mt-field label="车号" v-model="name" disabled></mt-field>
        <mt-field label="所属单位" v-model="company" disabled></mt-field>

        <mt-field label="当前状态" v-model="carstate" disabled></mt-field>

        <!-- <mt-picker :slots="slots3" :visible-item-count="3"></mt-picker> -->
        <hr>
        <mt-button v-show="isShow" size="large" type="danger" @click="decline()">取消接单</mt-button><br>
        <mt-button size="large" type="primary" @click="$goRoute('/个人信息运输')">查看个人信息</mt-button>
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
          <img slot="icon" src="./icon/本车.png"><div style="font-size:12px">本车</div>
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
  inject:['reload'],
  data() {
    return {
      selected: '',
      isShow: false,
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      patientId1:'',
      // flag: this.$route.params.FLAG,
      nowstate: '',
      文字: '',
      value: '',
      value1: '',
      name: '',
      company: '',
      carstate: '',
      CarStatus: '',
      assembly: '',
      hospital: '',
      carNo: '',
      chooselevel: '',
      choosestate: '',
      choosekind: '',
      choosenumber: '',
      choosesituation: '',
      ResourceType: '',
      choosesort: '',
      sortway: '',
      resourceNo: '',
      slots: [
          { 
            flex: 1,
            values: ['选择分级','I级', 'II级', 'III级', 'IV级','V级'],
            textAlign: 'left',
            className: 'slot1',
          },
          {
            flex: 1,
            values: ['选择状态','待后送','后送中','已送达','处置完成'],
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
            values: ['全部','设备', '器材', '药品'],
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
        // slots3: [
        //   {
        //     flex: 4,
        //     values: ['当前目的地'],
        //     className: 'slot9',
        //   },
        //   { 
        //     flex: 4,
        //     values: ['会场','A医院'],
        //     className: 'slot11',
        //   },
        // ],
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
    SEE(){
      var that = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var res = result.text
        that.$router.push({name: '接收病人',params:{PATIENTID:res}});
        },
        function (error) {
          alert(error)
        }
      )
    },
    decline() {
      axios.post('/carReversePrepare',{
        patientId:window.localStorage.getItem('PATIENTID1'),
        carNo:window.localStorage.getItem('CARNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('取消接单')
          this.reload()
        }else {
          Toast('取消失败！')
        }
      })   
    },
    getpagelist() {
      console.log(this.groupNo);
      this.selected=this.$route.params.SELECTED1;
      //获取病人列表分级
      axios.post('/getPatientListCarClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取病人列表时间排序
      axios.post('/getPatientListCarCreatetime',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistTime=response.data.results;
        this.dataclass1=this.PatientlistClass
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
        for(var i=0; i<this.data2.length;i++) {
          if(this.data2[i].Status == "1"){
            this.data2[i].Status = "在库"
          }
        }
        console.log(response);
        console.log(this.data2);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取运输组信息列表
      axios.post('/getCarMessage',{
        groupNo: this.groupNo
      }).then((response) => {
        this.message=response.data.results
        this.data3=this.message
        console.log(response);
        console.log(this.data3);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取小组号
      axios.post('/getGroupInfo',{
        groupNo: this.groupNo
      }).then((response) => {
        this.carNo=response.data.results[0].CarNo
        window.localStorage.setItem('CARNO',this.carNo);
         axios.post('/getCarInfo',{
          carNo:this.carNo
        }).then((response) => {
          console.log(response)
          this.name=response.data.results[0].CarId
          this.company=response.data.results[0].OrganizationName
          this.assembly=response.data.results[0].Assembly
          this.hospital=response.data.results[0].Hospital
          this.CarStatus=response.data.results[0].CarStatus
          window.localStorage.setItem('PATIENTID1',response.data.results[0].NowPatient);
          if(this.CarStatus == "0") {
            this.carstate = "空闲"
            this.nowstate = "空闲中"
          }else if(this.CarStatus == "1") {
            this.carstate = "正在去会场"
            this.nowstate = "正在接收编号为："
            this.patientId1 = window.localStorage.getItem('PATIENTID1')
            this.isShow = true
            this.文字 = "的病人"
          }else if(this.CarStatus == "2") {
            this.carstate = "正在去医院"
            this.nowstate = "正在运送编号为："
            this.patientId1 = window.localStorage.getItem('PATIENTID1')
            this.文字 = "的病人"
          }
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
      this.$router.push({name: 'B2',params:{RESOURCENO:this.data2[index].ResourceNo}});
    },
    getMessage:function(index){
      console.log(index)
      this.$router.push({name: 'C2',params:{MESSAGENO:this.data3[index].MessageNo}});
    },
    getpatient:function(index){
      console.log(index)
      this.$router.push({name: 'T1',
      params:{PATIENTID:this.dataclass1[index].PatientId,CARSTATUS:this.CarStatus,SELECTED:'新增处置'}})
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
          if (this.choosestate != this.dataclass1[i].StatusNameCar) {
            continue;
          }
        }
        tmp.push(this.dataclass1[i]);
      }
      this.dataclass1 = tmp;
    },
    refreshmessage() {
      this.data3=this.message;
      if(this.choosesort == '时间正序') {
          this.data3.reverse();
        }
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
    },
    phone(){
      Toast({
        message:'开发中！',
        position: 'top'
      });
    }
  },
};
</script>

<style>
  b{
    font-size:20px;
  }
</style>
