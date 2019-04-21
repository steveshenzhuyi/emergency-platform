<template>
  <div align="center">
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="患者病历">
        <mt-header fixed style="font-size:20px" title="患者病历">
          <mt-button size="small" icon="back" slot="left"
            @click="returnA()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right" v-show="isShow2"
            @click="confirm()"><small>后送</small></mt-button>
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
           <!--  <mt-button size="small" type="primary" plain>语音播放</mt-button>
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
            <mt-button size="small" type="primary"  style="float: right"
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
            type="primary" plain>其他</mt-button><br><hr>
            <div  style=" padding:3px;border:1px solid blue;margin:3px;">
              {{体征}}<hr>
              <mt-field placeholder="内容" v-model="content" type="textarea" rows="2"></mt-field>
              <mt-button @click="add()" size="small">确定</mt-button>
            </div>
            <div v-for="(item,index) in dataTZ">
            <hr><b>{{item.OperationName}}</b><br>
            <b>
            {{item.Detail}}
            </b><br>
            <small>{{item.OperationTime}}</small>
            </div><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div  style="text-align: left; margin-top: 10px">过敏史</div><hr>
            <mt-field type="textarea" placeholder="内容" v-model="过敏史"  rows="3"></mt-field><hr>
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
            <mt-field type="textarea" placeholder="内容" v-model="疾病史"  rows="3"></mt-field><hr>
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
            <mt-field type="textarea" placeholder="内容" v-model="目前用药"  rows="3"></mt-field><hr>
            <mt-button size="small"  style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small" style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
            <mt-button size="small" type="primary" style="float: right"
            @click="save43()">保存</mt-button>
            <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div  style="text-align: left; margin-top: 10px">初步诊断</div>
            <span>时间：{{timevalue2}}</span>
            <mt-field type="textarea" placeholder="内容" v-model="初步诊断" rows="3"></mt-field><hr>
            <div style="height: 33px"><mt-button size="small" style="float: left"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音</mt-button>
            <mt-button size="small" style="float: left; margin-left: 10px"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            图片</mt-button>
             <mt-button size="small" type="primary" style="float: right"
            @click="save50()">保存</mt-button></div>
            <div  style="text-align: left; margin-top: 10px">预检分级 </div>
            <b style="text-align: left">当前分级：{{level}}</b>
            <mt-button @click="setclass()">修改分级</mt-button>
            <hr>
            <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker><hr>
            <mt-button type="danger" @click="alert()">一键上报</mt-button><br><br><br><br>
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
            <mt-field label="血型" v-model="bloodType" disabled="true"></mt-field><br><br><br><br>
                        <!-- <mt-button size="small" style="position:relative;left:100px"
            type="danger" @click="edit">修改</mt-button><br><hr> -->
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="处置方案">
        <mt-header fixed style="font-size:20px" title="处置方案">
          <mt-button size="small" icon="back" slot="left"
            @click="returnA()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right" v-show="isShow2"
            @click="confirm()"><small>后送</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div>
          <div  style="text-align: left; margin-top: 10px">常用处置</div><hr>
            <mt-button size="small" @click="oxygen()" style="position:relative;right:30px"
            type="primary" plain>吸氧处置</mt-button>
            <mt-button size="small" @click="ECG()"
            type="primary" plain>心电检查</mt-button>
            <mt-button size="small" @click="bandage()" style="position:relative;left:30px"
            type="primary" plain>包扎止血</mt-button><br><br>
            <mt-button size="small" @click="stone()" style="position:relative;right:30px"
            type="primary" plain>固定处置</mt-button>
            <mt-button size="small" @click="drug()"
            type="primary" plain>口服药物</mt-button>
            <mt-button size="small" @click="dd()" style="position:relative;left:30px"
            type="primary" plain>静脉给药</mt-button><br><br>
            <mt-button size="small" @click="elseway()"
            type="primary" plain>其他处置</mt-button> <hr>
        </div>
        <div style=" padding:3px;border:1px solid blue;margin:3px;">
          {{methods}}<hr>
          <mt-field placeholder="内容" v-model="content1" type="textarea" rows="2"></mt-field>
          <mt-button size="small" @click="add1()">确定</mt-button>
        </div>
        <div v-for="(item,index) in dataCZ">
           <hr> <b>{{item.OperationName}}</b><br>
            <b>
            {{item.Detail}}
            </b><br>
            <small>{{item.OperationTime}}</small>
        </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="病人去向">
        <mt-header fixed style="font-size:20px" title="病人去向">
          <mt-button size="small" icon="back" slot="left"
            @click="returnA()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right" v-show="isShow2"
            @click="confirm()"><small>后送</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <h3>选择分流：{{state}}</h3>
        <div v-show="isShow3">
          <mt-button plain type="primary" @click="changestate()">处置完成</mt-button>
          <mt-button plain type="danger" @click="gotohospital()">前往医院</mt-button>
          <mt-button plain  @click="self()">自行前往</mt-button>
        </div>
        <!-- <mt-button v-show="isShow1" plain type="primary" @click="map()">查看地图</mt-button> -->
        <hr>
        <div v-show="isShow">
          <p style="text-align: left">添加医嘱</p><br>
          <mt-field placeholder="输入医嘱" v-model="doctortell" type="textarea"></mt-field><hr>
          <mt-button size="small" type="primary" style="position:relative;right:40px" plain>
          <img src="./icon/录音.png" height="35" width="35" slot="icon">
                    语音输入</mt-button>
          <mt-button size="small" type="danger" plain>
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
          添加图片</mt-button>
          <mt-button size="small" type="primary" style="position:relative;right:-40px"
          @click="save60()">确定</mt-button>
        </div>
        <div v-show="isShow1">
          <!-- 前往方式：{{theways}}
          <mt-button size="small" @click="confirm1()" style="position:relative;float:right">确定</mt-button>
          <br><br><hr> -->
          <b>已选医院</b>：{{OrganizationName}}&nbsp;&nbsp;&nbsp;{{LocationDescription}}&nbsp;&nbsp;病床数：{{ICUNum}}<br>
          <b>车辆编号</b>：{{carNo}}&nbsp;&nbsp;&nbsp;{{carname}}&nbsp;&nbsp;{{carID}}&nbsp;&nbsp;{{carstate}}&nbsp;&nbsp;{{destination}}<hr>
          <!-- <input type="radio" v-model="picked2" name="ways" value3="急救车">急救车
          <input type="radio" v-model="picked2" name="ways" value3="自行前往">自行前往<hr> -->
          <div id="map-container" class="map-root">
            放置地图
          </div>
          <br>
          <mt-button size="large" type="primary" @click="ensure()">确定</mt-button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="患者病历">
          <img slot="icon" src="./icon/病历.png"><b style="font-size:15px">患者病历</b>
        </mt-tab-item>
        <mt-tab-item id="处置方案">
          <img slot="icon" src="./icon/处置方案.png"><b style="font-size:15px">处置方案</b>
        </mt-tab-item>
        <mt-tab-item id="病人去向">
          <img slot="icon" src="./icon/去向.png"><b style="font-size:15px">病人去向</b>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
  inject:['reload'],
  data() {
    return {
      selected: '',
      patientId: this.$route.params.PATIENTID,
      methods: '请选择处置',
      OrganizationName: '',
      ICUNum: '',
      LocationDescription:'',
      carNo:'',
      carname:'',
      carID: '',
      carstate: '',
      destination: '',
      isShow: false,
      isShow1:false,
      isShow2: '',
      isShow3: true,
      value3: '',
      selected1: '1',
      timevalue: '',
      timecalue2: '',
      visible: false,
      state: this.$route.params.STATE1,
      StatusName: this.$route.params.STATUSNAME,
      flag1: this.$route.params.FLAG1,
      message1: 'A医院',
      hospital: '',
      carId: '',
      carNo: '',
      hosNo: '',
      picked2: '',
      message2: 'xxxxxx',
      体征: '请选择体征',
      主诉: '',
      过敏史: '',
      疾病史: '',
      目前用药: '',
      PatientId: '',
      Name: '',
      theways: '',
      Phone: '',
      Email: '',
      bloodType: '',
      Nation: '',
      备注: '',
      Unit: '',
      Position: '',
      level: '',
      Age: '',
      Gender: '',
      patientrecord:[],
      zhusu:[],
      dataTZ:[],
      dataCZ:[],
      Status: '',
      doctortell: '',
      selectform: '',
      slots: [
          { 
            flex: 1,
            values: ['选择分级','I级', 'II级', 'III级', 'IV级','V级'],
            className: 'slot1',
          }
        ],
    };
  },
  mounted() {
    this.getpatientrecord()
  },
  methods: {
    getpatientrecord() {
      if(this.StatusName == "待后送") {
        this.isShow2 = true
      }
      this.selected=this.$route.params.SELECTED1;
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
        this.Status=response.data.results[0].Status;
        this.StatusName=response.data.results[0].StatusName;
        this.level=response.data.results[0].Classification;
        this.hospital=response.data.results[0].OrganizationName;
        this.carId=response.data.results[0].CarId;
        this.carNo=response.data.results[0].CarNo;
        this.hosNo=response.data.results[0].HosNo;
        if(this.flag1 == "1") {
          this.StatusName = "待后送"
          this.isShow2 = true
        }
        this.state=this.StatusName;
        console.log(this.StatusName)
        if(this.StatusName == "处置中") {
          this.isShow1 = false
        }else if(this.StatusName == "处置完成") {
          this.isShow = true
          this.isShow1 = false
          this.isShow3 = false
        }else if(this.StatusName == "待后送") {
          this.isShow1 = true
          this.isShow3 = false
        }else if(this.StatusName == "已后送") {
          this.isShow1 = true
          this.isShow3 = false
        }else if(this.StatusName == "已后送") {
          this.isShow1 = true
          this.isShow3 = false
        }else if(this.StatusName == "已后送") {
          this.isShow1 = true
          this.isShow3 = false
        }
        // if(this.StatusName != "处置中") {
        //   this.isShow1 = true
        // }
        // window.localStorage.setItem('STATE',this.state);
      })
    },
    onPatientlistChange(picker, values) {
      this.level = values[0];
    },
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
    },
    changestate() {
      this.state = "处置完成";
      this.isShow = true;
      this.isShow1 = false;
      // this.isShow3 = false
    },
    gotohospital() {
      this.state = "待后送";
      this.isShow = false;
      this.isShow1 = true;
      this.carNo = ""
    },
    self() {
      this.state = "待后送";
      this.isShow = false;
      this.isShow1 = true;
      this.carNo = "自行前往"
    },
    oxygen() {
      this.methods = "吸氧处理"
    },
    ECG() {
      this.methods = "心电检查"
    },
    bandage() {
      this.methods = "包扎止血"
    },
    stone() {
      this.methods = "固定处理"
    },
    drug() {
      this.methods = "口服药物"
    },
    dd() {
      this.methods = "静脉给药"
    },
    elseway () {
      this.methods = "其他处理"
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
    alert() {
      axios.post('/oneClickAlert',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('上传成功');
        }else{
          Toast('上传失败');
        }
      })
    },
    ensure() {
      if(this.theways == "救护车送往") {
          axios.post('/prepareSend',{
          patientId:this.patientid,
          carNo:this.carNo,
          hosNo:this.hosNo
        }).then((response) => {
          if(response.data.results == "上传成功") {
            Toast('病人待后送');
            // this.$router.push({name:'confirm',params:{HOSPITAL:this.hospital,CARID:this.carID}})
            this.isShow3 = false
          }
        })
      }
      if(this.theways == "自行前往") {
        axios.post('/prepareSend',{
          patientId:this.patientid,
          carNo:'000',
          hosNo:this.hosNo
        }).then((response) => {
          if(response.data.results == "上传成功") {
            Toast('病人待后送');
            this.isShow3 = false
            // this.$router.push({name:'confirm',params:{HOSPITAL:this.hospital,CARID:"自行前往"}})
          }
        })
      }
    },
    save41() {
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.过敏史,
        operationCode: "P041",
        detail1: "过敏史",
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
          // this.reload()
        }
      })
      axios.post('/assemblyOver',{
        patientId:this.$route.params.PATIENTID
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('处置完成');
          // this.isShow1 = true
          this.isShow3 = false
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
          Toast('修改成功');
        }
      })
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
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
          console.log(this.dataTZ)
          var tmp = new array ()
          tmp.push(this.dataTZ);
        }
        this.dataTZ = this.tmp;
      })
    },
    add1() {
      var operationCode1
      if(this.methods == "吸氧处理") {
        this.operationCode1 = "P111"
      }else if(this.methods == "心电检查") {
        this.operationCode1 = "P112"
      }else if(this.methods == "包扎止血") {
        this.operationCode1 = "P113"
      }else if(this.methods == "固定处理") {
        this.operationCode1 = "P114"
      }else if(this.methods == "口服药物") {
        this.operationCode1 = "P115"
      }else if(this.methods == "静脉给药") {
        this.operationCode1 = "P116"
      }else if(this.methods == "其他处理") {
        this.operationCode1 = "P117"
      }
      console.log(this.methods);
      console.log(this.operationCode1);
      console.log(this.content1);
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail:this.content1,
        operationCode: this.operationCode1,
        detail1: this.methods,
        address: "1",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
          // this.reload()
        }
      })
    },
    Select() {
      if(this.selectform == "2") {
        this.carId = this.carId
        this.carNo = this.carNo
        axios.post('/getCarInfo',{
          carNo:this.carNo
        }).then((response) => {
          this.carId = response.data.results[0].CarId
          this.carname = response.data.results[0].CarName
          if(response.data.results[0].Assembly !='') {
            this.destination=response.data.results[0].Assembly
          }else{
            this.destination=response.data.results[0].Hospital
          }
          var state= '';
          this.state=response.data.results[0].CarType
          if(this.state == "0") {
            this.carstate = "空闲"
          }else if(this.state == "1") {
            this.carstate = "正在去会场"
          }else if(this.state == "2") {
            this.carstate = "正在去医院"
          }
        })
      }else if(this.selectform == "3") {
        this.OrganizationName = this.OrganizationName
        this.hosNo = this.hosNo
        axios.post('/getHosInfo',{
          hosNo:this.hosNo
        }).then((response) => {
          this.OrganizationName = response.data.results[0].OrganizationName
          this.LocationDescription = response.data.results[0].LocationDescription
          this.ICUNum = response.data.results[0].ICUNum
        })
      }
    },
    confirm() {
      this.$router.push({name:'confirm',params:{HOSPITAL:this.OrganizationName,CARID:this.carId}})
    }
  },
};
</script>
<style>
  .map-root{
    width:96%;
    height:400px;
    padding:5px;
    border:1px solid black;
    margin:0px;
  }  
</style>



