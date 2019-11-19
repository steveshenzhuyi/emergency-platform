<template>
  <div align ="left">
    <mt-header fixed style="font-size:25px;height: 50px;" title="视频通话记录">
    <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
    </mt-header>
    <br><br><br><br>
    <h4 v-show='norecord'>暂无记录</h4>
    <div v-for=" (item,index) in data3" align="left" style="position:relative;top:-40px">
          <hr><a @click="getVideo(index)">
            <div>
              {{item.StartTime}}<br></div>
              <div style="font-size: 20px;">发起人：{{item.FromId}}<br>接收人：{{item.ToId}}<br></div>
              <small style="color:grey">时长：{{item.length}}秒</small>
          </a>
        </div>
<mt-popup
  v-model="popupVisible"
  position="bottom" closeOnClickModal="true" style="width:100%;height: 70%;overflow: auto;">
  <div align="center" style="margin-top: 30px">
  <video id="A1"
                       playsinline=""
                       width="300"
                       height="300"
                       autoplay
                       controls
                       poster="./icon/视频.jpg"
                       style="object-fit:cover">
                </video>
              </div>
              <br>
              <div align="center">
                <mt-button @click = "return1()">返回</mt-button></div>
</mt-popup>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Type:this.$route.params.type,
      data3:[],
      popupVisible:false,
      norecord:false

    };
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      if(this.Type == 1){
        axios.post('/getVideoRecordByRoomId', {
        roomid:this.$route.params.id,
      }).then((response) => {
        // console.log(response.data.results)
        this.data3 = response.data.results
        if(response.data.results.length==0)this.norecord = true
      })
      }else if(this.Type == 2){
        axios.post('/getVideoRecordByFrom', {
        fromid:String(this.$route.params.id),
      }).then((response) => {
        // console.log(response.data.results)
        // this.data3 = response.data.results
        if(response.data.results.length==0){
          this.norecord = true  
        }else{
          for (var i = 0; i < response.data.results.length; i++) {
            if(i>=1){
              if(response.data.results[i].FileId != response.data.results[i-1].FileId){
                this.data3.push(response.data.results[i])
            }else{
              this.data3[this.data3.length-1].ToId+=' '+response.data.results[i].ToId
            }
            }else{
              this.data3.push(response.data.results[i])
              }
          }
        }

      })
      }else if(this.Type == 3){
        axios.post('/getVideoRecordByTo', {
        toid:String(this.$route.params.id),
      }).then((response) => {
        // console.log(response.data.results)
        this.data3 = response.data.results
        if(response.data.results.length==0)this.norecord = true
      })
      }

      
    },
    returnA() {
       
          this.$router.push({name:'command',params:{SELECTED:"指挥",SELECTED1:'2'}});
       
    },
    TOHI() {
      var y = this.MessageDetail[1].indexOf("编号")
      var patientID = this.MessageDetail[1].substring(y + 3, y + 8);
       if(window.localStorage.getItem('ROLECODE')=="R01"){
        this.$router.push({name: 'A1',params:{PATIENTID:patientID,SELECTED1:"5"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R02"){
          this.$router.push({name:'T1',params:{PATIENTID:patientID,CARSTATUS:window.localStorage.getItem('CARSTATUS'),SELECTED:"实时地图"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R03"){
          this.$router.push({name:'H1',params:{PATIENTID:patientID,SELECTED:"实时地图"}});
        }else if(window.localStorage.getItem('ROLECODE')=="R04"){
          this.$router.push({name:'Z1',params:{PATIENTID:patientID,SELECTED:"既往病历"}});
        }else alert("无角色")
    }

  }
};
</script>



