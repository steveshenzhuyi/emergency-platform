<template>
  <div>
    <mt-header fixed style="font-size:20px" title="新增资源项目">
      <mt-button size="small" type="danger" slot="left" icon="back"
            @click="resourcetoA()"><small>返回</small></mt-button>
      <mt-button slot="right" @click="NewResource()"><small>确定</small></mt-button>
      <hr>
    </mt-header>
    <br><br>
    <!-- <p >所选种类：{{resourceType}}、{{type}} </p> -->
    <mt-picker :slots="slots" @change="ontypeChange" :visible-item-count="3"></mt-picker>
    <mt-field label="名称" v-model="resourceName"></mt-field>
    <mt-field label="规格" v-model="standard"></mt-field>
    <mt-field label="数量" type="number" v-model="amount"></mt-field>
    <mt-field label="生产厂家" v-model="manufacturer"></mt-field>
    <mt-field label="批号" v-model="batchNumber"></mt-field>
    <mt-field label="生产日期" v-model="PD"></mt-field>
    <mt-field label="有效期" v-model="GP"></mt-field>
    <mt-field label="有效日期" v-model="EXP"></mt-field>
    <mt-field label="描述" type="textarea" v-model="resourceDetail"></mt-field>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default {

  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      groupNo: window.localStorage.getItem('GROUPNO'),
      resourceName: '',
      manufacturer: '',
      batchNumber: '',
      standard: '',
      amount: '',
      resourceDetail: '',
      PD: '',
      EXP: '',
      GP: '',
      type: '',
      resourceType: '',
      slots: [
          {
            flex: 1,
            values: ['种类'],
            className: 'slot2',
          },
          {
            flex: 1,
            values: ['药品','器材','其他'],
            className: 'slot1',
          },
        ],
    };
  },
  methods: {
    ontypeChange(picker, values) {
      this.blood = values[0];
      this.type = values[1];
      if(this.type === "药品") {
        this.resourceType = "1"
      }else if(this.type === "器材") {
        this.resourceType = "2"
      }else if(this.type === "其他") {
        this.resourceType = "3"
      }console.log(this.resourceType);
      console.log(this.amount);
    },
    resourcetoA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"资源"}}) 
    },
    NewResource() {
      axios.post('/newResource',{
        userId: this.userId,
        groupNo: this.groupNo,
        resourceName: this.resourceName,
        resourceDetail: this.resourceDetail,
        standard: this.standard,
        manufacturer: this.manufacturer,
        batchNumber: this.batchNumber,
        amount:this.amount,
        PD: this.PD,
        EXP: this.EXP,
        resourceType: this.resourceType,
        GP: this.GP
      }).then((response) => {
        console.log(this.resourceType)
        if(response.data.results == "新建成功") {
          MessageBox.alert('新建成功', '提示');
          this.$router.push({name: '病人列表',params:{SELECTED:"资源"}});
        }else {
          MessageBox.alert('创建失败', '提示');
        }console.log(response);
            console.log(response.data.results);
        }).catch(function(error){
            console.log("error",error);
      });
    },
  }
};
</script>
