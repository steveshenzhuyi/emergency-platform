<template>
  <div>
    <mt-header fixed style="font-size:25px;height: 50px;" title="资源详情">
      <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
    </mt-header>
    <br><br><br>
    <mt-field label="名称" v-model="name" :disabled="true"></mt-field>
    <mt-field label="编号" v-model="number" :disabled="true"></mt-field>
    <mt-field label="种类" v-model="type" :disabled="true"></mt-field>
    <mt-field label="总量" v-model="total" :disabled="true"></mt-field>
    <mt-field label="已用量" v-model="used" :disabled="true"></mt-field>
    <mt-field label="单位" v-model="unit" :disabled="true"></mt-field>
    <mt-field label="规格" v-model="standard" :disabled="true"></mt-field>
    <mt-field label="状态" v-model="state" :disabled="true"></mt-field>
    <mt-field label="添加时间" v-model="time" :disabled="true"></mt-field>
    <mt-field label="所属" v-model="Subordinateunits" :disabled="true"></mt-field>
    <mt-field label="生产厂家" v-model="Manufacturer" :disabled="true"></mt-field>
    <mt-field label="批号" v-model="BatchNumber" :disabled="true"></mt-field>
    <mt-field label="描述" type="textarea" v-model="describe" :disabled="true"></mt-field>
    <hr>
    <p style="text-align: left">数量增减</p>
    <h2>现在数量：{{counter}}</h2>
    <mt-button type="primary" style="width: 100px; height:50px; float: left; margin-left:40px" v-on:click="counter +=1">增加</mt-button>
    <mt-button type="danger" style="width: 100px; height:50px; float: right; margin-right:40px" v-on:click="counter -=1">减少</mt-button>
    <div style="margin-top: 120px;" align="center">
    <mt-button type="primary"  style="width: 120px;height: 40px" @click="edit()">确认修改</mt-button>
  </div>
    <br><br>
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
      unit:'',
      Manufacturer:'',
      BatchNumber:'',
      used:''
    };
  },
  mounted() {
    this.getResource()
  },
  methods: {
    returnA() {
      if(window.localStorage.getItem('ROLECODE')=="R01"){
        this.$router.push({name: '病人列表',params:{SELECTED:"资源"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R02"){
          this.$router.push({name:'转运列表',params:{SELECTED1:"资源"}});
        }
        // else if(window.localStorage.getItem('ROLECODE')=="R03"){
        //   this.$router.push({name:'医院病人列表',params:{SELECTED2:"资源"}});
        // }else if(window.localStorage.getItem('ROLECODE')=="R04"){
        //   this.$router.push({name:'专家病人列表',params:{SELECTED2:"资源"}});
        // }
        else alert("无角色")
    },
    getResource() {
      axios.post('/getResourceInfo', {
        resourceNo:this.$route.params.RESOURCENO
      }).then((response) => {
        this.name=response.data.results[0].ResourceName;
        this.number=response.data.results[0].ResourceNo;
        this.standard=response.data.results[0].Standard;
        this.time=response.data.results[0].AddTime;
        this.amount = response.data.results[0].Amount;
        this.counter=response.data.results[0].Amount;
        this.used=response.data.results[0].Used;
        this.total=this.counter+this.used;
        this.Status=response.data.results[0].Status;
        if(this.Status=="1") {
          this.state="在库"
        }else{
          this.state="其他"
        }
        this.Subordinateunits=response.data.results[0].GroupName;
        this.ResourceType=response.data.results[0].ResourceType;
        if(this.ResourceType=="1") {
          this.type="药品"
        }else if(this.ResourceType=="2"){
          this.type="器材"
        }else if(this.ResourceType=="3"){
          this.type="其他"
        }
        this.describe=response.data.results[0].ResourceDetail;
        this.unit=response.data.results[0].Unit;
        this.Manufacturer=response.data.results[0].Manufacturer;
        this.BatchNumber=response.data.results[0].BatchNumber
      })
    },
    edit() {
      if(this.counter==this.amount){
        // alert("未做修改");
        Toast('未做修改');
      }
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
          this.getResource();
          Toast('上传成功');
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
          this.getResource();
          Toast("上传成功");
        }
      })
      }
    }
  }
};
</script>

