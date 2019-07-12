<template>
  <div align="center">
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="新增处置">
          <img slot="icon" src="./icon/处置方案.png"><div style="font-size:12px">新增处置</div>
        </mt-tab-item>
        <mt-tab-item id="既往病历">
          <img slot="icon" src="./icon/病历.png"><div style="font-size:12px">既往病历</div>
        </mt-tab-item>
        <mt-tab-item id="实时地图">
          <img slot="icon" src="./icon/去向.png"><div style="font-size:12px">实时地图</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="新增处置">
        <mt-header fixed style="font-size:25px;height: 50px;" title="新增处置">
          <mt-button size="small" icon="back" slot="left"
            @click="returnT()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right"
            @click="situation()"><small>{{situations}}</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <div>
          <div  style="text-align: left; margin-top: 10px">常用处置</div><hr>
          <div>
            <mt-button size="small" @click="oxygen()" style="position:absolute;left:30px;width: 90px"
            type="primary" plain>吸&nbsp;&nbsp;氧</mt-button>
            <mt-button size="small" @click="ECG()" style="position:relative;left:30px;width: 90px"
            type="primary" plain>&nbsp;心电图&nbsp;</mt-button>
            <mt-button size="small" @click="bandage()" style="position:relative;left:60px;width: 90px"
            type="primary" plain>包扎止血</mt-button>
          <mt-button size="small" @click="stone()" style="position:relative;left:90px;width: 90px"
            type="primary" plain>支具固定</mt-button></div><br>
            <div>
            <mt-button size="small" @click="drug()" style="position:absolute;left:30px;width: 90px"
            type="primary" plain>口服药物</mt-button>
            <mt-button size="small" @click="dd()" style="position:absolute;left:150px;width: 90px"
            type="primary" plain>静脉给药</mt-button>
            <mt-button size="small" @click="elseway()" style="position:relative;left:60px;width: 90px"
            type="primary" plain>其他处理</mt-button><hr></div>
        </div>
        <div v-show="isShow4" style=" padding:3px;border:1px solid blue;margin:3px;" align="right">
          <div align="center">新增处置：{{methods}}</div>
          <mt-field placeholder="内容" v-model="content1" type="textarea" rows="2"></mt-field>
          <mt-button size="small" @click="add1()" type="primary">确定</mt-button>
        </div>
        <div v-for="(item,index) in dataCZ" style="text-align: left">
        <hr> 
        <small style="color:grey">{{item.OperationTime}}</small><br>
        <b>{{item.OperationName}}</b>&nbsp;&nbsp;&nbsp;<br>
        <span>{{item.Detail}}</span><br>
      </div><br><br><br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="既往病历">
        <mt-header fixed style="font-size:25px;height: 50px;" title="既往病历">
          <mt-button size="small" icon="back" slot="left"
            @click="returnT()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right"
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
              <mt-field type="textarea" placeholder="请输入内容" v-model="主诉" rows="5" v-on:focus.native.capture="focus1()" v-on:blur.native.capture="blur1()"></mt-field>
            </div>
            <div align="center" v-show="editing1" style="height: 35px">
              <mt-button  v-show="editing1" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save10()">保存</mt-button>
             <mt-button  v-show="editing1" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel1()">取消</mt-button>
              </div>
              <hr>
            <div v-for="(item,index) in 主诉图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image1'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto1()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto1()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture1()">上传</mt-button>
        </div>
        <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div align="left">
              <small style="color:grey">{{timevalue1}}</small>
            <mt-field type="textarea" placeholder="请输入内容" v-model="现病史" rows="5" v-on:focus.native.capture="focus2()" v-on:blur.native.capture="blur2()" ></mt-field>
            </div>
            <div align="center" v-show="editing2" style="height: 35px">
              <mt-button  v-show="editing2" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save20()">保存</mt-button>
             <mt-button  v-show="editing2" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel2()">取消</mt-button>
              </div>
              <hr>
           <div v-for="(item,index) in 现病史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image2'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto2()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto2()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture2()">上传</mt-button>
        </div>
        <br><br><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div align="center" style="height:28px"><span style="float: left;">常用体征</span>
            </div><hr>
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
            <div v-show="istizheng" style=" padding:3px;border:1px solid blue;margin:3px;" align="right">
              <div align="center">新增体征：{{体征}}</div>
              <mt-field placeholder="内容" v-model="content" type="textarea" rows="2"></mt-field>
              <mt-button @click="add()" size="small" type="primary">确定</mt-button>
            </div>
            <div v-for="(item,index) in dataTZ" style="text-align: left">
            <hr>
            <small style="color:grey">{{item.OperationTime}}</small><br>
            <b>{{item.OperationName}}</b>&nbsp;&nbsp;&nbsp;<span>{{item.Detail}}</span>
          </div><br><br><br><br>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
          <div align="center" style="height:30px">
          <mt-button v-show="editing41" size="small" style="float: right;margin-top: 2px" type="primary" @click="save41()">保存</mt-button>
          <mt-button  v-show="editing41" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel41()">取消</mt-button>
          <span style="float: left;">过敏史</span>
        </div>
          <div align="left">
            <mt-field  type="textarea" placeholder="请输入内容" v-model="过敏史" rows="2" v-on:focus.native.capture="focus41()" v-on:blur.native.capture="blur41()"></mt-field><hr>
          </div>
         <!--  <div style="height: 33px">
          <mt-button size="small" style="float: left" type="primary" plain>
          <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button>
          </div> -->
          <div align="center" style="height:30px">
          <mt-button v-show="editing42" size="small" style="float: right;margin-top: 2px" type="primary" @click="save42()">保存</mt-button>
          <mt-button  v-show="editing42" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel42()">取消</mt-button>
          <span style="float: left;">疾病史</span>
        </div>
          <div align="left">
            <mt-field type="textarea" placeholder="请输入内容" v-model="疾病史"  rows="2" v-on:focus.native.capture="focus42()" v-on:blur.native.capture="blur42()"></mt-field><hr>
          </div>
          <!-- <div style="height: 33px">
          <mt-button size="small" style="float: left" type="primary" plain>
          <img src="./icon/录音.png" height="35" width="35" slot="icon">语音</mt-button>
          </div> -->
          <div align="center" style="height:30px">
          <mt-button v-show="editing43" size="small" style="float: right;margin-top: 2px" type="primary" @click="save43()">保存</mt-button>
          <mt-button  v-show="editing43" size="small" style="float: right; margin-right:10px;margin-top: 2px"
              @click="cancel43()">取消</mt-button>
          <span style="float: left;">目前用药</span>
        </div>
          <div align="left">
            <mt-field type="textarea" placeholder="请输入内容" v-model="目前用药"  rows="2" v-on:focus.native.capture="focus43()" v-on:blur.native.capture="blur43()"></mt-field><hr>
          </div>
            <div v-for="(item,index) in 既往史图片">
              <div align="center">
              <small style="color:grey">{{item.time}}</small></div>
              <div align="center">
           <img v-gallery :src="item.fileUrl" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;"></div>
          </div>
          <hr>
          <div align="center">
          <img v-gallery v-show="photoing" style="max-height: 200px; max-width: 90%;margin-bottom: 5px;" id='image4'>
        </div>
        <div align="center">
          <mt-button size="small"  style="float: left" type="primary" plain  @click="takephoto4()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon">拍照</mt-button>
          <mt-button size="small" style="float: left; margin-left: 10px" type="danger" plain @click="choosephoto4()">
          <img src="./icon/添加图片.png" height="35" width="35" slot="icon" >相册</mt-button>
          <mt-button size="small" type="primary" style="float: right;position" @click="uploadPicture4()">上传</mt-button>
        </div>
          <br><br><br><br><br><br>
        </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div align="center" style="height:30px">
              <span style="float: left;">初步诊断</span></div>
            <div align="left">
            <small style="color:grey">{{timevalue2}}</small>
            <mt-field type="textarea" placeholder="请输入内容" v-model="初步诊断" rows="3" v-on:focus.native.capture="focus5()" v-on:blur.native.capture="blur5()"></mt-field>
          </div>
          <div align="center" v-show="editing5" style="height: 35px">
              <mt-button  v-show="editing5" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save50()">保存</mt-button>
             <mt-button  v-show="editing5" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel5()">取消</mt-button>
              </div>
            <hr>
            <div align="center" style="height:30px"><span style="float: left;">预检分级</span></div>
           <div align="left" style="height:30px">
            <span><b>当前分级：{{level}}</b></span></div>
            <!-- <mt-button @click="setclass()">修改分级</mt-button> -->
            <hr>
            <!-- <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker><hr> -->
            <!-- <mt-button type="danger" @click="alert()">一键上报</mt-button> -->
            <br><br><br><br>
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
      <mt-tab-container-item id="实时地图">
        <mt-header fixed style="font-size:25px;height: 50px;" title="实时地图">
          <mt-button size="small" icon="back" slot="left"
          @click="returnT()"><small>返回</small></mt-button>
          <mt-button size="small" slot="right"
          @click="situation()"><small>{{situations}}</small></mt-button>
          <hr>
        </mt-header>
        <br><br>
        <h3>当前状态：{{StatusNameCar}}</h3>
        <h4>后送医院：{{OrganizationName}}&nbsp; 车号：{{CarId}}</h4>
        <div id="map-container" class="map-root" style="width:97%;height:500px;padding:1px;border:1px solid black;margin-bottom:5px;">
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import global from './global.vue'
export default {
  data() {
    return {
      editing1:false,
      editing2:false,
      editing41:false,
      editing42:false,
      editing43:false,
      editing5:false,
      tempzhusu:'',
      tempxianbingshi:'',
      tempguomin:'',
      tempjibing:'',
      tempyongyao:'',
      tempzhenduan:'',
      photoing:false,
      photosrc: global.photoUrl+"zyh_1557216080825test.jpg",
      intervalid1:null,
      watchID1:null,
      patientId: this.$route.params.PATIENTID,
      CarStatus: this.$route.params.CARSTATUS,
      PatientId: '',
      Name: '',
      Gender: '',
      Age:'',
      Nation : '',
      Phone: '',
      Email: '',
      Unit: '',
      Position: '',
      bloodType : '',
      OrganizationName: '',
      isShow4: false,
      istizheng: false,
      timevalue: '',
      timevalue1: '',
      timevalue2: '',
      主诉: '',
      现病史图片:[],
      主诉图片:[],
      现病史: '',
      过敏史: '',
      疾病史: '',
      目前用药: '',
      既往史图片:[],
      初步诊断: '',
      level: '',
      LocationName: '',
      CarId: '',
      StatusNameCar: '',
      situations: '',
      selected: this.$route.params.SELECTED,
      selected1: '1',
      content1: '',
      methods: '请选择处置',
      体征: '请选择体征',
      content: '',
      zhusu:'',
      dataCZ: [],
      dataTZ: [],
    };
  },
  mounted() {
    this.initMap()
    this.getpatientrecord()
      this.getPatientInfo()
  },
  beforeDestroy () {
    navigator.geolocation.clearWatch(this.watchID1)
    this.watchID1 = null
    clearInterval(this.intervalid1)
    this.intervalid1 = null
  },
  methods: {
    focus1(){
      this.editing1 = true;
      this.tempzhusu = this.主诉;
    },
    blur1(){
      if(this.tempzhusu == this.主诉){
        this.editing1 = false;
        this.tempzhusu = '';
      }else{
        this.editing1 = true;
      }
    },
    cancel1(){
      this.主诉 = this.tempzhusu;
      this.editing1 = false;
      this.tempzhusu = '';
    },
    focus2(){
      this.editing2 = true;
      this.tempxianbingshi = this.现病史;
    },
    blur2(){
      if(this.tempxianbingshi == this.现病史){
        this.editing2 = false;
        this.tempxianbingshi = '';
      }else{
        this.editing2 = true;
      }
    },
    cancel2(){
      this.现病史 = this.tempxianbingshi;
      this.editing2 = false;
      this.tempxianbingshi = '';
    },
    focus5(){
      this.editing5 = true;
      this.tempzhenduan = this.初步诊断;
    },
    blur5(){
      if(this.tempzhenduan == this.初步诊断){
        this.editing5 = false;
        this.tempzhenduan = '';
      }else{
        this.editing5 = true;
      }
    },
    cancel5(){
      this.初步诊断 = this.tempzhenduan;
      this.editing5 = false;
      this.tempzhenduan = '';
    },
    focus41(){
      this.editing41 = true;
      this.tempguomin = this.过敏史;
    },
    blur41(){
      if(this.tempguomin == this.过敏史){
        this.editing41 = false;
        this.tempguomin = '';
      }else{
        this.editing41 = true;
      }
    },
    cancel41(){
      this.过敏史 = this.tempguomin;
      this.editing41 = false;
      this.tempguomin = '';
    },
    focus42(){
      this.editing42 = true;
      this.tempjibing = this.疾病史;
    },
    blur42(){
      if(this.tempjibing == this.疾病史){
        this.editing42 = false;
        this.tempjibing = '';
      }else{
        this.editing42 = true;
      }
    },
    cancel42(){
      this.疾病史 = this.tempjibing;
      this.editing42 = false;
      this.tempjibing = '';
    },
    focus43(){
      this.editing43 = true;
      this.tempyongyao = this.目前用药;
    },
    blur43(){
      if(this.tempyongyao == this.目前用药){
        this.editing43 = false;
        this.tempyongyao = '';
      }else{
        this.editing43 = true;
      }
    },
    cancel43(){
      this.目前用药 = this.tempyongyao;
      this.editing43 = false;
      this.tempyongyao = '';
    },
    getpatientrecord() {
      //重置
        this.主诉图片 = []
        this.既往史图片=[]
        this.现病史图片=[]
        this.dataTZ =[]
        this.dataCZ = []
        this.content1 = ''
        this.content = ''

      console.log(this.CarStatus)
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
        console.log(this.zhusu)
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
        //医嘱
        if(this.patientrecord.P06.length>0) {
          this.doctortell=this.patientrecord.P06[0].Detail
        }else{
          this.doctortell= ''
        }
      })
       },
      getPatientInfo(){
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
        this.StatusNameCar=response.data.results[0].StatusNameCar;
        this.level=response.data.results[0].Classification;
        this.LocationName = response.data.results[0].LocationName;
        this.OrganizationName = response.data.results[0].OrganizationName
        this.CarId = response.data.results[0].CarId
        console.log(this.StatusName)
        if(this.StatusNameCar == "待后送") {
          if(this.CarStatus == "0"){
            this.situations = "接单"
          }else if(this.CarStatus != "0") {
            this.situations = "接收"
          }
        }else if(this.CarStatus == "2") {
          if(this.PatientId == window.localStorage.getItem('PATIENTID1')) {
            this.situations = "送达"
          }
        }else{
          this.situations = ""
        }
        // window.localStorage.setItem('STATE',this.state);
      })
    },
    situation() {
      if(this.situations == "接单") {
        axios.post('/carPreparePatient',{
          patientId:this.$route.params.PATIENTID,
          carNo:window.localStorage.getItem('CARNO'),
          assembly:this.LocationName,
          hospital:this.OrganizationName
        }).then((response) => {
          if(response.data.results == "上传成功") {
            // MessageBox.alert('接单成功', '提示');
            // alert("接单成功");
            Toast('接单成功');
            window.localStorage.setItem('PATIENTID1',this.patientId);
            this.$router.push({name: '转运列表',params:{SELECTED1:"个人"}});
          }
        })
      }else if(this.situations == "接收") {
        this.$router.push({name: '接收病人',params:{PATIENTID:this.patientId,CarStatus:this.CarStatus}});
      }else if(this.situations == "送达") {
        this.$router.push({name: 'confirmt'})
      }
    },
    oxygen() {
      this.methods = "吸氧"
      this.content1 = ""
      this.isShow4 = false
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail: "",
        operationCode: "P111",
        detail1: "",
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('上传成功');
          this.getpatientrecord()
        }
      })
    },
    ECG() {
      this.methods = "心电图"
      this.content1 = ""
      this.isShow4 = false
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail: "",
        operationCode: "P112",
        detail1: "",
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // alert("上传成功");
          Toast('上传成功');
          this.getpatientrecord()
        }
      })
    },
    bandage() {
      this.methods = "包扎止血"
      this.content1 = ""
      this.isShow4 = false
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail: "",
        operationCode: "P113",
        detail1: "",
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // alert("上传成功");
          Toast('上传成功');
          this.getpatientrecord()
        }
      })
    },
    stone() {
      this.methods = "支具固定"
      this.content1 = ""
      this.isShow4 = false
      axios.post('/newPatientRecord',{
        patientId:this.$route.params.PATIENTID,
        inputUserId:window.localStorage.getItem('USERID'),
        operator:window.localStorage.getItem('USERID'),
        detail: "",
        operationCode: "P114",
        detail1: "",
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // alert("上传成功");
          Toast('上传成功');
          this.getpatientrecord()
        }
      })
    },
    drug() {
      this.methods = "口服药物"
      this.content1 = "药物名称：    用法：    用量：   "
      this.isShow4 = true
    },
    dd() {
      this.methods = "静脉给药"
      this.content1 = "药物名称：    用法：    用量：   "
      this.isShow4 = true
    },
    elseway () {
      this.methods = "其他处理"
      this.content1 = ""
      this.isShow4 = true
    },
    heartrate() {
      this.体征 = "心率"
      this.content = ""
      this.istizheng = true
    },
    bloodpressure() {
      this.体征 = "血压"
      this.content = "收缩压   舒张压   "
      this.istizheng = true
    },
    temprature() {
      this.体征 = "体温"
      this.content = ""
      this.istizheng = true
    },
    breath() {
      this.体征 = "呼吸"
      this.content = ""
      this.istizheng = true
    },
    bloodoxygen() {
      this.体征 = "血氧"
      this.content = ""
      this.istizheng = true
    },
    symptom() {
      this.体征 = "其他"
      this.content = ""
      this.istizheng = true
    },
    add1() {
      this.operationCode1 = ''
      if(this.methods == "吸氧") {
        this.operationCode1 = "P111"
      }else if(this.methods == "心电图") {
        this.operationCode1 = "P112"
      }else if(this.methods == "包扎止血") {
        this.operationCode1 = "P113"
      }else if(this.methods == "支具固定") {
        this.operationCode1 = "P114"
      }else if(this.methods == "口服药物") {
        this.operationCode1 = "P115"
      }else if(this.methods == "静脉给药") {
        this.operationCode1 = "P116"
      }else if(this.methods == "其他处理") {
        this.operationCode1 = "P117"
      }
      if(this.operationCode1!=''){
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.content1,
          operationCode: this.operationCode1,
          detail1: this.methods,
          address: "2",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
            // alert("上传成功");
            Toast('上传成功');
            this.getpatientrecord()
            this.isShow4 = false
          }
        })
      }else{
        // alert("请选择处置"); 
        Toast('请选择处置');    
      }
    },
    add() {
      this.operationCode = ''
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
      if(this.operationCode != ''){
        axios.post('/newPatientRecord',{
          patientId:this.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:this.content,
          operationCode: this.operationCode,
          detail1: this.体征,
          address: "2",
          infoType: "1",
          fileUrl: '' 
        }).then((response) => {
          if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          this.getpatientrecord()
          this.istizheng = false
        }
      })
      }else{
        // alert("请选择体征");
        Toast('请选择体征');
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing41 = false;
          this.tempguomin = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing42 = false;
          this.tempjibing = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing43 = false;
          this.tempyongyao = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing5 = false;
          this.tempzhenduan = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing1 = false;
          this.tempzhusu = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          this.editing2 = false;
          this.tempxianbingshi = '';
          Toast('上传成功');
          this.getpatientrecord()
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
        address: "2",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          // MessageBox.alert('上传成功', '提示');
          // alert("上传成功");
          Toast('上传成功');
          this.getpatientrecord()
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
    returnT() {
      this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
    },
    onPatientlistChange(picker, values) {
      this.level = values[0];
    },
    choosephoto1() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image1').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
choosephoto2() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image2').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
choosephoto4() {
  var that = this;
  navigator.camera.getPicture(onSuccess, onFail, { 
    quality: 100,
    destinationType: 1,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      // targetWidth: 300,
      // targetHeight: 300
    });

  function onSuccess(imageData) {
    that.photoing = true;
    document.getElementById('image4').src =imageData;
  }

  function onFail(message) {
    Toast('图片选择失败' + message);
  }

},
takephoto1() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image1').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
    takephoto2() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image2').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
    takephoto4() {
      var that = this;
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 100,
        destinationType: 1,
      // targetWidth: 300,
      // targetHeight: 300
    });

      function onSuccess(imageData) {
        that.photoing = true;
        document.getElementById('image4').src =imageData;
      }

      function onFail(message) {
        Toast('图片选择失败' + message);
      }

    },
     uploadPicture1() {
      Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image1').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P010.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"主诉图片",
          operationCode: "P010",
          detail1: "",
          address: "2",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            Toast("上传成功");
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
          }
          var ft = new FileTransfer();
          ft.upload(imgURI, uri, success, fail, options)

        },
         uploadPicture2() {
          Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image2').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P020.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"现病史图片",
          operationCode: "P020",
          detail1: "",
          address: "2",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            Toast("上传成功");
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
          }
          var ft = new FileTransfer();
          ft.upload(imgURI, uri, success, fail, options)

        },
    uploadPicture4() {
      Indicator.open('上传中...');
      var that = this;
      //获取元素中的图片uri
      var imgURI = document.getElementById('image4').src
      //文件命名
      var photoname =that.$route.params.PATIENTID + '_' + new Date().getTime() + '_P040.jpg'
      //上传接口
      var uri = encodeURI(global.uploadUrl)
      var options = {
        fileKey: 'file',
        fileName: photoname,
        chunkedMode: true,
        mimeType: 'image/jpeg'
      }
      function success(r) {
        axios.post('/newPatientRecord',{
          patientId:that.$route.params.PATIENTID,
          inputUserId:window.localStorage.getItem('USERID'),
          operator:window.localStorage.getItem('USERID'),
          detail:"既往史图片",
          operationCode: "P040",
          detail1: "",
          address: "2",
          infoType: "3",
          fileUrl: photoname
        }).then((response) => {
          if(response.data.results == "新建成功") {
            Indicator.close();
            // alert("上传成功");
            Toast('上传成功');
            that.getpatientrecord()
            that.photoing = false

          }else{
            Indicator.close();
            Toast("信息上传失败");
          }
        })
      }
          function fail(error) {
            Indicator.close();
            Toast("图片上传失败!");
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
    mapStyle: 'amap://styles/0516a1d06df3e0080d5dfd9856967ccd',
  })
  mapObj.plugin(['AMap.ToolBar','AMap.OverView', 'AMap.MapType'], function () {
    mapObj.addControl(new AMap.ToolBar())
    mapObj.addControl(new AMap.OverView({isOpen:false}))
    mapObj.addControl(new AMap.MapType({showTraffic: true, showRoad: false}))
  })
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
      var gps1 = [position.coords.longitude, position.coords.latitude];
      AMap.convertFrom(gps1, 'gps', function (status, result) {         
        var lnglats2 = result.locations[0];
        marker.setPosition(lnglats2)
        axios.post('/setCarLocation',{
          longitude:lnglats2.lng,
          latitude:lnglats2.lat,
          carNo:window.localStorage.getItem('CARNO')
        }).then((response) => {
          if(response.data.results == "上传成功") {
            //alert('定位成功1')
          }else {
            //alert('上传失败1')
          }
        })
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
        console.log(positionAss[i])
        markerAss[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
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
        console.log(positionHos[i])
        markerHos[i] = new SvgMarker(
          new SvgMarker.Shape.IconFont({
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
          markerCar[i] = new SvgMarker(
            new SvgMarker.Shape.IconFont({
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


