<template>
  <div align ="left">
    <mt-header fixed style="font-size:25px;height: 50px;" title="消息详情">
    <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnA()"><small>返回</small></mt-button>
    </mt-header>
    <br><br><br>
    <hr>
    <b style="font-size:20px">编号：{{messageNo}}</b>
      <mt-badge v-show="showbadge" type="error">紧急</mt-badge>
    <div><b style="font-size:25px">标题：{{Title}}</b></div><br>
    <div align ="left" v-for="item in MessageDetail" style="font-size: 20px;">
      {{item}}<br>
    </div><br>
    <div align="center">
      <mt-button type="primary" @click="TOH1()"><small>查看病人详情</small></mt-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Title: '',
      messageNo: '',
      sendtime: '',
      mark: '',
      MessageDetail:[],
      showbadge:'',
    };
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      axios.post('/getMessageDetail', {
        messageNo:window.localStorage.getItem('MESSAGENO')
      }).then((response) => {
        this.Title=response.data.results[0].MessageTitle
        var a = response.data.results[0].MessageDetail
        var b = a.split(/[\r\n]/)
        var c = b.filter( i => i)
        this.MessageDetail = c
        console.log(this.MessageDetail)
        this.sendtime=response.data.results[0].SendTime
        this.messageNo=response.data.results[0].MessageNo
        this.mark=response.data.results[0].Mark
        if(response.data.results[0].Mark == 1) {
          this.showbadge=true;
        }
      })
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
    TOHI() {
      patientID:X;
      this.$router.push({name:'H1',params:{PATIENTID:"patientID",SELECTED:"实时地图"}})
    }
  }
};
</script>



