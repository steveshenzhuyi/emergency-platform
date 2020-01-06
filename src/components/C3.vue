<template>
  <div align=left>
    <mt-header fixed style="font-size:20px" title="消息详情">
    <mt-button size="small" type="danger" slot="left" icon="back"
        @click="returnH()"><small>返回</small></mt-button>
    </mt-header>
    <br><br>
    <hr>
    <b style="font-size:18px">编号：{{messageNo}}</b>
      <mt-badge v-show="showbadge" type="error">紧急</mt-badge>
    <div style="font-size:22px"><b>标题：{{Title}}</b></div><br>
    <div align ="left" v-for="item in MessageDetail" style="">
      {{item}}<br>
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
      messagedetail: '',
      showbadge:'',
    };
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      axios.post('/getMessageDetail', {
        messageNo:this.$route.params.MESSAGENO
      }).then((response) => {
        this.Title=response.data.results[0].MessageTitle
        var a = response.data.results[0].MessageDetail
        var b = a.split(/[\r\n]/)
        var c = b.filter( i => i)
        this.MessageDetail = c
        this.sendtime=response.data.results[0].SendTime
        this.messageNo=response.data.results[0].MessageNo
        this.mark=response.data.results[0].Mark
        if(response.data.results[0].Mark == 1) {
          this.showbadge=true;
        }
      })
    },
    returnH() {
      this.$router.push({name: '医院病人列表',params:{SELECTED2:"沟通"}});
    }
  }
};
</script>



