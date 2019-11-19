<template>
  <div>
        <mt-header fixed style="font-size:25px;height: 50px;" title="单独通话">
         <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
          <hr>
        </mt-header>
        <br><br> 
            <br><br>
           <div v-for="(item,index) in critical1list" @click="confirmpush(index)">
             <div align="left">
              <div><span>{{item.label}}</span></div>
            </div><hr>
           </div>
              <br><br><br><br>
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
    confirmpush(index){
      var tagset= []
        tagset.push(String(this.critical1list[index].value))
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
    returnA() {
         this.$router.push({name: 'D1',params:{SELECTED1:'1'}});
  }
}

};
</script>


