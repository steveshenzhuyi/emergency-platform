<template>
  <div align="center">
    <mt-header fixed style="font-size:20px" title="确认后送">
      <mt-button size="small" icon="back" slot="left"
        @click="returnA1()"><small>返回</small></mt-button>
    </mt-header>
    <br><br>
    <br>车辆端扫描此二维码，完成交接
    <div id="code-container" class="code-root">
      <div id="qrcode"></div>
    </div>
    <hr>
    病人信息
    <mt-field label="编号" v-model= "patientid" disabled= true></mt-field>
    <mt-field label="分级" v-model= "level" disabled= true></mt-field>
    <mt-field label="姓名" v-model= "name" disabled= true></mt-field>
    <mt-field label="年龄" v-model= "age" disabled= true></mt-field>
    <mt-field label="症状" v-model= "situation" disabled= true></mt-field>
    <mt-field label="目标车号" v-model= "car" disabled= true></mt-field>
    <mt-field label="目标医院" v-model= "hospital" disabled= true></mt-field><hr>
    <mt-button v-show="isShow" size="normal" type="primary" @click="confirm()">确认送出</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import QRCode from 'qrcodejs2';

export default {
  data() {
    return {
      patientid: window.localStorage.getItem('PATIENTNO'),
      level: '',
      name: '',
      age: '',
      situation: '',
      car: this.$route.params.CARID,
      hospital:this.$route.params.HOSPITAL,
      flag: this.$route.params.FLAG,
      isShow: false,
    };
  },

  mounted() {
    this.patient()
    this.qrcode()
  },
  methods: {
    qrcode () {  
      var that = this
      let qrcode = new QRCode('qrcode', {  
        width: 200,  
        height: 200, // 高度  
        text: that.patientid// 二维码内容  
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        // background: '#f0f'  
        // foreground: '#ff0'  
      })  
      console.log(qrcode)  
    },
    patient() {
      if(this.flag == "2") {
        this.isShow = true
      }
      axios.post('/getPatientInfo', {
        patientId:window.localStorage.getItem('PATIENTNO')
      }).then((response) => {
        this.level = response.data.results[0].Classification;
        this.name = response.data.results[0].Name;
        this.age = response.data.results[0].Age;
        this.situation = response.data.results[0].Diagnose;
        if(this.car == "") {
          this.car = response.data.results[0].CarId;
        }
        if(this.hospital == "") {
          this.hospital = response.data.results[0].OrganizationName
        }
      })
      // var patient = '{"Patientid":"this.patientid"}';
      // var json = JSON.parse(patient);
      // console.log(json);
    },
    returnA1() {
      this.$router.push({name: 'A1',params:{SELECTED1:"病人去向",FLAG1:"1",PATIENTID:this.patientid}})
    },
    confirm() {
      axios.post('/confirmSend', {
        patientId:window.localStorage.getItem('PATIENTNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          // alert("确认送出");
          Toast('确认送出');
           this.$router.push({name: 'A1',params:{SELECTED1:"病人去向",STATE1:"已后送",PATIENTID:this.patientid}})
        }else{
          // alert("送出失败");
          Toast('送出失败');
        }
       
      })
    }
  }
};
</script>

<style>
  .code-root{
    width:200px;
    height:200px;
    padding:5px;
    border:1px solid black;
    margin:0px;
  }  
</style>

