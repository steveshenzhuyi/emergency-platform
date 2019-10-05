<template>
  <div>
    <mt-tab-container class="page-tabbar-container" v-model="selected">
      <mt-tab-container-item id="指挥">
        <mt-header fixed style="font-size:25px;height: 50px;" title="视频通话">
         <!--  <mt-button size="small" slot="left"
            @click="$goRoute('/CPR')"><small>今日统计</small></mt-button>
          <mt-button size="small" slot="right"
            @click="$goRoute('/increaseA')"><small>新增病人</small></mt-button> -->
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
            <div @click="callall()" style="margin-top: -50px">
            <mt-cell><span style="font-size: 20px" slot="title"><b>呼叫全体成员</b></span></mt-cell></div>
            <div  @click="callass()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>呼叫全体现场组</b></span></mt-cell></div>
            <div @click="callcar()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>呼叫全体车辆组</b></span></mt-cell></div>
            <div @click="callhos()">
            <mt-cell><span style="font-size: 20px" slot="title"><b>呼叫全体医院组</b></span></mt-cell></div>
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
            <div  @click="seeass()">
            <mt-cell><h4 slot="title">全体现场组</h4></mt-cell></div>
            <div @click="seecar()">
            <mt-cell><h4 slot="title">全体车辆组</h4></mt-cell></div>
            <div @click="seehos()">
            <mt-cell><h4 slot="title">全体医院组</h4></mt-cell></div>
            <div @click="seesend()">
            <mt-cell><h4 slot="title">我发出的临时消息</h4></mt-cell></div>
            <div @click="seereceive()">
            <mt-cell><h4 slot="title">我接收的临时消息</h4></mt-cell></div>
        </mt-tab-container-item>
      </mt-tab-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="地图">
        <mt-header fixed style="font-size:25px;height: 50px;" title="地图实况">
          <!-- <mt-button size="small" slot="right" @click="$goRoute('/increaseB')"><small>新增资源</small></mt-button> -->
          <hr>
        </mt-header>
        <br><br>
      </mt-tab-container-item>
      <mt-tab-container-item id="统计">
        <mt-header fixed style="font-size:25px;height: 50px;" title="信息统计">
          <hr>
        </mt-header>
        <br><br>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="个人">
        <mt-header fixed style="font-size:25px;height: 50px;" title="个人信息">
          <hr>
        </mt-header>
        <br><br><br>
        <div style="text-align: left; margin-top: 10px">个人信息</div>
        <mt-field label="姓名" v-model="Name" disabled></mt-field>
        <mt-field label="性别" v-model="Gender" disabled></mt-field>
        <mt-field label="年龄" v-model="Age" disabled></mt-field>
        <mt-field label="手机" v-model="Phone" disabled></mt-field>
        <mt-field label="邮箱" v-model="Email" disabled></mt-field>
        <mt-field label="职称" v-model="TitleName" disabled></mt-field>
        <mt-field label="科室" v-model="DepartmentName" disabled></mt-field><hr>
        <div style="text-align: left; margin-top: 10px">角色：现场组</div>
        <mt-field label="所属小组" v-model="GroupName" disabled></mt-field>
        <mt-field label="组内职务" v-model="GroupPosition" disabled></mt-field>
        <mt-field label="责任区域" v-model="ManageArea" disabled></mt-field>
        <mt-field label="重点保障对象" v-model="GuaranteeObject" disabled></mt-field><hr>
        <mt-button size="large" type="danger" @click="logout()">退出登录</mt-button><br><br><br><br>
      </mt-tab-container-item> -->
    </mt-tab-container>
    <mt-popup v-model="popupVisible1" position="right">

</mt-popup>
    <div>
      <mt-tabbar v-model= "selected" fixed>
        <mt-tab-item id="指挥">
          <img slot="icon" src="./icon/语音通话.png"><div style="font-size:12px">指挥</div>
        </mt-tab-item>
        <mt-tab-item id="地图">
         <img slot="icon" src="./icon/本车.png"><div style="font-size:12px">地图</div>
        </mt-tab-item>
        <mt-tab-item id="统计">
          <img slot="icon" src="./icon/病人.png"><div style="font-size:12px">统计</div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
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
      selected:this.$route.params.SELECTED,
      selected1:this.$route.params.SELECTED1,
      critical1:[],
      tempcritical:[],
      critical1list:[],
      popupVisible1:false,
     
    };
  },
  mounted() {
    console.log();
    this.getVideoUserList()
  },
  methods: {
    getVideoUserList(){
      window.JPush.setTags({ sequence: 1, tags: ['R05', '901']},
          (result) => {
            var sequence = result.sequence
            var tags = result.tags
          }, (error) => {
            console.log(error)
          })

      axios.get('/getVideoUserList',{}).then((response) => {
        for(var i=0;i<response.data.results.length;i++){
          if(response.data.results[i].VideoId != 901){
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
        type:6,
        tag:tagset
      }).then((response) => {
        if(response.data.results == "发送成功"){

          var scheme = 'com.tencent.trtc';
          var roomnumber = 996;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":901
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
    callall(){
      // console.log("111")
      MessageBox.confirm('确定呼叫全体成员?').then(action => {
      axios.post('/pushVideo',{
        type:0
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 990;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":901
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
    callass(){
       MessageBox.confirm('确定呼叫全体现场组?').then(action => {
      axios.post('/pushVideo',{
        type:1
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 991;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":901
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
    callcar(){
       MessageBox.confirm('确定呼叫全体车辆组?').then(action => {
      axios.post('/pushVideo',{
        type:2
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 992;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":901
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
    callhos(){
       MessageBox.confirm('确定呼叫全体医院组?').then(action => {
      axios.post('/pushVideo',{
        type:3
      }).then((response) => {
        if(response.data.results == "发送成功"){
          var scheme = 'com.tencent.trtc';
          var roomnumber = 993;
          appAvailability.check(scheme,
            function() {
              var sApp = startApp.set({"application":"com.tencent.trtc"}, { 
                "roomnumber":roomnumber,
                "videoid":901
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
                "videoid":901
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
                "videoid":901
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
      this.$router.push({name:'C1',params:{type:1,id:990}});
    },
    seeass(){
      this.$router.push({name:'C1',params:{type:1,id:991}});
    },
    seecar(){
      this.$router.push({name:'C1',params:{type:1,id:992}});
    },
    seehos(){
      this.$router.push({name:'C1',params:{type:1,id:993}});
    },
    seesend(){
      this.$router.push({name:'C1',params:{type:2,id:901}});
    },
    seereceive(){
      this.$router.push({name:'C1',params:{type:3,id:901}});
    },

  },
};
</script>

<style>
  .I级{
    color:red;
  }
  .II级{
    color:orange;
  }
  .III级{
    color:#E6BD1A;
  }
  .IV级{
    color:blue;
  }
  .V级{
    color:blue;
  }
  .处置完成{
    color:green;
  }
  .已后送{
    color:green;
  }
  .待后送{
    color:red;
  }
  .处置中{
    color:red;
  }
</style>
