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
        <br><br>
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
       <!--  <mt-tab-item id="个人">
          <img slot="icon" src="./icon/个人.png"><div style="font-size:12px">个人</div> -->
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
     
    };
  },
  mounted() {
    console.log();
  },
  methods: {
   
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
