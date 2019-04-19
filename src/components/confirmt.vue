<template>
  <div align="center">
    <mt-header style="font-size:20px" title="确认送达">
      <mt-button size="small" icon="back" slot="left"
        @click="returnT()"><small>返回</small></mt-button>
    </mt-header>
    <br>医院端扫描此二维码，完成交接
    <div id="code-container" class="code-root">
      <div id="qrcode"></div>
    </div>
    <hr>
    病人信息
    <mt-field label="编号" v-model="patientId" disabled="true"></mt-field>
    <mt-field label="分级" v-model="classification" disabled="true"></mt-field>
    <mt-field label="姓名" v-model="name" disabled="true"></mt-field>
    <mt-field label="性别" v-model="gender" disabled="true"></mt-field>
    <mt-field label="年龄" v-model="age" disabled="true"></mt-field>
    <!-- <mt-field label="症状" v-model="situation" disabled="true"></mt-field> -->
    <mt-field label="接收时间" v-model="CarTime" disabled="true"></mt-field>
    <mt-field label="目标车号" v-model="carId" disabled="true"></mt-field>
    <mt-field label="目标医院" v-model="OrganizationName" disabled="true"></mt-field>
    <mt-field label="现在时间" v-model="HospitalTime" disabled="true"></mt-field><hr>
    <mt-button size="normal" @click="returnT1()">确认送达</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import QRCode from 'qrcodejs2';


export default {
  data() {
    return {
      patientId: window.localStorage.getItem('PATIENTID1'),
      classification: '',
      name: '',
      gender: '',
      age: '',
      CarTime: '',
      carId: '',
      OrganizationName: '',
      HospitalTime: '',
    };
  },
  mounted() {
    this.getpatient()
    this.qrcode()
  },
    methods: {
  qrcode () {  
      var that = this
      let qrcode = new QRCode('qrcode', {  
        width: 200,  
        height: 200, // 高度  
        text: that.patientId// 二维码内容  
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        // background: '#f0f'  
        // foreground: '#ff0'  
      })  
      console.log(qrcode)  
    },
    getpatient() {
      axios.post('/getPatientInfo',{
        patientId:this.patientId
      }).then((response) => {
        this.classification = response.data.results[0].Classification;
        this.name = response.data.results[0].Name;
        this.gender = response.data.results[0].Gender;
        this.age = response.data.results[0].Age;
        this.carId = response.data.results[0].CarId;
        this.organizationName = response.data.results[0].OrganizationName;
        this.CarTime = response.data.results[0].CarTime;
        this.HospitalTime = response.data.results[0].HospitalTime
      })
    },
    returnT() {
      this.$router.push({name:'T1',params:{SELECTED:"新增处置"}})
    },
    returnT1() {
      axios.post('/confirmArrive',{
        carNo:window.localStorage.getItem('CARNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('确认送达！')
          this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}})
        }else {
          Toast('送错地方了！！')
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