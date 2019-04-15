<template>
  <div align="center">
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="既往病历">
          <img slot="icon" src="./icon/病历.png"><b style="font-size:15px">既往病历</b>
        </mt-tab-item>
        <mt-tab-item id="实时地图">
          <img slot="icon" src="./icon/去向.png"><b style="font-size:15px">实时地图</b>
        </mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="既往病历">
        <mt-header style="font-size:20px" title="既往病历">
          <mt-button size="small" icon="back" slot="left"
            @click="returnH()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
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
            <p  style="text-align: left">语音</p>
            <mt-button size="small" type="primary" plain>语音播放</mt-button>
            <mt-button size="small" type="danger" plain>语音识别</mt-button><hr>
            <span>时间：{{timevalue}}</span><br>
            <mt-field type="textarea" v-model="主诉"></mt-field><hr>
            <p style="text-align: left">图片</p>
            <span>时间：{{timevalue}}</span><br>
            <img src="./pictrue/logo.png"><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
            <mt-button size="small" type="primary" style="position:relative;right:-55px"
            @click="save10()">保存</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <p style="text-align: left">文字</p>
            <span>时间：{{timevalue1}}</span><br>
            <mt-field type="textarea" placeholder="内容" v-model="现病史"></mt-field><hr>
            <p style="text-align: left">图片</p>
            <span>时间：{{timevalue1}}</span><br>
            <img src="./pictrue/logo.png"><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
            <mt-button size="small" type="primary" style="position:relative;right:-55px"
            @click="save20()">保存</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <p style="text-align: left">常用体征</p><hr>
            <mt-button size="small" @click="heartrate()" style="position:relative;right:50px"
            type="primary" plain>心率</mt-button>
            <mt-button size="small" @click="bloodpressure()"
            type="primary" plain>血压</mt-button>
            <mt-button size="small" @click="temprature()" style="position:relative;left:50px"
            type="primary" plain>体温</mt-button><br><br>
            <mt-button size="small" @click="breath()" style="position:relative;right:50px"
            type="primary" plain>呼吸</mt-button>
            <mt-button size="small" @click="bloodoxygen()"
            type="primary" plain>血氧</mt-button>
            <mt-button size="small" @click="symptom()" style="position:relative;left:50px"
            type="primary" plain>其他</mt-button><br><br><hr>
            <div  class="map-box">
              {{体征}}<hr>
              <mt-field placeholder="内容" v-model="content" type="textarea"></mt-field>
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
            <p style="text-align: left">过敏史</p><hr>
            <mt-field type="textarea" placeholder="内容" v-model="过敏史"></mt-field><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
            <mt-button size="small" style="position:relative;right:-55px"
            type="primary" @click="save41()">保存</mt-button>
            <p style="text-align: left">疾病史</p><hr>
            <mt-field type="textarea" placeholder="内容" v-model="疾病史"></mt-field><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small" 
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
            <mt-button size="small" type="primary" style="position:relative;right:-55px"
            @click="save42()">保存</mt-button>
            <p style="text-align: left">目前用药</p><hr>
            <mt-field type="textarea" placeholder="内容" v-model="目前用药"></mt-field><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small" 
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
            <mt-button size="small" type="primary" style="position:relative;right:-55px"
            @click="save43()">保存</mt-button>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <p style="text-align: left">初步诊断</p><hr>
            <span>时间：{{timevalue2}}</span><br>
            <mt-field type="textarea" placeholder="内容" v-model="初步诊断"></mt-field><hr>
            <mt-button size="small" style="position:relative;right:55px"
            type="primary" plain>
            <img src="./icon/录音.png" height="35" width="35" slot="icon">
            语音输入</mt-button>
            <mt-button size="small"
            type="danger" plain>
            <img src="./icon/添加图片.png" height="35" width="35" slot="icon">
            添加图片</mt-button>
             <mt-button size="small" type="primary" style="position:relative;right:-55px"
            @click="save50()">保存</mt-button>
            <p style="text-align: left">预检分级 </p>
            <b style="text-align: left">当前分级：{{level}}</b>
            <mt-button @click="setclass()">修改分级</mt-button>
            <hr>
            <mt-picker :slots="slots" @change="onPatientlistChange" :visible-item-count="3"></mt-picker><hr>
            <br>
            <mt-button type="danger" @click="alert()">一键上报</mt-button><hr>
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
      <mt-tab-container-item id="实时地图">
        <mt-header style="font-size:20px" title="实时地图">
          <mt-button size="small" icon="back" slot="left"
          @click="returnH()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
        <h2>当前状态：{{message}}</h2>
        <h2>后送医院：{{message1}}</h2>
        <h2>车号：{{message2}}&nbsp;&nbsp;&nbsp;&nbsp;
        <mt-button size="normal">
        <img src="./icon/语音通话.png" height="40" width="40" slot="icon">
        视频通话</mt-button>
        </h2>
        <div id="map-container" class="map-root">
          放置地图
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      patientId: this.$route.params.PATIENTID,
      selected: '既往病历',
      selected1: '1',
      content: '',
      体征: '',
    };
  },
  mounted() {
    this.getpatientrecord()
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
        console.log(this.zhusu)
        this.主诉=this.zhusu[0].Detail;
        this.timevalue=this.zhusu[0].OperationTime;
        //现病史
        this.现病史=this.patientrecord.P02[0].Detail;
        this.timevalue1=this.patientrecord.P02[0].OperationTime;
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
        console.log(this.patientrecord.P04[k])
        for(var j=0; j<this.patientrecord.P04.length;j++) {
          if(this.patientrecord.P04[j].OperationCode == "P043") {
            this.目前用药=this.patientrecord.P04[j].Detail
            break;
          }
        }
        //初步诊断
        this.初步诊断=this.patientrecord.P05[0].Detail
        this.timevalue2=this.patientrecord.P05[0].OperationTime
        //处置方案
        this.dataCZ=this.patientrecord.P11
        //医嘱
        this.doctortell=this.patientrecord.P06[0].Detail
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
        this.level=response.data.results[0].Classification;
        console.log(this.Status)
        if(this.Status=="S01") {
          this.state="处置中"
          this.isShow1 = false
        }else if(this.Status=="S02") {
          this.state="处置完成";
          this.isShow = !this.isShow;
          this.isShow1 = true
        }else if(this.Status=="S03") {
          this.state="待后送"
          this.isShow = !this.isShow;
          this.isShow1 = true
        }else if(this.Status=="S04") {
          this.state="已后送"
          this.isShow = !this.isShow;
          this.isShow1 = true
        }else if(this.Status=="S05") {
          this.state="已后送"
          this.isShow = !this.isShow;
          this.isShow1 = true
        }else if(this.Status=="S06") {
          this.state="已后送"
          this.isShow = !this.isShow;
          this.isShow1 = true
        }
        if(this.state !="处置中") {
          this.isShow = !this.isShow;
          this.isShow1 = true
        }
        window.localStorage.setItem('STATE',this.state);
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
          Toast('保存成功');
          console.log(this.dataTZ)
          var tmp = new array ()
          tmp.push(this.dataTZ);
        }
        this.dataTZ = this.tmp;
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
        address: "3",
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
        address: "3",
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
        address: "3",
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
        address: "3",
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
        address: "3",
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
        address: "3",
        infoType: "1",
        fileUrl: '' 
      }).then((response) => {
        if(response.data.results == "新建成功") {
          Toast('保存成功');
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
          Toast('修改成功');
        }
      })
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
    returnH() {
      this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
    },
  }
};
</script>

<style>
  .map-box{
    width:420px;
    height:130px;
    padding:10px;
    border:2px solid blue;
    margin:0px;
  }
  .map-root{
    width:100%;
    height:475px;
    padding:5px;
    border:1px solid black;
    margin:0px;
  }
</style>