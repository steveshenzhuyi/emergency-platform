<template>
  <div>
    <mt-header fixed style="font-size:20px" title="资源详情">
      <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
    </mt-header>
    <br><br>
    <mt-field label="名称" v-model="name" :disabled="true"></mt-field>
    <mt-field label="编号" v-model="number" :disabled="true"></mt-field>
    <mt-field label="种类" v-model="type" :disabled="true"></mt-field>
    <mt-field label="规格" v-model="standard" :disabled="true"></mt-field>
    <mt-field label="原始数量" v-model="amount" :disabled="true"></mt-field>
    <mt-field label="所属" v-model="belong" :disabled="true"></mt-field>
    <mt-field label="添加时间" v-model="time" :disabled="true"></mt-field>
    <mt-field label="状态" v-model="state" :disabled="true"></mt-field>
    <mt-field label="描述" type="textarea" v-model="describe" :disabled="true"></mt-field>
    <hr>
    <p  style="text-align: left">数量增减</p>
    <h3>现在数量：{{counter}}</h3>
    <mt-button type="primary" size="normal"
    v-on:click="counter +=1">增加</mt-button>
    <mt-button type="danger" size="normal"
    v-on:click="counter -=1">减少</mt-button><br><br>
    <mt-button type="primary" size="large" @click="edit()">确认修改</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      name: '',
      number: '',
      type: '',
      standard: '',
      belong: '',
      time: '',
      state: '',
      describe: '',
      counter: '',
      Status: '',
      Subordinateunits: '',
      ResourceType: '',
      amount: '',
      difference: '',
    };
  },
  mounted() {
    this.getResource()
  },
  methods: {
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"资源"}});
    },
    getResource() {
      axios.post('/getResourceInfo', {
        resourceNo:this.$route.params.RESOURCENO
      }).then((response) => {
        this.name=response.data.results[0].ResourceName;
        this.number=response.data.results[0].ResourceNo;
        this.standard=response.data.results[0].Standard;
        this.time=response.data.results[0].AddTime;
        this.counter=response.data.results[0].Amount;
        this.amount=response.data.results[0].Amount;
        this.Status=response.data.results[0].Status;
        if(this.Status=="1") {
          this.state="在库"
        }
        this.Subordinateunits=response.data.results[0].Subordinateunits;
        if(this.Subordinateunits=="G01") {
          this.belong="会场1组"
        }else if(this.Subordinateunits=="G02") {
          this.belong="会场2组"
        }else if(this.Subordinateunits=="G03") {
          this.belong="车辆1组"
        }else if(this.Subordinateunits=="G04") {
          this.belong="车辆2组"
        }else if(this.Subordinateunits=="G05") {
          this.belong="医院1组"
        }else if(this.Subordinateunits=="G06") {
          this.belong="医院2组"
        }
        this.ResourceType=response.data.results[0].ResourceType;
        if(this.ResourceType=="1") {
          this.type="药品"
        }else if(this.ResourceType=="2"){
          this.type="器材"
        }else if(this.ResourceType=="3"){
          this.type="其他"
        }
        this.describe=response.data.results[0].ResourceDetail
      })
    },
    edit() {
      if(this.counter==this.amount)Toast('未作修改')
        else if(this.counter>this.amount) {
        this.difference=this.counter-this.amount
        axios.post('/setResourceAmount',{
        resourceNo:this.number,
        amount:this.counter,
        operationCode:"RO03",
        operator:window.localStorage.getItem('USERID'),
        varyAmount:this.difference
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('保存成功')
        }
      })
      }else{
        this.difference=this.amount-this.counter
        axios.post('/setResourceAmount',{
        resourceNo:this.number,
        amount:this.counter,
        operationCode:"RO04",
        operator:window.localStorage.getItem('USERID'),
        varyAmount:this.difference
      }).then((response) => {
        if(response.data.results == "上传成功") {
          Toast('保存成功')
        }
      })
      }
    }
  }
};
</script>

