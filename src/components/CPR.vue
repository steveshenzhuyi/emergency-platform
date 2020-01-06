<template>
    <div align="center">
      <mt-header fixed style="font-size:25px;height: 50px;" title="今日收治统计">
        <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      </mt-header>
      <br><br>
      <h3>本组今日共计已收治 {{all}} 人</h3>
      <div  id="myChart1" style="width:80%;height:300px"></div>
      <h3>急诊分级统计</h3>
      <div  id="myChart2" style="width:80%;height:300px"></div>
    <router-view></router-view>
    </div>
</template>

<script>
  import axios from 'axios';
import global from './global.vue'
export default {
  data(){
    return {
     all:0,
     chuzhizhong:0,
     chuzhiwancheng:0,
     daihousong:0,
     yihousong:0,
     housongzhong:0,
     yisongda:0,
     daisongda:0,
     yiruyuan:0,
     yichuyuan:0,
     classI:0,
     classII:0,
     classIII:0,
     classIV:0,
     classV:0,
     class0:0,
   }
 },
 mounted(){
  this.drawLine();
},
methods: {
  draw2(){
var that = this
  let myChart2 = that.$echarts.init(document.getElementById('myChart2'))
    myChart2.setOption({
                tooltip: {},
                xAxis: {
                  data: ["I级","II级","III级","IV级","V级","未分级"]
                },
                yAxis: {},
                series: [{
                  name: '人数',
                  type: 'bar',
                  data: [that.classI, that.classII, that.classIII, that.classIV,that.classV,that.class0],
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                }]
              });
  },
 drawLine(){
  var that = this;
  var datenow = new Date().toLocaleDateString('chinese', { hour12: false }).replace(/\//g, "-")
  let myChart1 = that.$echarts.init(document.getElementById('myChart1'))
  if(window.localStorage.getItem('ROLECODE')=="R01"){
    axios.post('/getEmergencyStatusCountbyDate', {
      'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
    .then((response) => {
      var nn = response.data['results']
      that.chuzhizhong = nn.chuzhizhong;
      that.chuzhiwancheng = nn.chuzhiwancheng
      that.daihousong = nn.daihousong
      that.yihousong = nn.yihousong
      that.all = that.chuzhizhong+that.chuzhiwancheng+that.daihousong+that.yihousong

      myChart1.setOption({
        tooltip: {},
        xAxis: {
          data: ["处置中","处置完成","待后送","已后送"]
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [that.chuzhizhong, that.chuzhiwancheng, that.daihousong, that.yihousong],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
        }]
      });
    }).catch(function (error) {
      console.log("error", error);
    })

    axios.post('/getAssClassificationCountbyDate', {
      'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
    .then((response) => {
      var nn = response.data['results']
      for (var i = 0; i < nn.length; i++) {
        if(nn[i].Classification == 0)that.class0=nn[i].count
          else if(nn[i].Classification == 1)that.classI=nn[i].count
            else if(nn[i].Classification == 2)that.classII=nn[i].count
              else if(nn[i].Classification == 3)that.classIII=nn[i].count
                else if(nn[i].Classification == 4)that.classIV=nn[i].count
                  else if(nn[i].Classification == 5)that.classV=nn[i].count
                }
              setTimeout(()=>{
            that.draw2()
          },1000)
            }).catch(function (error) {
              console.log("error", error);
            })


          }else if(window.localStorage.getItem('ROLECODE')=="R02"){
            axios.post('/getCarStatusCountbyDate', {
              'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
            .then((response) => {
              var nn = response.data['results']
              that.daihousong = nn.daihousong;
              that.housongzhong = nn.housongzhong
              that.yisongda = nn.yisongda
              that.all = that.daihousong+that.housongzhong+that.yisongda
              myChart1.setOption({
                tooltip: {},
                xAxis: {
                  data: ["待后送","后送中","已送达"]
                },
                yAxis: {},
                series: [{
                  name: '人数',
                  type: 'bar',
                  data: [that.daihousong, that.housongzhong, that.yisongda],
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                }]
              });
            }).catch(function (error) {
              console.log("error", error);
            })
            axios.post('/getCarClassificationCountbyDate', {
      'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
    .then((response) => {
      var nn = response.data['results']
      for (var i = 0; i < nn.length; i++) {
        if(nn[i].Classification == 0)that.class0=nn[i].count
          else if(nn[i].Classification == 1)that.classI=nn[i].count
            else if(nn[i].Classification == 2)that.classII=nn[i].count
              else if(nn[i].Classification == 3)that.classIII=nn[i].count
                else if(nn[i].Classification == 4)that.classIV=nn[i].count
                  else if(nn[i].Classification == 5)that.classV=nn[i].count
                }
              setTimeout(()=>{
            that.draw2()
          },1000)
            }).catch(function (error) {
              console.log("error", error);
            })
          }else if(window.localStorage.getItem('ROLECODE')=="R03"){
            axios.post('/getHosStatusCountbyDate', {
              'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
            .then((response) => {
              var nn = response.data['results']
              that.daisongda = nn.daisongda;
              that.yiruyuan = nn.yiruyuan
              that.yichuyuan = nn.yichuyuan
              that.all = that.daisongda+that.yiruyuan+that.yichuyuan

              myChart1.setOption({
                tooltip: {},
                xAxis: {
                  data: ["待送达","已入院","已出院"]
                },
                yAxis: {},
                series: [{
                  name: '人数',
                  type: 'bar',
                  data: [that.daisongda, that.yiruyuan, that.yichuyuan],
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                }]
              });
            }).catch(function (error) {
              console.log("error", error);
            })
          }
          axios.post('/getHosClassificationCountbyDate', {
      'groupNo': window.localStorage.getItem('GROUPNO'),'time':datenow})
    .then((response) => {
      var nn = response.data['results']
      for (var i = 0; i < nn.length; i++) {
        if(nn[i].Classification == 0)that.class0=nn[i].count
          else if(nn[i].Classification == 1)that.classI=nn[i].count
            else if(nn[i].Classification == 2)that.classII=nn[i].count
              else if(nn[i].Classification == 3)that.classIII=nn[i].count
                else if(nn[i].Classification == 4)that.classIV=nn[i].count
                  else if(nn[i].Classification == 5)that.classV=nn[i].count
                }
              setTimeout(()=>{
            that.draw2()
          },1000)
            
            }).catch(function (error) {
              console.log("error", error);
            })



        },
    returnA() {
       if(window.localStorage.getItem('ROLECODE')=="R01"){
        this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R02"){
          this.$router.push({name:'转运列表',params:{SELECTED1:"病人"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R03"){
          this.$router.push({name:'医院病人列表',params:{SELECTED2:"病人"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R04"){
          this.$router.push({name:'专家病人列表',params:{SELECTED2:"病人"}});
        }else alert("无角色")
    },

  },
}
</script>

