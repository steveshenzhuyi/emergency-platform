<template>
  <div>
    <mt-header style="font-size:20px" title="新建消息">
      <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      <mt-button slot="right" @click="$goRoute('/login-A')"><small>发送</small></mt-button>
      <hr>
    </mt-header>
    <mt-field label="标题" v-model="title"></mt-field><hr>
    <mt-picker :slots="slots" :visible-item-count="3"></mt-picker>
    <mt-radio v-model="radio" :options="['紧急标识']"></mt-radio>
    <mt-field label="内容" type="textarea" v-model="content"></mt-field>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
// import {MessageBox} from 'hybz/node_modules/_mint-ui@2.2.13@mint-ui/src/index';

export default {
  data() {
    return {
      radio: '',
      title: '',
      content: '',
      slots: [
          {
            flex: 1,
            values: ['发送给'],
            className: 'slot2',
          },
          {
            flex: 1,
            values: ['全体','指挥中心','组内'],
            className: 'slot1',
          },
        ],
    };
  },
  methods: {
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"沟通"}});
    }
  },
};
</script>
