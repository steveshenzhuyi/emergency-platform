<template>
  <div>
        <mt-header fixed style="font-size:25px;height: 50px;" title="视频通话">
         <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
        <br><br> 
        <mt-navbar v-model="selected1">
          <mt-tab-item id="1">呼叫</mt-tab-item>
          <mt-tab-item id="2">记录</mt-tab-item>
        </mt-navbar>
        <br>
        <mt-tab-container v-model="selected1">
          <mt-tab-container-item id="1"> 
            <br><br>
            <div @click="callhall()" style="margin-top: -50px">
            <mt-cell><span style="font-size: 20px" slot="title"><b>接通指挥大厅</b></span></mt-cell></div>
             <div @click="callall()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>加入全体成员</b></span></mt-cell></div>
            <div v-show="role=='R01'" @click="callass()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>加入全体现场组</b></span></mt-cell></div>
            <div v-show="role=='R02'" @click="callcar()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>加入全体车辆组</b></span></mt-cell></div>
            <div v-show="role=='R03'" @click="callhos()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>加入全体医院组</b></span></mt-cell></div>
            <div align="left" style="">
            <mt-checklist @change="checkon"
            title="成员列表"
            v-model="critical1"
            :options="critical1list">
          </mt-checklist></div>
          <div align="left"><b>已选：{{tempcritical}}</b></div>
          <div align="center" style="height: 35px">
            <mt-button  size="small" type="danger" style="float: left;margin: 5px 30px 15px"
              @click="cancel()">取消勾选</mt-button>
              <mt-button  size="small" type="primary" style="float: right;margin: 5px 30px 15px"
              @click="confirmpush()">确定呼叫</mt-button>
              </div>
              <br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="2"> 
          <br><br>
          <div @click="seeall()" style="font-size: 150px;margin-top: -50px">
            <mt-cell><h4 slot="title">全体成员</h4></mt-cell></div>
            <div v-show="role=='R01'" @click="seeass()">
            <mt-cell><h4 slot="title">全体现场组</h4></mt-cell></div>
            <div v-show="role=='R02'" @click="seecar()">
            <mt-cell><h4 slot="title">全体车辆组</h4></mt-cell></div>
            <div v-show="role=='R03'" @click="seehos()">
            <mt-cell><h4 slot="title">全体医院组</h4></mt-cell></div>
            <div @click="seesend()">
            <mt-cell><h4 slot="title">我发出的临时消息</h4></mt-cell></div>
            <div @click="seereceive()">
            <mt-cell><h4 slot="title">我接收的临时消息</h4></mt-cell></div>
        </mt-tab-container-item>
      </mt-tab-container>
    <router-view></router-view>
  </div>
</template>

<script>
import {picker} from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  // inject:['reload'],
  data() {
    return {
      selected1:this.$route.params.SELECTED1,
      critical1:[],
      tempcritical:[],
      critical1list:[],
      popupVisible1:false,
      role:window.localStorage.getItem("ROLECODE"),
      myvideoid:Number(window.localStorage.getItem("VIDEOUSERID"))
    };
  },
  mounted() {
    console.log();
    this.getVideoUserList()
  },
  methods: {
    getVideoUserList(){
      this.critical1list.push({label:'总指挥(901)',value:'901'})
      axios.get('/getVideoUserList',{}).then((response) => {
        for(var i=0;i<response.data.results.length;i++){
          if(response.data.results[i].VideoId != this.myvideoid){
            var videoname = response.data.results[i].Username+"("+response.data.results[i].VideoId+")"
            this.critical1list.push({label:videoname,value:response.data.results[i].VideoId})
          }
          
        }
        }).catch(function(error){
        console.log("error",error);
      })
    },
    cancel(){
      this.critical1 = []
      this.tempcritical=[]
    },
    confirmpush(){
      console.log(this.critical1)
      var tagset = []
      if(this.critical1.length>0){
        for (var i = 0; i < this.critical1.length; i++) {
         tagset.push(String(this.critical1[i]))
        }
        axios.post('/pushVideo',{
        roomnumber:this.myvideoid,
        type:7,
        tag:tagset
      }).then((response) => {
        if(response.data.results == "发送成功"){

          var scheme = 'com.tencent.trtc';
          var roomnumber = Number(window.localStorage.getItem("VIDEOUSERID"));
          console.log(roomnumber)
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":roomnumber
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
        }else{
          alert("无人在线")
        }
      }).catch(function(error){
        console.log("error",error);
      })
      }
    },
    checkon: function(){
      this.tempcritical = ''
      for (var i = 0; i < this.critical1.length; i++) {
        this.tempcritical+=this.critical1[i]+' '
      }
    },
    callhall(){
      var scheme = 'com.tencent.trtc';
      var videoid = Number(window.localStorage.getItem("VIDEOUSERID"))
      appAvailability.check(scheme,
        function() {
          var sApp = startApp.set({"application":"com.tencent.trtc"
        }, { 
                "roomnumber":999,
                "videoid":videoid
              });
        sApp.start(function() {
          }, function(error) {
            alert(error);
          });
        },
        function() {
          alert('未安装视频通话软件');
        }
      );     
    },
    callall(){
      // console.log("111")
      // MessageBox.confirm('确定呼叫全体成员?').then(action => {
      // axios.post('/pushVideo',{
      //   type:0
      // }).then((response) => {
      //   if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 990;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
    //     }else{
    //       alert("无人在线")
    //     }
    //   }).catch(function(error){
    //     console.log("error",error);
    //   })
    // })
    },
    callass(){
      //  MessageBox.confirm('确定呼叫全体现场组?').then(action => {
      // axios.post('/pushVideo',{
      //   type:1
      // }).then((response) => {
      //   if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 991;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
    //     }else{
    //       alert("无人在线")
    //     }
    //   }).catch(function(error){
    //     console.log("error",error);
    //   })
    // })
    },
    callcar(){
      //  MessageBox.confirm('确定呼叫全体车辆组?').then(action => {
      // axios.post('/pushVideo',{
      //   type:2
      // }).then((response) => {
      //   if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 992;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
    //     }else{
    //       alert("无人在线")
    //     }
    //   }).catch(function(error){
    //     console.log("error",error);
    //   })
    // })
    },
    callhos(){
      //  MessageBox.confirm('确定呼叫全体医院组?').then(action => {
      // axios.post('/pushVideo',{
      //   type:3
      // }).then((response) => {
      //   if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 993;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
    //     }else{
    //       alert("无人在线")
    //     }
    //   }).catch(function(error){
    //     console.log("error",error);
    //   })
    // })
    },
    callexpert(){
       MessageBox.confirm('确定呼叫全体专家组?').then(action => {
      axios.post('/pushVideo',{
        type:4
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 994;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
        }else{
          alert("无人在线")
        }
      }).catch(function(error){
        console.log("error",error);
      })
    })
    },
    calltemp(){
      axios.post('/pushVideo',{
        type:5,
        tag:this.taggroup
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 995;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":Number(window.localStorage.getItem("VIDEOUSERID"))
              });
              sApp.start(function() {
              }, function(error) {
                alert(error);
              });
            },
            function() {
              alert('未安装视频通话软件');
            }
            );
        }else{
          alert("无人在线")
        }
      }).catch(function(error){
        console.log("error",error);
      })
    },
    seeall(){
      this.$router.push({name:'E1',params:{type:1,id:990}});
    },
    seeass(){
      this.$router.push({name:'E1',params:{type:1,id:991}});
    },
    seecar(){
      this.$router.push({name:'E1',params:{type:1,id:992}});
    },
    seehos(){
      this.$router.push({name:'E1',params:{type:1,id:993}});
    },
    seesend(){
      this.$router.push({name:'E1',params:{type:2,id:Number(window.localStorage.getItem("VIDEOUSERID"))}});
    },
    seereceive(){
      this.$router.push({name:'E1',params:{type:3,id:Number(window.localStorage.getItem("VIDEOUSERID"))}});
    },
    returnA() {
       if(window.localStorage.getItem('ROLECODE')=="R01"){
        this.$router.push({name: '病人列表',params:{SELECTED:"沟通"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R02"){
          this.$router.push({name:'转运列表',params:{SELECTED1:"沟通"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R03"){
          this.$router.push({name:'医院病人列表',params:{SELECTED2:"沟通"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R04"){
          this.$router.push({name:'专家病人列表',params:{SELECTED2:"沟通"}});
        }else alert("无角色")
    },

  },
};
</script>


