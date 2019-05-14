<template>
  <div>
    <mt-header fixed style="font-size:20px" title="新建病人">
      <mt-button size="small" type="danger" slot="left" icon="back"
            @click="returnA()"><small>返回</small></mt-button>
      <mt-button size="small" slot="right"
            @click="getcamera()"><small>扫码</small></mt-button>
      <hr>
    </mt-header>
    <br><br>
    <!-- <mt-cell>
      <img src="components/picture/man.png">
      <mt-button size="small" type="primary" plain>
        <img src="./icon/照相.png" height="35" width="35" slot="icon">
        拍照</mt-button>
    </mt-cell> -->
    <hr>
    <!-- <p style="text-align: left">个人信息</p> -->
      <mt-field label="姓名" v-model="pname"></mt-field>
      <mt-radio v-show="!iscamera"
        v-model="gender"
        :options="options">
      </mt-radio>
      <mt-field v-show="iscamera" label="性别" v-model="gender1"></mt-field>
      <mt-field label="年龄" v-model="age"></mt-field>
      <mt-field label="民族" v-model="nation"></mt-field>
      <mt-field label="手机" v-model="phone"></mt-field>
      <mt-field label="邮箱" v-model="email"></mt-field>
      <mt-field label="单位" v-model="unit"></mt-field>
      <mt-field label="职务" v-model="position"></mt-field>
      <p style="position: absolute;left:52px">
        血型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{blood}}{{type}}</p><hr>
      <div v-show="!iscamera">
        <mt-picker :slots="slots" @change="onbloodChange" :visible-item-count="3"></mt-picker>
      </div>
      <br><br>
      
    <!-- <p style="text-align: left">健康信息</p> -->
      <!-- <mt-field label="疾病史" v-model="sick"></mt-field>
      <mt-field label="用药史" v-model="drug"></mt-field>
      <mt-field label="过敏史" v-model="allergy"></mt-field> -->
      <mt-button size="large" type="primary"
            @click="newPatient()">新增病历</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
// import { Radio } from 'mint-ui';

// Vue.component(Radio.name, Radio);

export default {
  data() {
    return {
      iscamera:false,
      groupId : window.localStorage.getItem('GROUPNO'),
      inputUserId : window.localStorage.getItem('USERID'),
      pname: '',
      age: '',
      phone: '',
      gender: '',
      unit: '',
      position: '',
      blood: '',
      type: '',
      bloodType: '',
      nation: '',
      email: '',
      photoUrl: '',
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
         }
      ],
      slots: [
          {
            flex: 1,
            values: ['A型','B型', 'AB型', 'O型'],
            className: 'slot1',
          },
          { 
            flex: 1,
            values: ['Rh+', 'Rh-'],
            className: 'slot2',
          },
        ],
    };
  },
  methods: {
    getcamera(){
      var that = this;
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          console.log(result.text)
          if(result.text && result.text!=undefined){
            axios.post('/getMemberInfo',{
              memberId:result.text
          }).then((response) => {
        console.log(response)
        that.iscamera = true
        that.pname = response.data.results[0].Name
        that.age = response.data.results[0].Age
        that.gender = response.data.results[0].Gender
        that.unit = response.data.results[0].Unit
        that.position = response.data.results[0].Position
        that.bloodType = response.data.results[0].BloodType
        that.nation = response.data.results[0].Nation
        that.email = response.data.results[0].Email
        that.photoUrl = response.data.results[0].PhotoUrl
        that.phone = response.data.results[0].Phone

        if(that.bloodType == 1){
          that.blood = "A型"
          that.type = "Rh+"
        }
        else if(that.bloodType == 2){
          that.blood = "A型"
          that.type = "Rh-"
        }
        else if(that.bloodType == 3){
          that.blood = "B型"
          that.type = "Rh+"
        }
        else if(that.bloodType == 4){
          that.blood = "B型"
          that.type = "Rh-"
        }
        else if(that.bloodType == 5){
          that.blood = "AB型"
          that.type = "Rh+"
        }
        else if(that.bloodType == 6){
          that.blood = "AB型"
          that.type = "Rh-"
        }
        else if(that.bloodType == 7){
          that.blood = "O型"
          that.type = "Rh+"
        }
        else if(that.bloodType == 8){
          that.blood = "O型"
          that.type = "Rh-"
        }

        if(that.gender == 1){
          that.gender1 = '男'
        }else if(that.gender == 2){
          that.gender1 = '女'
        }else that.gender1 = '不明'

        }).catch(function(error){
            console.log("error",error);
      });
      }
    })
      
    },
    onbloodChange(picker, values) {
       this.blood = values[0];
       this.type = values[1];
       console.log(this.gender)
    },
    returnA() {
      this.$router.push({name: '病人列表',params:{SELECTED:"病人"}})
    },
    newPatient() {
      if(this.blood === "A型" && this.type === "Rh+") {
        this.bloodType = '1'
      }else if(this.blood === "A型" && this.type === "Rh-") {
        this.bloodType = '2'
      }else if(this.blood === "B型" && this.type === "Rh+") {
        this.bloodType = '3'
      }else if(this.blood === "B型" && this.type === "Rh-") {
        this.bloodType = '4'
      }else if(this.blood === "AB型" && this.type === "Rh+") {
        this.bloodType = '5'
      }else if(this.blood === "AB型" && this.type === "Rh-") {
        this.bloodType = '6'
      }else if(this.blood === "O型" && this.type === "Rh+") {
        this.bloodType = '7'
      }else if(this.blood === "O型" && this.type === "Rh-") {
        this.bloodType = '8'
      }console.log(this.bloodType)
      axios.post('/newPatient',{
        groupId: this.groupId,
        inputUserId: this.inputUserId,
        gender: this.gender,
        pname: this.pname,
        age: this.age,
        phone: this.phone,
        bloodType: this.bloodType,
        unit: this.unit,
        position: this.position,
        nation: this.nation,
        email: this.email,
        photoUrl: ''
      }).then((response) => {
        console.log(response)
        if(response.data.results == "新建成功") {
          // MessageBox.alert('创建成功', '提示');
          alert("创建成功");
          this.$router.push({name: '病人列表',params:{SELECTED:"病人"}});
        }else {
          // MessageBox.alert('创建失败', '提示');
          alert("创建失败");
        }console.log(response);
            console.log(response.data.results);
        }).catch(function(error){
            console.log("error",error);
      });
    }
  }
}
</script>

