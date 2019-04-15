<template>
  <div align="center">
    <mt-header style="font-size:20px" title="病人去向">
      <mt-button size="small" icon="back" slot="left"
        @click="$goRoute('/choosehospital')"><small>返回</small></mt-button>
      <mt-button size="small" slot="right"
        @click="Evacuation()"><small>后送</small></mt-button>
      <hr>
    </mt-header>
    <h2>当前状态：{{state}}</h2>
    <h2>后送医院：{{hospital}}</h2>
    <h2>车号：{{carNo}}
      <!-- <mt-button size="normal">
        <img src="./icon/语音通话.png" height="40" width="40" slot="icon">
        视频通话</mt-button> -->
    </h2>
    <div id="map-container" class="map-root">
      放置地图
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Header } from 'mint-ui';

export default {
  data() {
    return {
      state: this.$route.params.STATE,
      hospital:this.$route.params.HOSPITAL,
      carNo:this.$route.params.CARNO,
    };
  },
  methods: {
    Evacuation() {
      this.$router.push({name:'confirm',params:{HOSPITAL:this.hospital,CARNO:this.carNo}})
    }
  }
};
</script>

<style>
  .map-root{
    width:100%;
    height:500px;
    padding:5px;
    border:1px solid black;
    margin:0px;
  }  
</style>

