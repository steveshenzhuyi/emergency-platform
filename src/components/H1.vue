<template>
  <div align="center">
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="既往病历">
          <img slot="icon" src="./icon/病历.png"><div style="font-size:12px">既往病历</div>
        </mt-tab-item>
        <mt-tab-item id="既往处置">
          <img slot="icon" src="./icon/处置方案.png"><div style="font-size:12px">既往处置</div>
        </mt-tab-item>
        <mt-tab-item id="实时地图">
          <img slot="icon" src="./icon/去向.png"><div style="font-size:12px">实时地图</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="既往处置">
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title2">
          <mt-button size="small" icon="back" slot="left"
            @click="returnH()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div v-for="(item,index) in dataCZ" style="text-align: left">
        <hr> 
        <div><small style="color:grey">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</small></div>
        <div><b>{{item.OperationName}}</b>&nbsp;&nbsp;&nbsp;<span v-show="(item.OperationCode=='P112')">检查单号{{item.Detail1}}</span></div>
        <div><span>{{item.Detail}}</span></div>
        <div align="center" v-show="item.InfoType==3">
           <img v-gallery :src="item.FileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
      </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="既往病历">
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title1">
          <mt-button size="small" icon="back" slot="left"
            @click="returnH()"><small>返回</small></mt-button>
          <mt-button  size="small" slot="right"
            @click="situation()"><small>{{situations}}</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <mt-navbar v-model="selected1">
          <mt-tab-item id="1">主诉</mt-tab-item>
          <mt-tab-item id="2">现病史</mt-tab-item>
          <mt-tab-item id="3">体征</mt-tab-item>
          <mt-tab-item id="4">既往史</mt-tab-item>
          <mt-tab-item id="5">初步诊断</mt-tab-item>
          <mt-tab-item id="6">基本信息</mt-tab-item>
        </mt-navbar>
        <br>
        <mt-tab-container v-model="selected1">
          <mt-tab-container-item id="1">
            <div align="left">
              <small style="color:grey">{{timevalue}}</small>
              <mt-field  type="textarea" placeholder="暂无内容" v-model="主诉" rows="5"></mt-field>
            </div>
            <!-- <mt-button size="small" type="primary" style="float: right;position:relative;top:-50px"
              @click="save10()">保存</mt-button> -->
           <hr>
            <div v-for="(item,index) in 主诉图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
            <!-- <mt-button size="small" style="float: left" type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button> -->
            <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div align="left">
              <small style="color:grey">{{timevalue1}}</small>
              <mt-field  type="textarea" placeholder="暂无内容" v-model="现病史" rows="5"></mt-field>
            </div>
            <hr>
          <div v-for="(item,index) in 现病史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
            <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div v-for="(item,index) in dataTZ" style="text-align: left">
            <hr>
            <div><small style="color:grey">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</small></div>
            <div><b>{{item.OperationName}}</b></div><div><span style="display:inline-block;width:380px">{{item.Detail}}</span></div>
          </div><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div align="center" style="height:30px">
              <span style="float: left;">过敏史</span>
            </div>
            <div align="left">
              <mt-field  type="textarea" placeholder="暂无内容" v-model="过敏史"  rows="2"></mt-field><hr>
            </div>
            <div align="center" style="height:30px">
              <span style="float: left;">疾病史</span>
            </div>
            <div align="left">
              <mt-field  type="textarea" placeholder="暂无内容" v-model="疾病史"  rows="2"></mt-field><hr>
            </div>
            <div align="center" style="height:30px">
          <span style="float: left;">目前用药</span>
        </div>
            <div align="left">
              <mt-field type="textarea" placeholder="暂无内容" v-model="目前用药"  rows="2"></mt-field><hr>
            </div>
              <div v-for="(item,index) in 既往史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
            <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div align="center" style="height:30px">
              <span style="float: left;">初步诊断</span></div>
            <div align="left">
              <small style="color:grey">{{timevalue2}}</small>
              <mt-field type="textarea" placeholder="暂无内容" v-model="初步诊断" rows="3"></mt-field>
            </div>
            <!-- <mt-button size="small" type="primary" style="float: right;position:relative;top:-50px" @click="save50()">保存</mt-button> -->
            <hr>
            <div align="center" style="height:30px"><span style="float: left;">预检分级</span></div>
            <div align="left" style="height:30px">
            <span><b>当前分级：{{level}}</b></span></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="6">
            <img src="./pictrue/man.png"><hr>
            <mt-field label="编号" v-model="PatientId" disabled></mt-field>
            <mt-field label="姓名" v-model="Name" disabled></mt-field>
            <mt-field label="性别" v-model="Gender" disabled></mt-field>
            <mt-field label="年龄" v-model="Age" disabled></mt-field>
            <mt-field label="民族" v-model="Nation" disabled></mt-field>
            <mt-field label="手机" v-model="Phone" disabled></mt-field>
            <mt-field label="邮箱" v-model="Email" disabled></mt-field>
            <mt-field label="单位" v-model="Unit" disabled></mt-field>
            <mt-field label="职务" v-model="Position" disabled></mt-field>
            <mt-field label="血型" v-model="bloodType" disabled></mt-field><br><br><br><br>
            <!-- <mt-button size="small" style="position:relative;left:100px"
            type="danger" @click="edit">修改</mt-button><br><hr> -->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item  id="实时地图">
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title3">
          <mt-button size="small" icon="back" slot="left"
          @click="returnH()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right"
          @click.native="popupVisible = true"><small>通知专家</small></mt-button>
          <hr>
        </mt-header>
        <br>
        <h3>当前状态：{{StatusNameHos}}&nbsp;&nbsp; {{Time}}</h3>
        <h4>发生地点：{{LocationName}} &nbsp; 后送车号：{{carId}}</h4>
        <!-- <h4>
        <mt-button size="normal">
        <img src="./icon/语音通话.png" height="40" width="40" slot="icon">
        视频通话</mt-button>
        </h4> -->
        <div id="map-container" class="map-root" style="width:97%;height:500px;padding:1px;border:1px solid black;margin-bottom:5px;">
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup v-model="popupVisible" position="middle" style="width:100%">
      <div>
        <mt-radio 
           v-model="expertgroup"
          :options="options">
        </mt-radio>
      </div>
      <br>
      <div><mt-button type="primary" size="small" @click="askExpert()">通知专家</mt-button></div><br>
    </mt-popup>
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
      photosrc: global.photoUrl+"zyh_1557216080825test.jpg",
      intervalid1:null,
      watchID1:null,
      patientId: this.$route.params.PATIENTID,
      GroupNo:'',
      PatientId: '',
      selected: this.$route.params.SELECTED,
      selected1: '1',
      content: '',
      timevalue: '',
      timevalue1: '',
      timevalue2: '',
      title1: '',
      title2: '',
      title3:'',
      主诉: '',
      主诉图片:[],
      体征: '请选择体征',
      现病史: '',
      现病史图片:[],
      过敏史: '',
      疾病史: '',
      目前用药: '',
      既往史图片:[],
      初步诊断: '',
      level: '',
      Name: '',
      Gender: '',
      Age: '',
      Nation:'',
      Phone: '',
      Email: '',
      Unit: '',
      Position: '',
      bloodType: '',
      StatusNameHos: '',
      LocationName:'',
      situations:'',
      carId: '',
      hospital:'',
      EmergencyGroup:'',
      dataTZ: [],
      dataCZ:[],
      patientrecord: [],
      startPosition:"",
      endPosition:"",
      dropbyPosition:"",
      mapObj:"",
      Time:"",
      popupVisible:false,
      expertgroup:'',
      expertlist:[],
      options:[],
    };
  },
  mounted() {
    this.initMap()
    this.getpatientrecord()
    this.getLocationExpert()
    setTimeout(()=>{
      var that = this
      if(that.StatusNameHos == "后送中" && that.carId != "自行前往"){
        new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME,map:that.mapObj}).search(that.startPosition, that.endPosition, function (status, result) {
              that.Time = "预计到达时间"+Math.round(result.routes[0].time/60)+"分钟";
             })
      }else if(that.StatusNameHos == "待后送" && that.carId != "自行前往"){
        new AMap.Driving({policy: AMap.DrivingPolicy.LEAST_TIME,map:that.mapObj}).search(that.startPosition, that.endPosition, { waypoints: [that.dropbyPosition] },function (status, result) {
              // that.Time = "预计到达时间"+Math.round(result.routes[0].time/60)+"分钟";
             })
      }
      },2000)
  },
  beforeDestroy () {
    navigator.geolocation.clearWatch(this.watchID1)
    this.watchID1 = null
    clearInterval(this.intervalid1)
    this.intervalid1 = null
  },
  methods: {
    getLocationExpert(){
      axios.post('/getLocationExpert',{
        LocationNo:window.localStorage.getItem('Location')
      }).then((response) => {
        this.expertlist=response.data.results;
        for(var i=0; i<this.expertlist.length; i++) {
         var a = {
            label:this.expertlist[i].GroupName+this.expertlist[i].Manager+this.expertlist[i].phone,
            value:this.expertlist[i].GroupNo
          }
          this.options.push(a)
        }
      })
    },
    askExpert(){
      axios.post('/askExpert',{
        patientId:this.$route.params.PATIENTID,
        GroupNo:this.expertgroup,
        name:this.Name,
        age:this.Age,
        time:this.Time
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast({
            message:'已成功推送给专家',
            position:'top'
          });
          this.popupVisible=false;
        }
        else{
          Toast('推送失败')
        }
        })
    },
    getpatientrecord() {
      axios.post('/getPatientRecord',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        window.localStorage.setItem('PATIENTNO',this.patientId);
        this.patientrecord=response.data.results
        //主诉
        this.zhusu=this.patientrecord.P01;
        if(this.zhusu.length>0) {
            for(var i=0; i<this.zhusu.length;i++) {
              if(this.zhusu[i].InfoType == 3) {
                var fileUrl = this.zhusu[i].FileUrl
                var time = this.zhusu[i].OperationTime
                this.主诉图片.unshift({
                  fileUrl:global.photoUrl+fileUrl,
                  time:time
                })              
              }
            }
            for(var k=0; k<this.zhusu.length;k++) {
              if(this.zhusu[k].InfoType == 1) {
                this.主诉=this.zhusu[k].Detail;
                this.timevalue=this.zhusu[k].OperationTime;
                break;
              }
            }
          }else{
            this.主诉='';
            this.timevalue='';
          }
        //现病史
        if(this.patientrecord.P02.length>0) {
          for(var i=0; i<this.patientrecord.P02.length;i++) {
            if(this.patientrecord.P02[i].InfoType == 3) {
              var fileUrl = this.patientrecord.P02[i].FileUrl
              var time = this.patientrecord.P02[i].OperationTime
              this.现病史图片.unshift({
                fileUrl:global.photoUrl+fileUrl,
                time:time
              })
            }
          }
          console.log(this.现病史图片)
          for(var k=0; k<this.patientrecord.P02.length;k++) {
            if(this.patientrecord.P02[k].InfoType == 1) {
              this.现病史=this.patientrecord.P02[k].Detail;
              this.timevalue1=this.patientrecord.P02[k].OperationTime;
              break;
            }
          }
        }else{
          this.现病史 = '';
          this.timevalue1 = '';
        }
        //体征
        this.dataTZ=this.patientrecord.P03
        console.log(this.dataTZ)
        //既往史
        for(var i=0; i<this.patientrecord.P04.length;i++) {
          if(this.patientrecord.P04[i].OperationCode == "P041") {
            this.过敏史=this.patientrecord.P04[i].Detail
            break;
          }
        }
        for(var k=0; k<this.patientrecord.P04.length;k++) {
          if(this.patientrecord.P04[k].OperationCode == "P042") {
            this.疾病史=this.patientrecord.P04[k].Detail
            break;
          }
        }
        console.log(this.patientrecord.P04[k])
        for(var j=0; j<this.patientrecord.P04.length;j++) {
          if(this.patientrecord.P04[j].OperationCode == "P043") {
            this.目前用药=this.patientrecord.P04[j].Detail
            break;
          }
        }
        for(var j=0; j<this.patientrecord.P04.length;j++) {
          if(this.patientrecord.P04[j].OperationCode == "P040") {
            var fileUrl =  this.patientrecord.P04[j].FileUrl
            var time = this.patientrecord.P04[j].OperationTime
            this.既往史图片.unshift({
              fileUrl:global.photoUrl+fileUrl,
              time:time
            })
          }
        }
        //初步诊断
        if(this.patientrecord.P05.length>0) {
          this.初步诊断=this.patientrecord.P05[0].Detail
          this.timevalue2=this.patientrecord.P05[0].OperationTime
        }else{
          this.初步诊断=''
          this.timevalue2=''
        }
        //处置方案
        this.dataCZ=this.patientrecord.P11
          for(var j=0; j<this.patientrecord.P11.length;j++) {
            if(this.patientrecord.P11[j].InfoType == 3) {
              var fileUrl =  this.patientrecord.P11[j].FileUrl
              this.dataCZ[j].FileUrl = global.photoUrl+fileUrl
              
            }
          }
        //医嘱
        if(this.patientrecord.P06.length>0) {
          this.doctortell=this.patientrecord.P06[0].Detail
        }else{
          this.doctortell= ''
        }
      })
      axios.post('/getPatientInfo',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        console.log(response)
        this.PatientId=response.data.results[0].PatientId;
        this.Name=response.data.results[0].Name;
        this.title1="既往病历："+this.Name;
        this.title2="既往处置："+this.Name;
        this.title3="实时地图："+this.Name;
        this.Phone=response.data.results[0].Phone
        this.Email=response.data.results[0].Email;
        this.Gender=response.data.results[0].Gender;
        this.Unit=response.data.results[0].Unit;
        this.Position=response.data.results[0].Position;
        this.Age=response.data.results[0].Age;
        this.Nation=response.data.results[0].Nation;
        this.bloodType=response.data.results[0].BloodType;
        this.StatusNameHos = response.data.results[0].StatusNameHos;
        this.LocationName = response.data.results[0].LocationName;
        this.hospital = response.data.results[0].OrganizationName;
        this.EmergencyGroup = response.data.results[0].EmergencyGroup;
        this.level=response.data.results[0].Classification;
        this.carId = response.data.results[0].CarId;
        if(this.StatusNameHos == "已入院") {
          this.situations = "出院"
        }
        if(this.StatusNameHos == "后送中") {
          this.situations = "接收"
        }
        if(this.StatusNameHos == "待后送") {
          this.situations = ""
        }
      })
    },
    heartrate() {
      this.体征 = "心率"
      this.content = ""
    },
    bloodpressure() {
      this.体征 = "血压"
      this.content = ""
    },
    temprature() {
      this.体征 = "体温"
      this.content = ""
    },
    breath() {
      this.体征 = "呼吸"
      this.content = ""
    },
    bloodoxygen() {
      this.体征 = "血氧"
      this.content = ""
    },
    symptom() {
      this.体征 = "其他"
      this.content = ""
    },
    add() {
      var operationCode
      if(this.体征 == "心率") {
        this.operationCode = "P031"
      }else if(this.体征 == "血压") {
        this.operationCode = "P032"
      }else if(this.体征 == "体温") {
        this.operationCode = "P033"
      }else if(this.体征 == "呼吸") {
        this.operationCode = "P034"
      }else if(this.体征 == "血氧") {
        this.operationCode = "P035"
      }else if(this.体征 == "其他") {
        this.operationCode = "P036"
      }
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.content,
        operationCode: this.operationCode,
        detail1: this.体征,
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          console.log(this.dataTZ)
        }
      })
    },
    save41() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.过敏史,
        operationCode: "P041",
        detail1: "过敏史",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    save42() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.疾病史,
        operationCode: "P042",
        detail1: "疾病史",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    save43() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.目前用药,
        operationCode: "P043",
        detail1: "目前用药",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    save50() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.初步诊断,
        operationCode: "P050",
        detail1: "初步诊断",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    save10() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.主诉,
        operationCode: "P010",
        detail1: "主诉",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          this.reload()
        }
      })
    },
    save20() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.现病史,
        operationCode: "P020",
        detail1: "现病史",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    save60() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.doctortell,
        operationCode: "P060",
        detail1: "医嘱",
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          // this.reload()
        }
      })
    },
    setclass() {
      var Class
      if(this.level === "I级") {
        this.Class = '1'
      }else if(this.level === "II级") {
        this.Class = '2'
      }else if(this.level === "III级") {
        this.Class = '3'
      }else if(this.level === "IV级") {
        this.Class = '4'
      }else if(this.level === "V级") {
        this.Class = '5'
      }console.log(this.Class)
      axios.post('/setClass',{
        patientId:this.$route.params.PATIENTID,
        class:this.Class
      }).then((response) => {
        if(response.data.results == "上传成功") {
          // MessageBox.alert('修改成功', '提示');
          // alert("修改成功");
          Toast('修改成功');
        }
      })
    },
    alert() {
      axios.post('/oneClickAlert',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        if(response.data.results == "上传成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
        }else{
          // MessageBox.alert('上传失败', '提示');
          // alert("上传失败");
          Toast('上传失败');
        }
      })
    },
    returnH() {
      this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
    },
    situation() {
      if(this.situations == "接收") {
        this.$router.push({name: 'confirmh',params:{PATIENTID:this.patientId}})
      }else if(this.situations == "出院") {
        MessageBox.confirm('确认病人出院?').then(action => {
          axios.post('/leaveHos',{
            patientId:this.$route.params.PATIENTID
          }).then((response) => {
            if(response.data.results == "上传成功") {
              Toast('病人已出院');
              this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
            }else{
              Toast('上传失败');
            }
          })
        })
      }
    },
    choosephoto() {
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        document.getElementById('image').src =imageData;
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    takephoto() {
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        document.getElementById('image').src =imageData;
      }

      function onFail(message) {
        alert('图片选择失败' + message);
      }

    },
    uploadPicture() {
      //获取元素中的图片uri
      var imgURI = document.getElementById('image').src
      //文件命名
      var photoname = window.localStorage.getItem('USERID') + '_' + new Date().getTime() + 'test.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        console.log(r)
        alert("上传成功! Code = " + r.responseCode);
      }
      function fail(error) {
        alert("上传失败! Code = " + error.code);
      }
      var ft = new FileTransfer();
      ft.upload(imgURI, uri, success, fail, options)
      
    },

    initMap () {
    var that = this
  var carList=[{},];
  var hosList=[{},];
  var assList=[{},];
  var positionHos = [];
  var positionAss = [];
  var positionCar = [];
  var markerCar=[];
  var markerHos = [];
  var markerAss = [];
  var lnglats;
  var marker;

  let mapObj = new AMap.Map('map-container', {
    center: [120.154539,30.265048],
    zoom: 13,
    mapStyle: 'amap://styles/c276159e0bece965039d24472029a3e0',
  })
  mapObj.plugin(['AMap.ToolBar','AMap.OverView', 'AMap.MapType'], function () {
    mapObj.addControl(new AMap.ToolBar())
    mapObj.addControl(new AMap.OverView({isOpen:false}))
    mapObj.addControl(new AMap.MapType({showTraffic: true, showRoad: false}))
  })
  that.mapObj = mapObj;
  var options = {
    enableHighAccuracy: true,
    maximumAge: 0
  }
  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  // var gps = [119,30];
  //   AMap.convertFrom(gps, 'gps', function (status, result) {           
  //     lnglats = result.locations[0];
  //     mapObj.setCenter(lnglats)
  //     alert(lnglats)
  //   });
  function onSuccess(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    // 'Longitude: '         + position.coords.longitude         + '\n' +
    // 'Altitude: '          + position.coords.altitude          + '\n' +
    // 'Accuracy: '          + position.coords.accuracy          + '\n' +
    // 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    // 'Heading: '           + position.coords.heading           + '\n' +
    // 'Speed: '             + position.coords.speed             + '\n' +
    // 'Timestamp: '         + position.timestamp                + '\n');
    var gps = [position.coords.longitude, position.coords.latitude];
    AMap.convertFrom(gps, 'gps', function (status, result) {         
      lnglats = result.locations[0];
      mapObj.setCenter(lnglats)
      marker = new AMap.Marker({
        position: lnglats,
        map: mapObj
      })
      AMap.event.addListener(marker, 'click', (e) => {
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
          var infoWindow = new SimpleInfoWindow({
            infoTitle: '<strong>我在这里</strong>',
            infoBody: '',
            offset: new AMap.Pixel(0, -20),
            autoMove: true
          })
          infoWindow.open(mapObj, e.target.getPosition())
        })
      })     
    });

    var options1 = {
      timeout: 3000,
      enableHighAccuracy: true,
      maximumAge: 60000
    }
    that.watchID1 = navigator.geolocation.watchPosition(onSuccess1, onError1, options1);
    function onSuccess1(position) {
      // alert('Latitude: '          + position.coords.latitude          + '\n' +
      //   'Longitude: '         + position.coords.longitude         + '\n' +
      //   'Altitude: '          + position.coords.altitude          + '\n' +
      //   'Accuracy: '          + position.coords.accuracy          + '\n' +
      //   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      //   'Heading: '           + position.coords.heading           + '\n' +
      //   'Speed: '             + position.coords.speed             + '\n' +
      //   'Timestamp: '         + position.timestamp                + '\n');
      var gps1 = [position.coords.longitude, position.coords.latitude];
      AMap.convertFrom(gps1, 'gps', function (status, result) {         
        var lnglats2 = result.locations[0];
        marker.setPosition(lnglats2)
      });
    };
    function onError1(error) {
      // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
  };
  function onError(error) {
    // alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }

  AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
    if (!SvgMarker.supportSvg) {
      alert('当前环境不支持SVG');
    }

    axios.get('/getAssemblyList',{}).then((response) => {
      assList = response.data.results;
      console.log(assList)
      for(var i=0;i<assList.length;i++){
        positionAss[i] = new AMap.LngLat(assList[i].Longitude, assList[i].Latitude)
        if(that.EmergencyGroup==assList[i].GroupNo){
          that.dropbyPosition = positionAss[i]
        }
        markerAss[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
            symbolJs: null,
            icon: 'icon-changguan',
            size: 50,
            offset: [-25, -50],
            fillColor: 'grey'
          }), {
            map: mapObj,
            position: positionAss[i],
            showPositionPoint: {
              color: 'red'
            }
          }
          );
        markerAss[i].assinfo = assList[i];
        markerAss[i].on('click',function(){
          console.log(this)
          var thisMarkerAss = this;
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>' + thisMarkerAss.assinfo.LocationName+ '</strong>',
              infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+thisMarkerAss.assinfo.Description+'</div>',
              offset: new AMap.Pixel(0, -20),
              autoMove: true                 
            })
            infoWindow.open(mapObj, thisMarkerAss.C.position)
          })
        })
      }
    }).catch(function(error){
      console.log("error",error);
    })

    axios.get('/getHosList',{}).then((response) => {
      hosList = response.data.results;
      console.log(hosList)
      for(var i=0;i<hosList.length;i++){
        positionHos[i] = new AMap.LngLat(hosList[i].Longitude, hosList[i].Latitude)
        if(that.hospital==hosList[i].OrganizationName){
          that.endPosition = positionHos[i]
        }
        markerHos[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
            symbolJs: null,
            icon: 'icon-hospital',
            size: 50,
            offset: [-25, -50],
            fillColor: 'red'
          }), {
            map: mapObj,
            position: positionHos[i],
            showPositionPoint: {
              color: 'red'
            }
          });
        markerHos[i].hosinfo = hosList[i];
        markerHos[i].on('click',function(){
          console.log(this)
          var thisMarkerHos = this;
          AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>' + thisMarkerHos.hosinfo.OrganizationName+ '</strong>',
              infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+thisMarkerHos.hosinfo.LocationDescription+'</div>',
              offset: new AMap.Pixel(0, -20),
              autoMove: true
            })
            infoWindow.open(mapObj, thisMarkerHos.C.position)
          })
        })
      }
    }).catch(function(error){
      console.log("error",error);
    })

    axios.get('/getCarList',{}).then((response) => {
      carList = response.data.results;
      console.log(carList)
      for(var i=0;i<carList.length;i++){
        if(carList[i].Longitude!=null && carList[i].Latitude!=null){
          if(carList[i].CarStatus == 0){
            carList[i].CarStatus='空闲'
          }
          else{
            carList[i].CarStatus='忙碌'
          }
          positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
          if(that.carId==carList[i].CarId){
          that.startPosition = positionCar[i]
        }
          markerCar[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
              symbolJs: null,
              icon: 'icon-emergencycar',
              size: 50,
              offset: [-25, -50],
              fillColor: 'blue'
            }), {
              map: mapObj,
              position: positionCar[i],
              showPositionPoint: {
                color: 'red'
              }
            });
          markerCar[i].carinfo = carList[i];
          markerCar[i].on('click',function(){
            console.log(this)
            var thisMarkerCar = this;
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {

              var infoWindow = new SimpleInfoWindow({
                infoTitle: '<strong>' + thisMarkerCar.carinfo.CarName+ '</strong>',
                infoBody: "<div style=\"padding:0px 0px 0px 4px;\">"+'编号：'+thisMarkerCar.carinfo.CarNo+'<br>车牌号：'+thisMarkerCar.carinfo.CarId+'<br>状态：'+thisMarkerCar.carinfo.CarStatus+'</div>',
                offset: new AMap.Pixel(0, -20),
                autoMove: true
              })
              infoWindow.open(mapObj, thisMarkerCar.C.position)
            })
          })
        }
      }
      that.intervalid1 = setInterval(() => {
        console.log("正在获取新位置")
        axios.get('/getCarList',{}).then((response) => {
          carList = response.data.results;
          console.log(carList)
          for(var i=0;i<carList.length;i++){
            if(carList[i].Longitude!=null && carList[i].Latitude!=null){
              if(carList[i].CarStatus == 0){
                carList[i].CarStatus='空闲'
              }
              else{
                carList[i].CarStatus='忙碌'
              }
              positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
              console.log(positionCar[i])
              markerCar[i].carinfo = carList[i];
              markerCar[i].setPosition(positionCar[i])
            }
          }
        }).catch(function(error){
          console.log("error",error);
        })
      }, 100000)
    }).catch(function(error){
      console.log("error",error);
    })
  }) 
}
  }
};
</script>
