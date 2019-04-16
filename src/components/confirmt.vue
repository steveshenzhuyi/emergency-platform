<template>
  <div>
    <mt-header style="font-size:20px" title="确认送达">
      <mt-button size="small" icon="back" slot="left"
        @click="$goRoute('/login-T')"><small>返回</small></mt-button>
    </mt-header>
    <br>
    <img src="./pictrue/二维码.png">
    <hr>
    病人信息
    <mt-field label="编号" v-model="number" disabled="true"></mt-field>
    <mt-field label="分级" v-model="level" disabled="true"></mt-field>
    <mt-field label="姓名" v-model="name" disabled="true"></mt-field>
    <mt-field label="性别" v-model="sex" disabled="true"></mt-field>
    <mt-field label="年龄" v-model="age" disabled="true"></mt-field>
    <mt-field label="症状" v-model="situation" disabled="true"></mt-field>
    <mt-field label="接收时间" v-model="gettime" disabled="true"></mt-field>
    <mt-field label="目标车号" v-model="car" disabled="true"></mt-field>
    <mt-field label="目标医院" v-model="hospital" disabled="true"></mt-field>
    <mt-field label="现在时间" v-model="time" disabled="true"></mt-field><hr>
    <mt-button size="normal" @click="$goRoute('/login-T')">确认送达</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: '',
      level: '',
      name: '',
      sex: '',
      age: '',
      situation: '',
      gettime: '',
      car: '',
      hospital: '',
      time: '',
    };
  },
};
</script>

