<template>
  <div>
    <mt-header fixed style="font-size:25px;height: 50px;" title="接收病人">
      <mt-button size="small" icon="back" slot="left"
        @click="returnT()"><small>返回</small></mt-button>
    </mt-header>
    <br><br>
    <hr>
    病人信息
    <mt-field label="编号" v-model="patientId" disabled="true"></mt-field>
    <mt-field label="分级" v-model="classification" disabled="true"></mt-field>
    <mt-field label="姓名" v-model="name" disabled="true"></mt-field>
    <mt-field label="性别" v-model="gender" disabled="true"></mt-field>
    <mt-field label="年龄" v-model="age" disabled="true"></mt-field>
    <mt-field label="症状" v-model="situation" disabled="true"></mt-field>
    <mt-field label="目标车号" v-model="carId" disabled="true"></mt-field>
    <mt-field label="目标医院" v-model="organizationName" disabled="true"></mt-field>
    <!-- <mt-field label="现在时间" v-model="carTime" disabled="true"></mt-field><hr> -->
    <mt-button v-show="isshow" size="normal" @click="returnT1()">确认接收</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      patientId: this.$route.params.PATIENTID,
      patientId1: window.localStorage.getItem('PATIENTID1'),
      classification: '',
      name: '',
      gender: '',
      age: '',
      carId: '',
      organizationName: '',
      carTime: '',
      isshow: '',
      LocationName:'',
      situation:'',
    };
  },
  mounted() {
    this.getpatient()
  },
  methods: {
    getpatient() {
      if(this.$route.params.PATIENTID == window.localStorage.getItem('PATIENTID1') || this.$route.params.CarStatus != 1) {
        this.isshow = true;
        // MessageBox.alert('请确认接收', '提示');
        Toast("请确认接收");
      }else {
        // MessageBox.alert('接收错误病人', '提示');
        Toast("接收错误病人");
      };
      axios.post('/getPatientInfo',{
      patientId:this.$route.params.PATIENTID
    }).then((response) => {
      console.log(response)
      this.patientId = this.$route.params.PATIENTID;
      this.classification = response.data.results[0].Classification;
      this.name = response.data.results[0].Name;
      this.gender = response.data.results[0].Gender;
      this.age = response.data.results[0].Age;
      this.carId = response.data.results[0].CarId;
      this.organizationName = response.data.results[0].OrganizationName;
      this.LocationName = response.data.results[0].LocationName;
      this.situation = response.data.results[0].Diagnose;
    })
    },
    returnT() {
      this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
    },
    returnT1() {
      axios.post('/carReceive',{
        patientId:this.patientId,
        carNo:window.localStorage.getItem('CARNO'),
        assembly:this.LocationName,
        hospital:this.organizationName
      }).then((response) => {
        if(response.data.results == "上传成功") {
          // MessageBox.alert('接收成功', '提示');
          // alert("接收成功");
          Toast('接收成功');
          this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
        }else{
          // MessageBox.alert('接收失败', '提示');
          // alert("接收失败");
          Toast('接收失败');
        } 
      })      
    }
  }
};
</script>