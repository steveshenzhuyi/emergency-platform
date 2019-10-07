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
    getVideo(index){
      this.popupVisible = true
      var video = document.getElementById("A1");
      video.src = this.data3[index].MediaUrl
    },
    return1(){
      this.popupVisible=false
      var video = document.getElementById("A1");
      video.src = ''
    }

  }
};
</script>



