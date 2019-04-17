<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="病人">
        <mt-header style="font-size:20px" title="转运列表">
          <mt-button size="small" slot="right"
            @click="SEE()"><small>扫描</small></mt-button>
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="side">{{chooselevel}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosestate}}&nbsp;&nbsp;&nbsp;&nbsp;{{sortway}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshPatient()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker>
        <mt-cell title="当前状态：">
          <p>{{nowstate}}</p>
        </mt-cell>
        <hr>
        <div v-for="(item,index) in dataclass1">
            <a @click="getpatient(index)">
            <b class="first">{{item.PatientId}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;<small>{{item.CreateTime}}</small><br>
            <b class="second">{{item.Name}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b>
            {{item.Classification}} &nbsp;
            {{item.StatusNameCar}}</b><br><small>
            {{item.Gender}} &nbsp; 
            {{item.Age}} &nbsp;
            {{item.OrganizationName}}&nbsp;&nbsp; &nbsp;&nbsp;
            {{item.CarName}}&nbsp;
            {{item.CarId}}
            {{item.Pcost}}</small></a><hr>
        </div><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="资源">
        <mt-header style="font-size:20px" title="资源列表">
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseBT')"><small>新增资源</small></mt-button>
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="side">{{choosekind}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosenumber}}&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshresource()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots1" @change="onResourcelistChange" :visible-item-count="3"></mt-picker><hr>
        <div v-for=" (item,index) in data2" :data2-index="{index}">
          <a @click="getResource(index)">
          <b>{{ item.ResourceNo }} 
             {{item.ResourceName}}</b><br>
          <small>规格：{{item.Standard}} 
                 {{item.Sstate}}状态：在库 
                 数量：{{item.Amount}}</small></a><hr>
        </div><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="沟通">
        <mt-header style="font-size:20px" title="信息列表">
          <mt-button slot="left" @click="phone()"><small>视频通话</small></mt-button>
          <!-- <mt-button slot="right" @click="$goRoute('/increaseCT')"><small>新增信息</small></mt-button> -->
          <hr>
        </mt-header>
        <mt-cell>
          <p v-show="side">{{choosesituation}}&nbsp;&nbsp;&nbsp;&nbsp;{{choosesort}}&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <mt-button size="small" type="primary" @click="refreshmessage()">刷新</mt-button>
        </mt-cell>
        <mt-picker :slots="slots2" @change="onMessagechange" :visible-item-count="3"></mt-picker><hr>
        <div v-for=" (item,index) in data3">
          <a @click="getMessage(index)">
            <big><b>
              {{item.MessageNo}}</b></big><br>
              <b>{{item.MessageTitle}}</b><br>
            <small>{{item.MessageDetail}}&nbsp;<br>
              发送时间：{{item.SendTime}}</small>
          </a><hr>
        </div><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="个人">
        <mt-header style="font-size:20px" title="本车信息">
          <!-- <mt-button slot="right" @click="edit"><small>查看个人信息</small></mt-button>
          <hr> -->
        </mt-header>
        <br>
        <mt-cell title>
          <!-- <img slot="icon" src="./icon/个人.png"> -->
          <mt-button size="small" type="primary" @click="$goRoute('/个人信息运输')">查看个人信息</mt-button>
        </mt-cell>
        <p>本车信息</p>
        <mt-field label="车号" v-model="name" disabled="true"></mt-field>
        <mt-field label="所属单位" v-model="company" disabled="true"></mt-field>

        <mt-field label="当前状态" v-model="carstate" disabled="true"></mt-field>

        <!-- <mt-picker :slots="slots3" :visible-item-count="3"></mt-picker> -->
        <hr>
        <mt-button v-show="isshow" size="large" type="danger" @click="confirmpatient()">确认接单</mt-button>
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
          <img slot="icon" src="./icon/本车.png"><b style="font-size:15px">本车</b>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selected: '',
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      // flag: this.$route.params.FLAG,
      nowstate: '',
      value: '',
      value1: '',
      name: '',
      company: '',
      isshow: '',
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
            values: ['时间正序','时间倒序'],
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
    getpagelist() {
      console.log(this.groupNo);
      this.selected=this.$route.params.SELECTED1;
      //获取病人列表分级
      axios.post('/getPatientListCarClass',{
        groupNo: this.groupNo
      }).then((response) => {
        this.PatientlistClass=response.data.results;
        this.dataclass1=this.PatientlistClass
        console.log(this.dataclass1);
      }).catch(function(error){
        console.log("error",error);
      })
      //获取病人列表时间排序
      axios.post('/getPatientListCarCreatetime',{
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
        this.data2=response.data.results
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
          this.name=response.data.results[0].CarId
          this.company=response.data.results[0].OrganizationName
          this.assembly=response.data.results[0].Assembly
          this.hospital=response.data.results[0].Hospital
          this.CarStatus=response.data.results[0].CarStatus
          if(this.CarStatus == "0") {
            this.carstate = "空闲"
          }else if(this.CarStatus == "1") {
            this.carstate = "正在去会场"
          }else if(this.CarStatus == "2") {
            this.carstate = "正在去医院"
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
          if (this.choosestate != this.dataclass1[i].StatusName) {
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
    confirmpatient() {
    
    },

    phone() {

    }
  },
};
</script>

<style>
  b{
    font-size:20px;
  }
</style>
