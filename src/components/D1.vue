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
            <div >
             <mt-button @click="callhall()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>接通指挥中心</b></mt-button></div><br>
             <div >
            <mt-button @click="callcom()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>呼叫现场指挥</b></mt-button></div><br>
            <div >
            <mt-button @click="callsingle()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>单独通话</b></mt-button></div><br>
            <div>
            <mt-button @click="callgroup()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>群组通话</b></mt-button></div>
              <br><br><br><br>
        </mt-tab-container-item>
        <mt-tab-container-item id="2"> 
          <br><br>
          <div  >
            <mt-button @click="seeall()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>全体成员</b></mt-button></div><br>
            <div v-show="role=='R01'">
            <mt-button  @click="seeass()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>全体现场组</b></mt-button></div>
            <div v-show="role=='R02'">
            <mt-button  @click="seecar()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>全体车辆组</b></mt-button></div>
            <div v-show="role=='R03'" >
            <mt-button  @click="seehos()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>全体医院组</b></mt-button></div>
            <div >
              <br>
            <mt-button  @click="seesend()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>我发出的临时消息</b></mt-button></div><br>
            <div >
            <mt-button  @click="seereceive()" size="small"  style="position:relative;height: 50px; width: 200px;font-size: 20px"
            type="primary"><b>我接收的临时消息</b></mt-button></div>
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
  },
  methods: {
    getVideoUserList(){
      this.critical1list.push({label:'总指挥(901)',value:'901'})
      axios.get('/getVideoUserList',{}).then((response) => {
        for(var i=0;i<response.data.results.length;i++){
          if(response.data.results[i].VideoId != this.myvideoid){
            var videoname = response.data.results[i].Name+"("+response.data.results[i].VideoId+")"
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
    callcom(){
      axios.post('/pushVideo',{
        roomnumber:999,
        type:7,
        tag:['902']
      }).then((response) => {
        if(response.data.results == "发送成功"){

          var scheme = 'com.tencent.trtc';
          var roomnumber = Number(window.localStorage.getItem("VIDEOUSERID"));
          console.log(roomnumber)
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":999,
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
    },
    callsingle(){
this.$router.push({name: 'D2'});
    },
    callgroup(){
this.$router.push({name: 'D3'});
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


