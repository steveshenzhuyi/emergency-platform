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
      </mt-tabbar>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="既往处置">
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title1">
          <mt-button size="small" icon="back" slot="left"
            @click="returnZ()"><small>返回</small></mt-button>
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
        <mt-header fixed style="font-size:25px;height: 50px;" :title="title2">
          <mt-button size="small" icon="back" slot="left"
            @click="returnZ()"><small>返回</small></mt-button>
          <!-- <mt-button  size="small" slot="right"
            @click="situation()"><small>{{situations}}</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br>
        <mt-navbar v-model="selected1">
          <mt-tab-item id="1">病史</mt-tab-item>
          <!-- <mt-tab-item id="2">现病史</mt-tab-item> -->
          <mt-tab-item id="3">体征</mt-tab-item>
          <!-- <mt-tab-item id="4">既往史</mt-tab-item> -->
          <mt-tab-item id="5">初步诊断</mt-tab-item>
          <mt-tab-item id="6">基本信息</mt-tab-item>
        </mt-navbar>
        <br>
        <mt-tab-container v-model="selected1">
           <mt-tab-container-item id="1">
            <!-- <div align="left">
              <small style="color:grey">{{timevalue}}</small>
              <mt-field type="textarea" placeholder="请输入内容" v-model="主诉" rows="5" v-on:focus.native.capture="focus1()" v-on:blur.native.capture="blur1()"></mt-field>
            </div>
            <div align="center" v-show="editing1" style="height: 35px">
              <mt-button  v-show="editing1" size="small" type="primary" style="float: right;margin-top: 5px"
              @click="save10()">保存</mt-button>
             <mt-button  v-show="editing1" size="small" style="float: right; margin-right:10px;margin-top: 5px"
              @click="cancel1()">取消</mt-button>
              </div>
              <hr> -->
              <div align="center" style="height:30px">
                <mt-button v-show="editing1" size="small" style="float: right;margin-top: 2px" type="primary" @click="save10()">保存</mt-button>
                <mt-button  v-show="editing1" size="small" style="float: right; margin-right:10px;margin-top: 2px" @click="cancel1()">取消</mt-button>
                <span style="float: left;">主诉</span>
              </div>
              <div align="left">
                <small style="color:grey">{{timevalue}} </small>
                <mt-field  type="textarea" placeholder="请输入内容" v-model="主诉" rows="3" v-on:focus.native.capture="focus1()" v-on:blur.native.capture="blur1()"></mt-field><hr>
              </div>
              <div align="center" style="height:30px">
                <mt-button v-show="editing2" size="small" style="float: right;margin-top: 2px" type="primary" @click="save20()">保存</mt-button>
                <mt-button  v-show="editing2" size="small" style="float: right; margin-right:10px;margin-top: 2px" @click="cancel2()">取消</mt-button>
                <span style="float: left;">现病史</span>
              </div>
              <div align="left">
                <small style="color:grey">{{timevalue1}} </small>
                <mt-field  type="textarea" placeholder="请输入内容" v-model="现病史" rows="3" v-on:focus.native.capture="focus2()" v-on:blur.native.capture="blur2()"></mt-field><hr>
              </div>
              <div align="center" style="height:30px">
                <mt-button v-show="editing41" size="small" style="float: right;margin-top: 2px" type="primary" @click="save41()">保存</mt-button>
                <mt-button  v-show="editing41" size="small" style="float: right; margin-right:10px;margin-top: 2px" @click="cancel41()">取消</mt-button>
                <span style="float: left;">过敏史</span>
              </div>
              <div align="left">
                <small style="color:grey">{{timevalue41}} </small>
                <mt-field  type="textarea" placeholder="请输入内容" v-model="过敏史" rows="2" v-on:focus.native.capture="focus41()" v-on:blur.native.capture="blur41()"></mt-field><hr>
              </div>
              <div align="center" style="height:30px">
                <mt-button v-show="editing42" size="small" style="float: right;margin-top: 2px" type="primary" @click="save42()">保存</mt-button>
                <mt-button  v-show="editing42" size="small" style="float: right; margin-right:10px;margin-top: 2px" @click="cancel42()">取消</mt-button>
                <span style="float: left;">疾病史</span>
              </div>
              <div align="left">
                <small style="color:grey">{{timevalue42}} </small>
                <mt-field type="textarea" placeholder="请输入内容" v-model="疾病史"  rows="2" v-on:focus.native.capture="focus42()" v-on:blur.native.capture="blur42()"></mt-field><hr>
              </div>
              <div align="center" style="height:30px">
                <mt-button v-show="editing43" size="small" style="float: right;margin-top: 2px" type="primary" @click="save43()">保存</mt-button>
                <mt-button  v-show="editing43" size="small" style="float: right; margin-right:10px;margin-top: 2px" @click="cancel43()">取消</mt-button>
                <span style="float: left;">目前用药</span>
              </div>
              <div align="left">
                <small style="color:grey">{{timevalue43}} </small>
                <mt-field type="textarea" placeholder="请输入内容" v-model="目前用药"  rows="2" v-on:focus.native.capture="focus43()" v-on:blur.native.capture="blur43()"></mt-field><hr>
              </div>
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
          <!-- <mt-tab-container-item id="2">
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
          </mt-tab-container-item> -->
          <mt-tab-container-item id="3">
            <!-- <div  style="text-align: left; margin-top: 10px">常用体征</div><hr> -->
            <!-- <mt-button size="small" @click="heartrate()" style="position:relative;right:40px"
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
            </div> -->
            <div v-for="(item,index) in dataTZ" style="text-align: left">
            <hr>
           <div><small style="color:grey">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</small></div>
            <div><b>{{item.OperationName}}</b></div><div><span style="display:inline-block;width:380px">{{item.Detail}}</span></div>
          </div><br><br><br><br>
          </mt-tab-container-item>
         <!--  <mt-tab-container-item id="4">
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
          </mt-tab-container-item> -->
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
    </mt-tab-container>
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
      title1:'',
      title2:'',
      PatientId: '',
      selected: '既往病历',
      selected1: '1',
      content: '',
      timevalue: '',
      timevalue1: '',
      timevalue41: '',
        timevalue42: '',
        timevalue43: '',
      timevalue2: '',
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
      situations:'',
      carId: '',
      hospital:'',
      dataTZ: [],
      dataCZ:[],
      patientrecord: [],
    };
  },
  mounted() {
    this.getpatientrecord()
  },
  beforeDestroy () {
    navigator.geolocation.clearWatch(this.watchID1)
    this.watchID1 = null
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
            this.timevalue41=this.patientrecord.P04[i].OperationTime;
            break;
          }
        }
        for(var k=0; k<this.patientrecord.P04.length;k++) {
          if(this.patientrecord.P04[k].OperationCode == "P042") {
            this.疾病史=this.patientrecord.P04[k].Detail
            this.timevalue42=this.patientrecord.P04[k].OperationTime;
            break;
          }
        }
        console.log(this.patientrecord.P04[k])
        for(var j=0; j<this.patientrecord.P04.length;j++) {
          if(this.patientrecord.P04[j].OperationCode == "P043") {
            this.目前用药=this.patientrecord.P04[j].Detail
            this.timevalue43=this.patientrecord.P04[j].OperationTime;
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
        this.title2="既往病历";
        this.title1="既往处置";
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
    returnZ() {
      this.$router.push({name: '专家病人列表',params:{SELECTED2:"病人"}});
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
  }
};
</script>
