<template>
  <div>
    <mt-header fixed style="font-size:20px" title="确认接收">
      <mt-button size="small" icon="back" slot="left"
        @click="returnH()"><small>返回</small></mt-button>
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
    <mt-field label="现在时间" v-model="HospitalTime" disabled="true"></mt-field><hr>
    <mt-button v-show="isshow" size="normal" type="primary" @click="returnH1()">确认接收</mt-button>
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
      classification: '',
      name: '',
      gender: '',
      age: '',
      carId: '',
      organizationName: '',
      HospitalTime: '',
      isshow: '',
      hosgroup: '',
      hospitalGroup:window.localStorage.getItem('GROUPNO'),
      situation:'',
    };
  },
  mounted() {
    this.getpatient()
  },
  methods: {
    getpatient() {
      axios.post('/getPatientInfo',{
      patientId:this.patientId
    }).then((response) => {
      this.hosgroup = response.data.results[0].HosGroup
      if(this.hosgroup == this.hospitalGroup) {
        this.isshow = true;
        // MessageBox.alert('请确认接收', '提示');
        // alert("请确认接收");
        Toast('请确认接收');
      }else {
        // MessageBox.alert('非本院病人', '提示');
        // alert("非本院病人");
        Toast('非本院病人');
      }
      this.classification = response.data.results[0].Classification;
      this.name = response.data.results[0].Name;
      this.gender = response.data.results[0].Gender;
      this.age = response.data.results[0].Age;
      this.carId = response.data.results[0].CarId;
      this.organizationName = response.data.results[0].OrganizationName;
      this.carTime = response.data.results[0].CarTime;
      this.situation = response.data.results[0].Diagnose;
    })
    },
    returnH() {
      this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
    },
    returnH1() {
      axios.post('/hosReceive',{
        patientId:this.patientId,
        hospitalGroup:window.localStorage.getItem('GROUPNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          // MessageBox.alert('接收成功', '提示');
          // alert("接收成功");
          Toast('接收成功');
          this.$router.push({name: '医院病人列表',params:{SELECTED2:"病人"}});
        }
      })      
    }
  }
};
</script>

