<template>
  <div>
    <mt-header style="font-size:20px" title="选择后送医院">
      <mt-button icon="back" slot="left" @click="ReturnA1()">
        <small>返回</small></mt-button>
    </mt-header>
    <h2 style="color:blue">已选医院：{{hospital}}</h2>
    <h2>车辆编号：{{car}}</h2><hr>
    前往方式：
    <input type="radio" v-model="picked2" name="ways" value3="急救车" v-on:click="show()">急救车
    <input type="radio" v-model="picked2" name="ways" value3="自行前往" v-on:click="hide()">自行前往
    <p>医院信息</p>
    <input type="radio" v-model="picked1" name="hospital" value1="1" v-on:click="choose2()">
      <label for="1" class="radio_label"></label>
      <label for="1">{{OrganizationName}}&nbsp;&nbsp;&nbsp;{{LocationDescription}}&nbsp;&nbsp;病床数：{{ICUNum}}</label>
    <br><br>
    <input type="radio" v-model="picked1" name="hospital" value1="2" v-on:click="choose3()">
      <label for="2" class="radio_label"></label>
      <label for="2">{{OrganizationName1}}&nbsp;&nbsp;&nbsp;{{LocationDescription1}}&nbsp;&nbsp;病床数：{{ICUNum1}}</label>
    <hr>
    <div v-show="isShow">
      <p>车辆信息</p>
    <input type="radio" v-model="picked" name="car" value="1" v-on:click="choose()">
      <label for="1" class="radio_label"></label>
      <label for="1">{{carNo}}&nbsp;&nbsp;&nbsp;{{carname}}&nbsp;&nbsp;{{carID}}&nbsp;&nbsp;{{carstate}}&nbsp;&nbsp;{{destination}}</label>
    <br><br>
    <input type="radio" v-model="picked" name="car" value="2" v-on:click="choose1()">
      <label for="2" class="radio_label"></label>
      <label for="2">{{carNo1}}&nbsp;&nbsp;&nbsp;{{carname1}}&nbsp;&nbsp;{{carID1}}&nbsp;&nbsp;{{carstate1}}&nbsp;&nbsp;{{destination1}}</label>
    <hr>
    </div>
    <mt-button size="large" type="danger" @click="lookmap()">查看地图</mt-button><br>
    <mt-button size="large" type="primary" @click="ensure()">确定</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Radio } from 'mint-ui';


export default {
  data() {
    return {
      patientid: window.localStorage.getItem('PATIENTNO'),
      picked: '',
      picked2: '',
      picked1: '',
      hospital: '',
      car: '',
      value:'',
      value1: '',
      value3: '',
      carNo: '',
      carNo1: '',
      carname: '',
      carname1: '',
      carID: '',
      carID1: '',
      carstate: '',
      carstate1: '',
      destination:'',
      destination1:'',
      OrganizationName: '',
      OrganizationName1: '',
      LocationDescription: '',
      LocationDescription1: '',
      ICUNum: '',
      ICUNum1: '',
      isShow: 'true',
      state: '',
      state1: '',
      Hoslist: [],
      Carlist: [],
    };
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      axios.get('/getHosList',{}).then((response) => {
        this.Hoslist = response.data.results
        this.OrganizationName = response.data.results[0].OrganizationName
        this.OrganizationName1 = response.data.results[1].OrganizationName
        this.LocationDescription = response.data.results[0].LocationDescription
        this.LocationDescription1 = response.data.results[1].LocationDescription
        this.ICUNum = response.data.results[0].ICUNum
        this.ICUNum1 = response.data.results[1].ICUNum
        console.log(this.Hoslist)
      })
      axios.get('/getCarList',{}).then((response) => {
        this.Carlist = response.data.results
        this.carNo=response.data.results[0].CarNo
        this.carname=response.data.results[0].CarName
        this.carID=response.data.results[0].CarId
        this.state=response.data.results[0].CarType
        if(this.state == "0") {
          this.carstate = "空闲"
        }else if(this.state == "1") {
          this.carstate = "正在去会场"
        }else if(this.state == "2") {
          this.carstate = "正在去医院"
        }
        if(response.data.results[0].Assembly !='') {
          this.destination=response.data.results[0].Assembly
        }else{
          this.destination=response.data.results[0].Hospital
        }
        this.carNo1=response.data.results[1].CarNo
        this.carname1=response.data.results[1].CarName
        this.carID1=response.data.results[1].CarId
        this.state1=response.data.results[1].CarType
        if(this.state1 == "0") {
          this.carstate1 = "空闲"
        }else if(this.state1 == "1") {
          this.carstate1 = "正在去会场"
        }else if(this.state1 == "2") {
          this.carstate1 = "正在去医院"
        }
        if(response.data.results[1].Assembly !='') {
          this.destination1=response.data.results[1].Assembly
        }else{
          this.destination1=response.data.results[1].Hospital
        }
      })
    },
    hide() {
      this.isShow = !this.isShow;
    },
    show() {
      this.isShow = true
    },
    lookmap() {
      this.$router.push({name: 'map',params:{FLAG:"2"}})
    },
    ensure() {
      if(this.picked=="自行前往") {
        this.$router.push({name: 'map',params:{HOSPITAL:this.hospital,CARID:'',STATE:"待后送",FLAG:"2"}})
      }else
      this.$router.push({name: 'map',params:{HOSPITAL:this.hospital,CARID:this.car,STATE:"待后送",FLAG:"2"}})
    },
    ReturnA1() {
      this.$router.push({name: 'A1',params:{SELECTED1:"病人去向",PATIENTID:this.patientid}})
    },
    choose() {
      if(this.value = "1") {
        this.car=this.carID
      }
    },
    choose1() {
      if(this.value = "2") {
        this.car=this.carID1
      }
    },
    choose2() {
      if(this.value = "1") {
        this.hospital=this.LocationDescription
      }
    },
    choose3() {
      if(this.value = "2") {
        this.hospital=this.LocationDescription1
      }
    }
  }
};
</script>

<style>
.radio_label{
position: absolute;
left: 0;
top: 5px;
width: 20px;
height: 20px;
border: 1px solid #999;
}
</style>

