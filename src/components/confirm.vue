<template>
  <div align="center">
    <mt-header style="font-size:20px" title="确认后送">
      <mt-button size="small" icon="back" slot="left"
        @click="returnA1()"><small>返回</small></mt-button>
    </mt-header>
    <br>
    <div id="code-container" class="code-root">
      <img src="./pictrue/二维码.png">
    </div>
    <hr>
    病人信息
    <mt-field label="编号" v-model="patientid" disabled="true"></mt-field>
    <mt-field label="分级" v-model="level" disabled="true"></mt-field>
    <mt-field label="姓名" v-model="name" disabled="true"></mt-field>
    <mt-field label="年龄" v-model="age" disabled="true"></mt-field>
    <!-- <mt-field label="症状" v-model="situation" disabled="true"></mt-field> -->
    <mt-field label="目标车号" v-model="car" disabled="true"></mt-field>
    <mt-field label="目标医院" v-model="hospital" disabled="true"></mt-field><hr>
    <mt-button size="normal" type="primary" @click="confirm()">确认送出</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      patientid: window.localStorage.getItem('PATIENTNO'),
      level: '',
      name: '',
      age: '',
      situation: '',
      car: this.$route.params.CARNO,
      hospital:this.$route.params.HOSPITAL,
    };
  },
  mounted() {
    this.patient()
  },
  methods: {
    patient() {
      axios.post('/getPatientInfo', {
        patientId:window.localStorage.getItem('PATIENTNO')
      }).then((response) => {
        this.level = response.data.results[0].Classification;
        this.name = response.data.results[0].Name;
        this.age = response.data.results[0].Age;
      })
      // var patient = '{"Patientid":"this.patientid"}';
      // var json = JSON.parse(patient);
      // console.log(json);
    },
    returnA1() {
      this.$router.push({name: 'A1',params:{SELECTED1:"病人去向",STATE1:"待后送"}})
    },
    confirm() {
      this.$router.push({name: 'A1',params:{SELECTED1:"病人去向",STATE1:"已后送"}})
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

