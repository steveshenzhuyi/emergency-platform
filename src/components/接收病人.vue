<template>
  <div>
    <mt-header style="font-size:20px" title="接收病人">
      <mt-button size="small" icon="back" slot="left"
        @click="returnT()"><small>返回</small></mt-button>
    </mt-header>
    <br>
    <hr>
    病人信息
    <mt-field label="编号" v-model="patientId" disabled="true"></mt-field>
    <mt-field label="分级" v-model="classification" disabled="true"></mt-field>
    <mt-field label="姓名" v-model="name" disabled="true"></mt-field>
    <mt-field label="性别" v-model="gender" disabled="true"></mt-field>
    <mt-field label="年龄" v-model="age" disabled="true"></mt-field>
    <!-- <mt-field label="症状" v-model="situation" disabled="true"></mt-field> -->
    <mt-field label="目标车号" v-model="carId" disabled="true"></mt-field>
    <mt-field label="目标医院" v-model="organizationName" disabled="true"></mt-field>
    <mt-field label="现在时间" v-model="carTime" disabled="true"></mt-field><hr>
    <mt-button v-show="isshow" size="normal" @click="returnT1()">确认接收</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';

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
    };
  },
  mounted() {
    this.getpatient()
  },
  methods: {
    getpatient() {
      if(this.$route.params.PATIENTID == window.localStorage.getItem('PATIENTID1')) {
        this.isshow = true;
        Toast('请确认接收')
      }else {
        Toast('接收错误病人')
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
      this.carTime = response.data.results[0].CarTime;
    })
    },
    returnT() {
      this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
    },
    returnT1() {
      axios.post('/carReceive',{
        patientId:this.patientId,
        carNo:window.localStorage.getItem('CARNO')
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('接收成功');
          this.$router.push({name: '转运列表',params:{SELECTED1:"病人"}});
        }else Toast('接收失败')
      })      
    }
  }
};
</script>