<template>
  <div align="center">
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="既往病历">
          <img slot="icon" src="./icon/病历.png"><div style="font-size:12px">既往病历</div>
        </mt-tab-item>
        <mt-tab-item id="实时地图">
          <img slot="icon" src="./icon/去向.png"><div style="font-size:12px">实时地图</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="既往病历">
        <mt-header fixed style="font-size:20px" title="既往病历">
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
        <mt-tab-container v-model="selected1">
          <mt-tab-container-item id="1">
            <div  style="text-align: left; margin-top: 10px">文字</div>
            <!-- <mt-button size="small" type="primary" plain>语音播放</mt-button>
            <mt-button size="small" type="danger" plain>语音识别</mt-button><hr> -->
            <span>时间：{{timevalue}}</span><br>
            <mt-field type="textarea" v-model="主诉" rows="3"></mt-field><hr>
            <div  style="text-align: left; margin-top: 10px">图片</div>
            <span>时间：{{timevalue}}</span><br>
            <img src="./pictrue/logo.png"><hr>
            <mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small" style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" type="primary" style="float: right"
            @click="save10()">保存</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div  style="text-align: left; margin-top: 10px">文字</div>
            <span>时间：{{timevalue1}}</span><br>
            <mt-field type="textarea" placeholder="内容" v-model="现病史" rows="3"></mt-field><hr>
            <div  style="text-align: left; margin-top: 10px">图片</div>
            <span>时间：{{timevalue1}}</span><br>
            <img src="./pictrue/logo.png"><hr>
            <mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small"  style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" type="primary" style="float: right"
            @click="save20()">保存</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div  style="text-align: left; margin-top: 10px">常用体征</div><hr>
            <mt-button size="small" @click="heartrate()" style="position:relative;right:40px"
            type="primary" plain>心率</mt-button>
            <mt-button size="small" @click="bloodpressure()"
            type="primary" plain>血压</mt-button>
            <mt-button size="small" @click="temprature()" style="position:relative;left:40px"
            type="primary" plain>体温</mt-button><br><br>
            <mt-button size="small" @click="breath()" style="position:relative;right:40px"
            type="primary" plain>呼吸</mt-button>
            <mt-button size="small" @click="bloodoxygen()"
            type="primary" plain>血氧</mt-button>
            <mt-button size="small" @click="symptom()" style="position:relative;left:40px"
            type="primary" plain>其他</mt-button><br><br><hr>
            <div  style=" padding:3px;border:1px solid blue;margin:3px;">
              {{体征}}<hr>
              <mt-field placeholder="内容" v-model="content" type="textarea" rows="2"></mt-field>
              <mt-button @click="add()" size="small">确定</mt-button>
            </div>
            <div v-for="(item,index) in dataTZ">
            <b>{{item.OperationName}}</b><br>
            <b>
            {{item.Detail}}
            </b><br>
            <small>{{item.OperationTime}}</small><hr>
            </div><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div  style="text-align: left; margin-top: 10px">过敏史</div><hr>
            <mt-field type="textarea" placeholder="内容" v-model="过敏史" rows="3"></mt-field><hr>
            <div style="height: 33px"><mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small" style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" style="float: right"
            type="primary" @click="save41()">保存</mt-button></div>
            <div  style="text-align: left; margin-top: 10px">疾病史</div><hr>
            <mt-field type="textarea" placeholder="内容" v-model="疾病史" rows="3"></mt-field><hr>
            <div style="height: 33px">
            <mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small"  style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" type="primary" style="float: right"
            @click="save42()">保存</mt-button></div>
            <div  style="text-align: left; margin-top: 10px">目前用药</div><hr>
            <mt-field type="textarea" placeholder="内容" v-model="目前用药" rows="3"></mt-field><hr>
            <mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small"  style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" type="primary" style="float: right"
            @click="save43()">保存</mt-button>
            <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div  style="text-align: left; margin-top: 10px">初步诊断</div>
            <span>时间：{{timevalue2}}</span><br>
            <mt-field type="textarea" placeholder="内容" v-model="初步诊断" rows="3"></mt-field><hr>
            <div style="height: 33px"><mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small"  style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
             <mt-button size="small" type="primary" style="float: right"
            @click="save50()">保存</mt-button></div>
            <div  style="text-align: left; margin-top: 10px">预检分级 </div>
            <b style="text-align: left">当前分级：{{level}}</b>
            <!-- <mt-button @click="setclass()">修改分级</mt-button> -->
            <hr>
            <!-- <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker><hr> -->
            <br>
            <!-- <mt-button type="danger" @click="alert()">一键上报</mt-button><hr> -->
          </mt-tab-container-item>
          <mt-tab-container-item id="6">
            <img src="./pictrue/man.png"><hr>
            <mt-field label="编号" v-model="PatientId" disabled="true"></mt-field>
            <mt-field label="姓名" v-model="Name" disabled="true"></mt-field>
            <mt-field label="性别" v-model="Gender" disabled="true"></mt-field>
            <mt-field label="年龄" v-model="Age" disabled="true"></mt-field>
            <mt-field label="民族" v-model="Nation" disabled="true"></mt-field>
            <mt-field label="手机" v-model="Phone" disabled="true"></mt-field>
            <mt-field label="邮箱" v-model="Email" disabled="true"></mt-field>
            <mt-field label="单位" v-model="Unit" disabled="true"></mt-field>
            <mt-field label="职务" v-model="Position" disabled="true"></mt-field>
            <mt-field label="血型" v-model="bloodType" disabled="true"></mt-field><hr>
            <!-- <mt-button size="small" style="position:relative;left:100px"
            type="danger" @click="edit">修改</mt-button><br><hr> -->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item  id="实时地图">
        <mt-header fixed style="font-size:20px" title="实时地图">
          <mt-button size="small" icon="back" slot="left"
          @click="returnH()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
        <br>
        <h3>当前状态：{{StatusNameHos}}</h3>
        <h4>后送医院：{{hospital}}&nbsp; 车号：{{carId}}</h4>
        <!-- <h4>
        <mt-button size="normal">
        <img src="./icon/语音通话.png" height="40" width="40" slot="icon">
        视频通话</mt-button>
        </h4> -->
        <div id="map-container" class="map-root">
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      intervalid1:null,
      patientId: this.$route.params.PATIENTID,
      selected: '既往病历',
      selected1: '1',
      content: '',
      体征: '请选择体征',
      StatusNameHos: '',
      situations:'',
      carId: '',
      hospital:'',
      dataTZ: [],
      patientrecord: [],
    };
  },
  mounted() {
    this.initMap()
    this.getpatientrecord()
  },
  beforeDestroy () {
   clearInterval(this.intervalid1)
   this.intervalid1 = null
 },
  methods: {
    getpatientrecord() {
      axios.post('/getPatientRecord',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        window.localStorage.setItem('PATIENTNO',this.patientId);
        this.patientrecord=response.data.results
        //主诉
        this.zhusu=this.patientrecord.P01;
        if(this.zhusu.length>0) {
          this.主诉=this.zhusu[0].Detail;
          this.timevalue=this.zhusu[0].OperationTime;
        }else{
          this.主诉='';
          this.timevalue='';
        }
        console.log(this.zhusu)
        //现病史
        if(this.patientrecord.P02.length>0) {
          this.现病史=this.patientrecord.P02[0].Detail;
          this.timevalue1=this.patientrecord.P02[0].OperationTime;
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
        this.Phone=response.data.results[0].Phone
        this.Email=response.data.results[0].Email;
        this.Gender=response.data.results[0].Gender;
        this.Unit=response.data.results[0].Unit;
        this.Position=response.data.results[0].Position;
        this.Age=response.data.results[0].Age;
        this.Nation=response.data.results[0].Nation;
        this.bloodType=response.data.results[0].BloodType;
        this.StatusNameHos = response.data.results[0].StatusNameHos;
        this.hospital = response.data.results[0].OrganizationName;
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
    },
    bloodpressure() {
      this.体征 = "血压"
    },
    temprature() {
      this.体征 = "体温"
    },
    breath() {
      this.体征 = "呼吸"
    },
    bloodoxygen() {
      this.体征 = "血氧"
    },
    symptom() {
      this.体征 = "其他"
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '保存成功',
            position: 'top'
          });
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
          Toast({
            message: '修改成功',
            position: 'top'
          });
        }
      })
    },
    alert() {
      axios.post('/oneClickAlert',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast({
            message: '上传成功',
            position: 'top'
          });
        }else{
          Toast({
            message: '上传失败',
            position: 'top'
          });
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
        axios.post('/leaveHos',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast({
            message: '病人已出院',
            position: 'top'
          });
          this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
        }else{
          Toast({
            message: '上传失败',
            position: 'top'
          });
        }
      })
      }
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

      // 创建地图
        let mapObj = new AMap.Map('map-container', {
          center: [108.77431122925678, 32.62743450916755],
          zoom: 13
           //mapStyle: 'amap://styles/darkblue',
        })
        //mapObj.setMapStyle('amap://styles/385185c5427db60ec63616866ec59f7b');
        mapObj.plugin(['AMap.ToolBar','AMap.OverView', 'AMap.MapType'], function () {
          mapObj.addControl(new AMap.ToolBar())
          mapObj.addControl(new AMap.OverView({isOpen:true}))
          mapObj.addControl(new AMap.MapType({showTraffic: true, showRoad: false}))
        })
        mapObj.plugin(['AMap.Geolocation'], function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: false  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', (result) => {
            mapObj.setCenter(result.position)
            console.log(result.position)
          AMapUI.loadUI(['overlay/SvgMarker'], function(SvgMarker) {
        if (!SvgMarker.supportSvg) {
            alert('当前环境不支持SVG');
        }
        //获取三类地点
        axios.get('/getCarList',{}).then((response) => {
        carList = response.data.results;
        console.log(carList)
        for(var i=0;i<carList.length;i++){
          if(carList[i].Longitude!=null && carList[i].Latitude!=null){
          if(carList[i].CarStatus == 0)carList[i].CarStatus='空闲'
            else carList[i].CarStatus='忙碌'
        positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
          console.log(positionCar[i])
        markerCar[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-jiuhuche',
                size: 50,
                offset: [-25, -50],
                fillColor: 'green'
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
      //循环获取车辆位置
      that.intervalid1 = setInterval(() => {
       
       console.log("正在获取新位置")
        axios.get('/getCarList',{}).then((response) => {
        carList = response.data.results;
        console.log(carList)
        for(var i=0;i<carList.length;i++){
          if(carList[i].Longitude!=null && carList[i].Latitude!=null){
          if(carList[i].CarStatus == 0)carList[i].CarStatus='空闲'
            else carList[i].CarStatus='忙碌'
        positionCar[i] = new AMap.LngLat(carList[i].Longitude, carList[i].Latitude)
          console.log(positionCar[i])
          markerCar[i].carinfo = carList[i];
          markerCar[i].setPosition(positionCar[i])
        }

        }
          }).catch(function(error){
        console.log("error",error);
      })
      }, 10000)//一分钟刷新一次


      }).catch(function(error){
        console.log("error",error);
      })
      

      axios.get('/getHosList',{}).then((response) => {
        hosList = response.data.results;
        console.log(hosList)
        for(var i=0;i<hosList.length;i++){
        positionHos[i] = new AMap.LngLat(hosList[i].Longitude, hosList[i].Latitude)
          console.log(positionHos[i])
        markerHos[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-yiyuan-2',
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
      axios.get('/getAssemblyList',{}).then((response) => {
        assList = response.data.results;
        console.log(assList)
         for(var i=0;i<assList.length;i++){
        positionAss[i] = new AMap.LngLat(assList[i].Longitude, assList[i].Latitude)
          console.log(positionAss[i])
        markerAss[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
                //已经加载了相关的js文件my-iconfont2
                symbolJs: null,
                icon: 'icon-jianzhuwu',
                size: 50,
                offset: [-25, -50],
                fillColor: 'blue'
          }), {
                map: mapObj,
                position: positionAss[i],
                showPositionPoint: {
                    color: 'red'
                }
        });
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
 var marker = new AMap.Marker({
              position: result.position,
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
})

          })  //  返回定位信息
          AMap.event.addListener(geolocation, 'error', (result) => {
            console.log(result)
          })  //  返回定位出错信息
        })
    }
  }
};
</script>

<style>
  .map-root{
    width:100%;
    height:530px;
    padding:2px;
    border:1px solid black;
    margin:3px;
  }
</style>